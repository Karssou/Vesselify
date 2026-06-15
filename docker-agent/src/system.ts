import si from "systeminformation";

export async function getServerMetrics() {
  try {
    const cpuLoad = await si.currentLoad();
    const memory = await si.mem();
    const disk = await si.fsSize();
    const metrics = {
      cpuCurrentUsage: Math.round(cpuLoad.currentLoad),
      ram: {
        totalGb: (memory.total / 1024 / 1024 / 1024).toFixed(2),
        usedGb: (memory.used / 1024 / 1024 / 1024).toFixed(2),
        usagePercentage: Math.round((memory.used / memory.total) * 100),
      },
      disk: {
        sizeGb: (disk[0].size / 1024 / 1024 / 1024).toFixed(2),
        usedGb: (disk[0].used / 1024 / 1024 / 1024).toFixed(2),
        usagePercentage: Math.round(disk[0].use),
      },
    };

    return metrics;
  } catch (error) {
    console.error("Impossible de récupérer les métriques système :", error);
  }
}

export async function getStaticSystemInfo() {
  try {
    const os = await si.osInfo();
    const cpu = await si.cpu();
    const mem = await si.mem();


    let dockerVersion = "Non installé";
    try {
      const dockerData = await si.dockerInfo();
      // systeminformation renvoie la version sous forme de chaîne (ex: "24.0.7")
      if (dockerData && dockerData.serverVersion) {
        dockerVersion = dockerData.serverVersion;
      }
    } catch {
      dockerVersion = "Inaccessible / Non installé";
    }

    return {
      osName: os.distro,
      osVersion: os.release,
      cpuModel: `${cpu.manufacturer} ${cpu.brand}`,
      cpuCores: cpu.cores,
      ramTotal: mem.total,
      dockerVersion,
    };
  } catch {
    return null;
  }
}
