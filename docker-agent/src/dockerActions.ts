import Docker from "dockerode";

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
 * Récupère et affiche le flux de logs en continu d'un conteneur
 */
export async function streamContainerLogs(containerId: string) {
  try {
    const container = docker.getContainer(containerId);

    // On demande à Docker le stream des logs (stdout = sorties normales, stderr = erreurs)
    const logStream = await container.logs({
      follow: true, // Reste branché pour recevoir les futurs logs
      stdout: true,
      stderr: true,
      tail: 20, // Récupère les 20 lignes précédentes au démarrage
    });

    console.log(
      `\n📺 Début du flux de logs pour [${containerId.substring(0, 12)}] :`,
    );

    // Docker multiplexe les logs (il ajoute des headers invisibles pour séparer stdout/stderr)
    // Pour un test simple en console, on peut lire le buffer directement :
    logStream.on("data", (chunk: Buffer) => {
      // On nettoie un peu les caractères de contrôle spécifiques au protocole Docker
      console.log(
        chunk.toString("utf8").replace(/[\u0000-\u001F\u007F-\u009F]/g, ""),
      );
    });

    logStream.on("end", () => {
      console.log(
        "🔌 Flux de logs terminé (le conteneur s'est arrêté ou la connexion a coupé).",
      );
    });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des logs :", error);
  }
}
