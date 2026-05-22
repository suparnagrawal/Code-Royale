# Code Royale

Code Royale is a real-time, head-to-head coding arena where two authenticated players are matched, placed into a shared room, and see each other's edits in near real time; the interesting part is the split between the Next.js app that owns auth and UI and a separate Socket.io service that owns matchmaking and room state.

## Demo Link

To be updated

## How It Works

The Next.js app is built in the App Router and gates the UI on a server-side session check. Auth is implemented with better-auth, and its adapter writes directly to Postgres through Drizzle using the Neon serverless driver. That keeps session state in the database and allows the app to expose a small internal endpoint that returns the authenticated user id.

The Socket.io server lives in a separate process (there is no custom server in this repo). It authenticates sockets by calling the internal user endpoint with an internal key, then queues players and creates a room when two are available. The web client connects with socket.io-client and listens for queue and battle events. Judge0 is not wired yet; auth is better-auth and code execution is not implemented.

## Stack

| Technology           | Purpose                                            |
| -------------------- | -------------------------------------------------- |
| Next.js (App Router) | Web UI and API routes                              |
| React                | Component model for the UI                         |
| TypeScript           | Type safety across the app and socket server       |
| Tailwind CSS         | Styling and design tokens                          |
| shadcn/ui + Radix UI | UI primitives and components                       |
| better-auth          | Authentication flows and session handling          |
| Drizzle ORM          | SQL schema and ORM layer                           |
| Neon (serverless)    | Postgres driver used by Drizzle                    |
| PostgreSQL           | Persistent auth data store                         |
| Socket.io            | Realtime transport for matchmaking and typing sync |
| Express              | HTTP server hosting the Socket.io instance         |
| Bun                  | Runtime used to execute the socket server          |
| Monaco Editor        | Code editor in the battlefield view                |
| Zod                  | Form validation for login and registration         |
| Sonner               | Toast notifications                                |

## Features

### Shipped

- Email/password sign-up and sign-in with session gating and logout
- Google OAuth sign-in wired through the auth client
  -Matchmaking queue and battle start flow (with hardcoded elo)
- Live opponent typing preview

### In progress

- Elo logic and integration
- Code execution and judging (Run/Submit have no handlers right now)
- Mission content and game state (placeholder strings and no backend data)
- Battlefield status panel and enter page stubs

## Project Structure

