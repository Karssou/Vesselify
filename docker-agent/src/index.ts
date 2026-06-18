import Docker from "dockerode";
import { initAgentCommunication } from "./communication";
import { streamContainerLogs } from "./dockerActions";

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

async function main() {
  console.log("Lancement de la surveillance Vesselify...");
  initAgentCommunication();
}

main();
