/**
 * Lightweight Code Execution Server
 * 
 * A Judge0-compatible API for local development.
 * Executes code using system-installed runtimes (Python, Node.js, g++).
 * 
 * Start:  node judge0/exec-server.mjs
 * Port:   2358 (same as Judge0)
 * 
 * Supported endpoints:
 *   POST /submissions?base64_encoded=true&wait=true   — single submission
 *   POST /submissions/batch?base64_encoded=true       — batch submission
 *   GET  /submissions/batch?tokens=...&base64_encoded=true — get batch results
 *   GET  /submissions/:token?base64_encoded=true      — get single result
 *   GET  /about                                        — server info
 * 
 * WARNING: This is for LOCAL DEVELOPMENT ONLY. Not sandboxed.
 */

import http from "node:http";
import { exec } from "node:child_process";
import { writeFile, unlink, mkdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import os from "node:os";

const PORT = parseInt(process.env.EXEC_PORT || "2358", 10);
const TIMEOUT_MS = 15_000; // 15 second timeout per execution
const JOBS_DIR = path.join(os.tmpdir(), "code-royal-exec");

// In-memory results store
const results = new Map();

// Language configs: maps Judge0 language_id to command
const LANGUAGES = {
  71: { name: "Python 3", ext: ".py", cmd: (f) => `python3 ${f}` },
  63: { name: "JavaScript (Node)", ext: ".js", cmd: (f) => `node ${f}` },
  54: {
    name: "C++ (GCC)",
    ext: ".cpp",
    cmd: (f) => {
      const out = f.replace(".cpp", ".out");
      return `g++ -std=c++23 -O2 -o ${out} ${f} && ${out}`;
    },
  },
};

// Status codes compatible with Judge0
const STATUS = {
  QUEUED: { id: 1, description: "In Queue" },
  PROCESSING: { id: 2, description: "Processing" },
  ACCEPTED: { id: 3, description: "Accepted" },
  WRONG_ANSWER: { id: 4, description: "Wrong Answer" },
  TLE: { id: 5, description: "Time Limit Exceeded" },
  COMPILATION_ERROR: { id: 6, description: "Compilation Error" },
  RUNTIME_ERROR_SIGSEGV: { id: 7, description: "Runtime Error (SIGSEGV)" },
  RUNTIME_ERROR_SIGXFSZ: { id: 8, description: "Runtime Error (SIGXFSZ)" },
  RUNTIME_ERROR_SIGFPE: { id: 9, description: "Runtime Error (SIGFPE)" },
  RUNTIME_ERROR_SIGABRT: { id: 10, description: "Runtime Error (SIGABRT)" },
  RUNTIME_ERROR_NZEC: { id: 11, description: "Runtime Error (NZEC)" },
  RUNTIME_ERROR_OTHER: { id: 12, description: "Runtime Error (Other)" },
  INTERNAL_ERROR: { id: 13, description: "Internal Error" },
};

function b64Encode(str) {
  return Buffer.from(str || "").toString("base64");
}

function b64Decode(str) {
  if (!str) return "";
  return Buffer.from(str, "base64").toString("utf-8");
}

async function ensureJobsDir() {
  await mkdir(JOBS_DIR, { recursive: true });
}

async function executeCode(sourceCode, languageId, stdin, sharedJobDir = null) {
  const lang = LANGUAGES[languageId];
  if (!lang) {
    return {
      stdout: null,
      stderr: b64Encode(`Unsupported language_id: ${languageId}`),
      compile_output: null,
      status: STATUS.INTERNAL_ERROR,
      time: "0",
      memory: 0,
    };
  }

  // If a shared compilation directory is provided (e.g. from batch), use it to skip recompiling
  const isShared = !!sharedJobDir;
  const jobDir = isShared ? sharedJobDir : path.join(JOBS_DIR, randomUUID());
  
  if (!isShared) {
    await mkdir(jobDir, { recursive: true });
    const sourceFile = path.join(jobDir, `solution${lang.ext}`);
    await writeFile(sourceFile, sourceCode, "utf-8");
  }

  // Generate a unique stdin file for this specific run
  const runId = randomUUID();
  const stdinFile = path.join(jobDir, `stdin_${runId}.txt`);
  await writeFile(stdinFile, stdin, "utf-8");

  // Determine if we need to compile (only if not shared or if it's the compile step)
  // Actually, wait: if it's shared, the caller is responsible for compilation. 
  // Let's just run the executable if shared, or compile+run if not shared.
  
  let command;
  if (isShared && languageId === 54) {
    // For C++, the executable is solution.out
    command = `${path.join(jobDir, "solution.out")} < ${stdinFile}`;
  } else {
    const sourceFile = path.join(jobDir, `solution${lang.ext}`);
    command = `${lang.cmd(sourceFile)} < ${stdinFile}`;
  }

  return new Promise((resolve) => {
    const startTime = Date.now();

    exec(
      command,
      {
        timeout: TIMEOUT_MS,
        maxBuffer: 1024 * 1024, // 1MB output limit
        cwd: jobDir,
      },
      async (error, stdout, stderr) => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(3);

        // Cleanup only if not shared. Shared dirs are cleaned up by the batch handler.
        if (!isShared) {
          try {
            const { rm } = await import("node:fs/promises");
            await rm(jobDir, { recursive: true, force: true });
          } catch { /* ignore */ }
        }

        if (error) {
          if (error.killed) {
            resolve({
              stdout: b64Encode(stdout || ""),
              stderr: b64Encode(stderr || ""),
              compile_output: null,
              status: STATUS.TLE,
              time: elapsed,
              memory: 0,
            });
          } else if (stderr && stderr.includes("error:") && languageId === 54 && !isShared) {
            resolve({
              stdout: null,
              stderr: null,
              compile_output: b64Encode(stderr),
              status: STATUS.COMPILATION_ERROR,
              time: elapsed,
              memory: 0,
            });
          } else {
            resolve({
              stdout: b64Encode(stdout || ""),
              stderr: b64Encode(stderr || ""),
              compile_output: null,
              status: STATUS.RUNTIME_ERROR_NZEC,
              time: elapsed,
              memory: 0,
            });
          }
        } else {
          resolve({
            stdout: b64Encode(stdout || ""),
            stderr: b64Encode(stderr || ""),
            compile_output: null,
            status: STATUS.ACCEPTED,
            time: elapsed,
            memory: 0,
          });
        }
      },
    );
  });
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
  });
}