```
.
├─ .env                       Local environment variables for web app and socket server
├─ .gitignore                 Git ignore rules
├─ README.md                  Project documentation
├─ app/                       Next.js App Router routes and layout
│  ├─ api/                    API route handlers
│  │  ├─ auth/                better-auth Next.js handler
│  │  │  └─ [...all]/         catch-all auth route
│  │  │     └─ route.ts       better-auth request handler
│  │  └─ internal/            internal endpoints for socket server
│  │     └─ user-info/        internal session lookup
│  │        └─ route.ts       returns authenticated user id for sockets
│  ├─ battlefield/            battlefield page
│  │  └─ page.tsx             battlefield layout with mission + editor panels
│  ├─ controlBooth/           pre-match staging page
│  │  └─ page.tsx             queue entry UI + logout
│  ├─ enter/                  entry route stub
│  │  └─ page.tsx             empty page placeholder
│  ├─ favicon.ico             app icon
│  ├─ globals.css             Tailwind base and theme tokens
│  ├─ layout.tsx              root layout with auth gating and fonts
│  └─ page.tsx                home page placeholder with logout button
├─ bun.lock                   Bun lockfile for the web app
├─ components/                React components
│  ├─ auth/                   authentication UI
│  │  ├─ LoginOrRegister.tsx  login/register form and Google sign-in
│  │  └─ LogoutButton.tsx     sign-out button and session refresh
│  ├─ battlefield/            battlefield UI pieces
│  │  ├─ AttackPanel.tsx      dual Monaco editors with typing preview
│  │  ├─ BattlefieldNavbar.tsx top bar with mission info and controls
│  │  ├─ Mission.tsx          mission description and examples panel
│  │  └─ StatusPanel.tsx      empty status panel stub
│  ├─ controlBooth/           pre-match UI
│  │  └─ EnterBattlefield.tsx connects socket and joins matchmaking
│  ├─ monaco/                 Monaco editor wrapper
│  │  └─ editor.tsx           standalone Monaco editor component
│  └─ ui/                     shadcn UI primitives
│     ├─ button.tsx           button component styles
│     ├─ card.tsx             card layout components
│     ├─ field.tsx            form field helpers
│     ├─ input.tsx            input component styles
│     ├─ label.tsx            label component styles
│     ├─ menubar.tsx          menubar primitives
│     ├─ scroll-area.tsx      scroll area primitives
│     ├─ separator.tsx        separator primitive
│     └─ sonner.tsx           toast wrapper and icons
├─ components.json            shadcn UI config
├─ drizzle.config.ts          Drizzle Kit configuration
├─ eslint.config.mjs          ESLint configuration
├─ lib/                       shared app utilities
│  ├─ auth-client.ts          better-auth client helpers
│  ├─ auth.ts                 better-auth server config with Drizzle adapter
│  ├─ socket.ts               socket.io client singleton
│  ├─ utils.ts                class name merge helper
│  └─ validations/
│     └─ auth.ts              Zod schemas for login/register
├─ next-env.d.ts              Next.js type declarations
├─ next.config.ts             Next.js config (default)
├─ package-lock.json          npm lockfile
├─ package.json               web app scripts and dependencies
├─ postcss.config.mjs         PostCSS config for Tailwind
├─ public/                    static assets
│  ├─ file.svg                static icon
│  ├─ globe.svg               static icon
│  ├─ next.svg                Next.js logo
│  ├─ vercel.svg              Vercel logo
│  └─ window.svg              static icon
├─ socket-server/             standalone Socket.io service
│  ├─ .gitignore              socket server ignore rules
│  ├─ bun.lock                Bun lockfile for socket server
│  ├─ package.json            socket server dependencies
│  ├─ README.md               socket server usage notes
│  ├─ tsconfig.json           socket server TypeScript config
│  └─ src/
│     ├─ index.ts             Express + Socket.io server entrypoint
│     ├─ matchmaking/
│     │  ├─ game.ts           creates rooms and emits battle start
│     │  ├─ matchmaking.ts    selects players from the queue
│     │  ├─ queue.ts          queue state and queue events
│     │  └─ state.ts          in-memory matchmaking state
│     ├─ socket/
│     │  ├─ middleware/
│     │  │  └─ auth.ts        socket auth via internal user-info endpoint
│     │  └─ socket.ts         socket event handlers
│     └─ types/
│        └─ player.ts         player type for matchmaking
├─ src/
│  └─ db/
│     ├─ auth-schema.ts       Drizzle schema for auth tables
│     ├─ db.ts                Drizzle client wired to Neon
│     └─ schema.ts            schema export barrel
└─ tsconfig.json              TypeScript config for the web app
```

## Local Setup

The repo runs two processes: the Next.js web app and the Socket.io server. Start both for matchmaking and live typing.

1. Install web app dependencies:

```
npm install
```

2. Install socket server dependencies:

```
cd socket-server
bun install
```

3. Create or update the environment file:

```
.env
```

| Variable             | Service                 | What it does                                               | Required           |
| -------------------- | ----------------------- | ---------------------------------------------------------- | ------------------ |
| DATABASE_URL         | web app                 | Postgres connection string used by Drizzle                 | required           |
| BETTER_AUTH_URL      | web app                 | Base URL used by better-auth for callbacks                 | required           |
| GOOGLE_CLIENT_ID     | web app                 | Google OAuth client id for better-auth                     | required           |
| GOOGLE_CLIENT_SECRET | web app                 | Google OAuth client secret for better-auth                 | required           |
| INTERNAL_API_KEY     | web app + socket server | Shared secret for the internal user lookup and socket auth | required           |
| BETTER_AUTH_SECRET   | web app                 | For future applications                                    | Currently optional |
| SOCKET_SERVER_URL    | web app                 | For future applications                                    | Currently optional |

4. Run database migrations (no scripts are defined, use Drizzle Kit directly):

```
npx drizzle-kit generate
npx drizzle-kit migrate
```

5. Start the web app dev server:

```
npm run dev
```

6. Start the socket server:

```
cd socket-server
bun run src/index.ts
```

## Database Schema

### user

| Column         | Type      | Constraints                             |
| -------------- | --------- | --------------------------------------- |
| id             | text      | primary key                             |
| name           | text      | not null                                |
| email          | text      | not null, unique                        |
| email_verified | boolean   | not null, default false                 |
| image          | text      | nullable                                |
| created_at     | timestamp | not null, default now                   |
| updated_at     | timestamp | not null, default now, updates on write |

Relations: one user has many sessions and many accounts.

