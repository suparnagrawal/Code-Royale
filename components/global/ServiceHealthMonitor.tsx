"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { getSocket } from "@/lib/socket";

export default function ServiceHealthMonitor() {
  const isSocketDown = useRef(false);
  const isExecDown = useRef(false);

  useEffect(() => {
    // 1. Socket Health Monitoring
    const socket = getSocket();

    const handleConnectError = () => {
      if (!isSocketDown.current) {
        isSocketDown.current = true;
        toast.error("⚠️ Matchmaking Socket is offline!", {
          description: "Please start the local socket server to queue for matches.",
          duration: 10000,
          id: "socket-down-toast"
        });
      }
    };

    const handleDisconnect = (reason: string) => {
      if (reason === "io server disconnect" || reason === "transport close" || reason === "ping timeout") {
        handleConnectError();
      }
    };

    const handleConnect = () => {
      if (isSocketDown.current) {
        isSocketDown.current = false;
        toast.success("✅ Matchmaking Socket is back online!", {
          id: "socket-down-toast"
        });
      }
    };

    socket.on("connect_error", handleConnectError);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect", handleConnect);

    // Initial check if already connected
    if (socket.connected) {
      handleConnect();
    }

    // 2. Execution Sandbox Health Monitoring
    let interval: NodeJS.Timeout;
    
    const checkExecHealth = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_SOCKET_URL;
        if (!url) return;
        
        const res = await fetch(`${url}/about`, {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
          // Short timeout to detect failures quickly
          signal: AbortSignal.timeout(3000)
        });

        if (res.ok) {
          if (isExecDown.current) {
            isExecDown.current = false;
            toast.success("✅ Execution Sandbox is back online!", {
              id: "exec-down-toast"
            });
          }
        } else {
          throw new Error("Execution server returned non-200");
        }
      } catch (err) {
        if (!isExecDown.current) {
          isExecDown.current = true;
          toast.error("⚠️ Execution Sandbox is offline!", {
            description: "Code compilation and execution will fail. Please start Docker.",
            duration: 10000,
            id: "exec-down-toast"
          });
        }
      }
    };

    // Check immediately, then every 15 seconds
    checkExecHealth();
    interval = setInterval(checkExecHealth, 15000);

    return () => {
      socket.off("connect_error", handleConnectError);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect", handleConnect);
      clearInterval(interval);
    };
  }, []);

  return null; // This is a logic-only component
}
