import LogoutButton from "@/components/auth/LogoutButton";
import EnterBattlefield from "@/components/controlBooth/EnterBattlefield";
import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/src/db/db";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session) {
    redirect("/");
  }

  const userData = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  const elo = userData?.elo || 1200;

  return (
    <>
      <div className="absolute top-4 right-4 flex items-center gap-4 z-50">
        <div className="px-4 py-2 bg-muted/50 rounded-full border text-sm font-semibold tracking-wider text-muted-foreground shadow-sm">
          Elo Rating: <span className="text-primary">{elo}</span>
        </div>
        <LogoutButton />
      </div>
      <EnterBattlefield elo={elo} />
    </>
  );
};

export default page;
