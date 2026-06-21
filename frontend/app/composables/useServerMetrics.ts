import { ref, onUnmounted } from "vue";
import { io, Socket } from "socket.io-client";

export const useServerMetrics = (serverId: string) => {
  const socket = ref<Socket | null>(null);

  const metrics = ref<any>(null);
  const isConnected = ref(false);
  const error = ref<string | null>(null);

  // Initialisation de la connexion
  const connect = () => {
    if (socket.value?.connected) return;

    const backendUrl = useRuntimeConfig().public.apiBaseUrl;

    socket.value = io(backendUrl, {
      query: { serverId },
      transports: ["websocket", "polling"],
    });

    socket.value.on("connect", () => {
      isConnected.value = true;
      error.value = null;
      console.log(
        `[WS Front] Connecté au flux temps réel du serveur : ${serverId}`,
      );
    });

    // Écoute l'événement émis par Adonis
    socket.value.on("front:metrics", (data: any) => {
      metrics.value = data;
    });

    socket.value.on("connect_error", (err) => {
      error.value = "Impossible de se connecter au serveur de streaming.";
      isConnected.value = false;
      console.error("[WS Front] Erreur de connexion:", err.message);
    });

    socket.value.on("disconnect", () => {
      isConnected.value = false;
    });
  };

  const disconnect = () => {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  };

  // Nettoyage automatique quand le composant Nuxt est détruit
  onUnmounted(() => {
    disconnect();
  });

  return {
    metrics,
    isConnected,
    error,
    connect,
    disconnect,
  };
};
