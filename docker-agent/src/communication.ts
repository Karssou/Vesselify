import { io } from "socket.io-client";
import { getServerMetrics, getStaticSystemInfo } from "./system";

import { streamContainerLogs } from "./dockerActions";

const BACKEND_URL = process.env.API_URL;
const SERVER_ID = process.env.SERVER_ID;
const AGENT_TOKEN = process.env.AGENT_TOKEN;

let isUsingHttpFallback = false;

export function initAgentCommunication() {
  console.log("Liaison de l'agent avec le panel Vesselify...");

  const socket = io(BACKEND_URL, {
    query: { serverId: SERVER_ID },
    auth: { token: AGENT_TOKEN },
    extraHeaders: { Authorization: `Bearer ${AGENT_TOKEN}` },
    transports: ["websocket", "polling"],
    timeout: 5000,
  });

  socket.on("connect", async () => {
    console.log("Connecté au backend en WebSocket !");
    isUsingHttpFallback = false;

    const staticInfo = await getStaticSystemInfo();
    console.log("Les infos du bousin : ", staticInfo);

    setTimeout(() => {
      socket.emit("agent:register", { serverId: SERVER_ID, ...staticInfo });
      console.log("Événement agent:register envoyé au backend !");
    }, 500);

    socket.on(
      "container:logs:request",
      async (data: { containerId: string }) => {
        if (!data.containerId) return;

        console.log(
          `Demande de logs reçue pour le conteneur: ${data.containerId}`,
        );
        // On lance le streaming en lui passant l'instance actuelle du socket
        await streamContainerLogs(data.containerId, socket);
      },
    );

    const wsInterval = setInterval(async () => {
      if (socket.disconnected) {
        clearInterval(wsInterval);
        return;
      }
      const metrics = await getServerMetrics();
      socket.emit("agent:metrics", { metrics });
    }, 5000);
  });

  socket.on("connect_error", (error) => {
    if (isUsingHttpFallback) return;

    console.warn("WebSocket échoué ou bloqué. Raison :", error.message);
    console.warn("Bascule automatique sur le mode Fallback HTTP POST...");

    isUsingHttpFallback = true;
    socket.disconnect();

    const httpInterval = setInterval(async () => {
      try {
        const metrics = await getServerMetrics();
        console.info("PING de la transmission HTTP...");

        const response = await fetch(`${BACKEND_URL}/agent/ping`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AGENT_TOKEN}`,
          },
          body: JSON.stringify({ serverId: SERVER_ID, metrics }),
        });

        if (response.status === 401) {
          console.error("Token invalide, arrêt des pings.");
          clearInterval(httpInterval);
        }
      } catch (err) {
        console.error(
          "Échec de la transmission HTTP :",
          err instanceof Error ? err.message : err,
        );
      }
    }, 5000);
  });
}
