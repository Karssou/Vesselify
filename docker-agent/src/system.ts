import si from "systeminformation";

export async function getServerMetrics() {
  try {
    // On récupère plusieurs infos en même temps (données dynamiques)
    const cpuLoad = await si.currentLoad();
    const memory = await si.mem();
    const disk = await si.fsSize();

    // On calcule les pourcentages proprement
    const metrics = {
      cpuCurrentUsage: Math.round(cpuLoad.currentLoad), // % d'utilisation CPU global
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

    console.log(`\n📊 Métriques Serveur :`);
    console.log(`🖥️  CPU : ${metrics.cpuCurrentUsage}%`);
    console.log(
      `🧠 RAM : ${metrics.ram.usedGb}GB / ${metrics.ram.totalGb}GB (${metrics.ram.usagePercentage}%)`,
    );
    console.log(
      `💾 Disque : ${metrics.disk.usedGb}GB / ${metrics.disk.sizeGb}GB (${metrics.disk.usagePercentage}%)`,
    );

    return metrics;
  } catch (error) {
    console.error("❌ Impossible de récupérer les métriques système :", error);
  }
}
