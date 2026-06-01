import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import crypto from "crypto";

export async function POST() {
  const h = await headers();

  const session = await auth.api.getSession({
    headers: h,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Create a ticket that expires in 60 seconds
  const payloadObj = {
    userId: session.user.id,
    exp: Date.now() + 60000,
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payloadObj)).toString("base64");
  
  // Sign the payload using the internal API key
  const signature = crypto
    .createHmac("sha256", process.env.INTERNAL_API_KEY!)
    .update(payloadBase64)
    .digest("hex");

  const ticket = `${payloadBase64}.${signature}`;

  return NextResponse.json({ ticket });
}
