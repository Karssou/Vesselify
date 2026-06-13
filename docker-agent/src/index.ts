import Docker from "dockerode";
import { getServerMetrics } from "./system.js"; // N'oublie pas le .js si tu es en type: module

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

async function main() {
  console.log("🚀 Lancement de la surveillance Vesselify...");


  await getServerMetrics();


  setInterval(async () => {
    await getServerMetrics();
  }, 5000);
}

main();