### session

| Column     | Type      | Constraints                                         |
| ---------- | --------- | --------------------------------------------------- |
| id         | text      | primary key                                         |
| expires_at | timestamp | not null                                            |
| token      | text      | not null, unique                                    |
| created_at | timestamp | not null, default now                               |
| updated_at | timestamp | not null, default now, updates on write             |
| ip_address | text      | nullable                                            |
| user_agent | text      | nullable                                            |
| user_id    | text      | not null, foreign key to user.id, on delete cascade |

Relations: each session belongs to one user; indexed by user_id.

### account

| Column                   | Type      | Constraints                                         |
| ------------------------ | --------- | --------------------------------------------------- |
| id                       | text      | primary key                                         |
| account_id               | text      | not null                                            |
| provider_id              | text      | not null                                            |
| user_id                  | text      | not null, foreign key to user.id, on delete cascade |
| access_token             | text      | nullable                                            |
| refresh_token            | text      | nullable                                            |
| id_token                 | text      | nullable                                            |
| access_token_expires_at  | timestamp | nullable                                            |
| refresh_token_expires_at | timestamp | nullable                                            |
| scope                    | text      | nullable                                            |
| password                 | text      | nullable                                            |
| created_at               | timestamp | not null, default now                               |
| updated_at               | timestamp | not null, default now, updates on write             |

Relations: each account belongs to one user; indexed by user_id.

### verification

| Column     | Type      | Constraints                             |
| ---------- | --------- | --------------------------------------- |
| id         | text      | primary key                             |
| identifier | text      | not null                                |
| value      | text      | not null                                |
| expires_at | timestamp | not null                                |
| created_at | timestamp | not null, default now                   |
| updated_at | timestamp | not null, default now, updates on write |

Relations: verification entries are indexed by identifier.

## Socket.io Events

| Event                 | Direction        | Payload                                               | What it triggers                                              |
| --------------------- | ---------------- | ----------------------------------------------------- | ------------------------------------------------------------- |
| connection            | client -> server | Socket.io handshake (cookies read by auth middleware) | Attaches user id to socket and wires handlers                 |
| queue:enter           | client -> server | number (client sends 1200)                            | Adds player to queue and emits queued; may start a match      |
| queued                | server -> client | none                                                  | Control booth shows queued state                              |
| battle:start          | server -> client | none                                                  | Control booth navigates to /battlefield                       |
| queue:leave           | client -> server | none                                                  | Removes player from queue                                     |
| typing:preview        | client -> server | object with preview string                            | Forwards preview to opponent as opponent:preview              |
| opponent:preview      | server -> client | object with preview string                            | Battlefield updates the opponent editor text                  |
| opponent:reconnected  | server -> client | none                                                  | Emitted to room on reconnect (no client handler yet)          |
| opponent:reconnecting | server -> client | object with reconnectEndsAt in ms                     | Emitted on disconnect (no client handler yet)                 |
| opponent:left         | server -> client | none                                                  | Emitted after reconnect window closes (no client handler yet) |
| disconnect            | client -> server | none                                                  | Starts reconnect timer and room cleanup                       |

## Deployment

Railway should run this repo as two services: the Next.js app at the repo root and the Socket.io server. For the web app service, run:

```
npm install
npm run build
npm run start
```

For the socket server service, run:

```
cd socket-server
bun install
bun run src/index.ts
```

Vercel is not a fit for this repo because the Socket.io server is a long-lived process that lives outside the Next.js app; it cannot run as a serverless function and must be deployed as a separate service.

## What Is Left

Matchmaking still hard-codes Elo and leaves a TODO to fetch it from the database.

```
socket-server/src/socket/socket.ts#L61-L67
```

Run and Submit are present in the battlefield header but have no handlers, so code execution and Judge0 integration are not wired.

```
components/battlefield/BattlefieldNavbar.tsx#L20-L39
```

Mission content has to be loaded from a backend route and not hardcoded

```
app/battlefield/page.tsx#L7-L16
```

Socket URLs are hard-coded to localhost in both the client and the socket server, so deployment requires code changes.

```
lib/socket.ts#L7-L12
socket-server/src/index.ts#L17-L21
```

Disconnect timer cleanup uses the timer object as the map key, so old entries are not removed correctly.

```
socket-server/src/socket/socket.ts#L41-L47
```

The enter page and status panel are empty stubs.

```
app/enter/page.tsx
components/battlefield/StatusPanel.tsx
```
