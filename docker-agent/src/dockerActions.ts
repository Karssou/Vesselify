import Docker from "dockerode";
import { Socket } from "socket.io-client";
import { PassThrough } from "stream";

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

/**
 * Démarre un conteneur arrêté
 */
export async function startContainer(containerId: string): Promise<boolean> {
  try {
    const container = docker.getContainer(containerId);
    await container.start();
    console.log(
      `✅ Conteneur [${containerId.substring(0, 12)}] démarré avec succès.`,
    );
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors du démarrage de [${containerId}]:`, error);
    return false;
  }
}

/**
 * Arrête un conteneur en cours d'exécution
 */
export async function stopContainer(containerId: string): Promise<boolean> {
  try {
    const container = docker.getContainer(containerId);
    await container.stop();
    console.log(
      `✅ Conteneur [${containerId.substring(0, 12)}] arrêté avec succès.`,
    );
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors de l'arrêt de [${containerId}]:`, error);
    return false;
  }
}

/**
 * Redémarre un conteneur
 */
export async function restartContainer(containerId: string): Promise<boolean> {
  try {
    const container = docker.getContainer(containerId);
    await container.restart();
    console.log(
      `✅ Conteneur [${containerId.substring(0, 12)}] redémarré avec succès.`,
    );
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors du redémarrage de [${containerId}]:`, error);
    return false;
  }
}

/**
 * Récupère le flux de logs d'un conteneur et le renvoie sur le WebSocket
 */
export async function streamContainerLogs(containerId: string, socket: Socket) {
  try {
    const container = docker.getContainer(containerId);

    const logStream = await container.logs({
      follow: true,
      stdout: true,
      stderr: true,
      tail: 50, // On envoie les 50 dernières lignes pour l'affichage initial
    });

    const stdoutStream = new PassThrough();
    const stderrStream = new PassThrough();

    // Sépare proprement les flux sans corrompre les encodages de caractères
    container.modem.demuxStream(logStream, stdoutStream, stderrStream);

    console.log(
      `\n📺 Flux de logs activé pour [${containerId.substring(0, 12)}]`,
    );

    // Lecture du flux standard
    stdoutStream.on("data", (chunk: Buffer) => {
      socket.emit("container:logs:stream", {
        containerId,
        type: "stdout",
        log: chunk.toString("utf8"),
      });
    });

    // Lecture du flux d'erreur
    stderrStream.on("data", (chunk: Buffer) => {
      socket.emit("container:logs:stream", {
        containerId,
        type: "stderr",
        log: chunk.toString("utf8"),
      });
    });

    // Si le conteneur s'arrête en cours de route
    logStream.on("end", () => {
      socket.emit("container:logs:end", { containerId });
      console.log(
        `🔌 Flux terminé pour le conteneur [${containerId.substring(0, 12)}]`,
      );
    });

    // TRÈS IMPORTANT : Si le socket se déconnecte, on coupe le stream Docker pour pas surcharger le processeur
    socket.on("disconnect", () => {
      logStream.pause();
      stdoutStream.destroy();
      stderrStream.destroy();
    });
  } catch (error) {
    console.error("❌ Erreur lors du streaming des logs :", error);
    socket.emit("container:logs:error", {
      containerId,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