function parseUrl(reqUrl) {
  return new URL(reqUrl, `http://localhost:${PORT}`);
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = parseUrl(req.url);
  const pathname = url.pathname;

  try {
    // GET /about
    if (req.method === "GET" && pathname === "/about") {
      sendJson(res, 200, {
        version: "1.0.0-local",
        name: "Code Royale Local Execution Server",
        description: "Judge0-compatible API for local development",
      });
      return;
    }

    // POST /submissions — single submission
    if (req.method === "POST" && pathname === "/submissions") {
      const body = JSON.parse(await readBody(req));
      const isBase64 = url.searchParams.get("base64_encoded") === "true";
      const waitForResult = url.searchParams.get("wait") === "true";

      const sourceCode = isBase64
        ? b64Decode(body.source_code)
        : body.source_code;
      const stdin = isBase64 ? b64Decode(body.stdin || "") : body.stdin || "";
      const languageId = body.language_id;

      const token = randomUUID();

      if (waitForResult) {
        // Synchronous: execute and return result
        const result = await executeCode(sourceCode, languageId, stdin);
        result.token = token;
        results.set(token, result);
        sendJson(res, 201, result);
      } else {
        // Async: return token immediately, execute in background
        results.set(token, { status: STATUS.QUEUED, token });
        sendJson(res, 201, { token });

        results.set(token, { status: STATUS.PROCESSING, token });
        const result = await executeCode(sourceCode, languageId, stdin);
        result.token = token;
        results.set(token, result);
      }
      return;
    }

    // GET /submissions/:token — get result
    if (req.method === "GET" && pathname.match(/^\/submissions\/[^/]+$/)) {
      const token = pathname.split("/").pop();

      // Check if it's a batch request
      if (token === "batch") {
        // Handle batch GET (see below)
      } else {
        const result = results.get(token);
        if (!result) {
          sendJson(res, 404, { error: "Submission not found" });
          return;
        }
        sendJson(res, 200, result);
        return;
      }
    }

    // POST /submissions/batch — batch submission
    if (req.method === "POST" && pathname === "/submissions/batch") {
      const body = JSON.parse(await readBody(req));
      const isBase64 = url.searchParams.get("base64_encoded") === "true";
      const submissions = body.submissions || [];

      const tokens = [];
      const promises = [];

      // Optimization: If all submissions share the same source code and language, compile once.
      // This is especially critical for C++ to avoid multi-second re-compilations.
      let sharedJobDir = null;
      let compileErrorResult = null;
      
      if (submissions.length > 0) {
        const first = submissions[0];
        const allSame = submissions.every(s => s.source_code === first.source_code && s.language_id === first.language_id);
        
        if (allSame && first.language_id === 54) {
          const sourceCode = isBase64 ? b64Decode(first.source_code) : first.source_code;
          sharedJobDir = path.join(JOBS_DIR, randomUUID());
          await mkdir(sharedJobDir, { recursive: true });
          
          const sourceFile = path.join(sharedJobDir, "solution.cpp");
          await writeFile(sourceFile, sourceCode, "utf-8");
          
          // Pre-compile
          const out = path.join(sharedJobDir, "solution.out");
          const compileCmd = `g++ -std=c++23 -O2 -o ${out} ${sourceFile}`;
          
          compileErrorResult = await new Promise((resolve) => {
            exec(compileCmd, { cwd: sharedJobDir, timeout: 15000 }, (error, stdout, stderr) => {
              if (error) {
                resolve({
                  stdout: null,
                  stderr: null,
                  compile_output: b64Encode(stderr || ""),
                  status: STATUS.COMPILATION_ERROR,
                  time: "0.000",
                  memory: 0,
                });
              } else {
                resolve(null); // success
              }
            });
          });
        }
      }

      for (const sub of submissions) {
        const token = randomUUID();
        tokens.push({ token });
        results.set(token, { status: STATUS.QUEUED, token });

        if (compileErrorResult) {
          // If pre-compilation failed, immediately set error for all
          results.set(token, { ...compileErrorResult, token });
          continue;
        }

        const sourceCode = isBase64 ? b64Decode(sub.source_code) : sub.source_code;
        const stdin = isBase64 ? b64Decode(sub.stdin || "") : sub.stdin || "";

        promises.push(
          executeCode(sourceCode, sub.language_id, stdin, sharedJobDir).then((result) => {
            result.token = token;
            results.set(token, result);
          }),
        );
      }

      // Start all executions in background
      Promise.all(promises).then(async () => {
        if (sharedJobDir) {
          try {
            const { rm } = await import("node:fs/promises");
            await rm(sharedJobDir, { recursive: true, force: true });
          } catch { /* ignore */ }
        }
      }).catch(console.error);

      sendJson(res, 201, tokens);
      return;
    }

    // GET /submissions/batch?tokens=... — get batch results
    if (req.method === "GET" && pathname === "/submissions/batch") {
      const tokensStr = url.searchParams.get("tokens") || "";
      const tokenList = tokensStr.split(",").filter(Boolean);

      const submissions = tokenList.map(
        (t) => results.get(t) || { status: STATUS.QUEUED, token: t },
      );

      sendJson(res, 200, { submissions });
      return;
    }

    // 404 fallback
    sendJson(res, 404, { error: "Not found" });
  } catch (err) {
    console.error("Server error:", err);
    sendJson(res, 500, { error: err.message });
  }
});

await ensureJobsDir();

server.listen(PORT, () => {
  console.log(`\n🚀 Code Royale Execution Server running on port ${PORT}`);
  console.log(`   Judge0-compatible API at http://localhost:${PORT}`);
  console.log(`\n   Available languages:`);
  for (const [id, lang] of Object.entries(LANGUAGES)) {
    console.log(`     ${id}: ${lang.name}`);
  }
  console.log(`\n   Test: curl http://localhost:${PORT}/about\n`);
});
