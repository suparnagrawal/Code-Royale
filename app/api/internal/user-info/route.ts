import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY!;

export async function GET() {
  const h = await headers();

  const internalKey = h.get("req-internal-key");

  if (internalKey !== INTERNAL_API_KEY) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const session = await auth.api.getSession({
    headers: h,
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
