"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await signOut();
        router.refresh();
      }}
      className="rounded-md border px-4 py-2 text-sm hover:bg-accent"
    >
      Logout
    </button>
  );
}
