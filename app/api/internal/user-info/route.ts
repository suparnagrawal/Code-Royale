import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const ALLOWED_SERVER = process.env.SOCKET_SERVER_URL!;
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY!;

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");
  const internalKey = req.headers.get("req-internal-key");

  if (internalKey !== INTERNAL_API_KEY) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (origin && origin !== ALLOWED_SERVER) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: session.user.id,
    },
  });
}
