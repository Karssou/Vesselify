<script lang="ts" setup>
definePageMeta({
  layout: "dashboard-layout",
});

// On récupère l'ID du serveur (depuis la route ou une prop)
const serverId = "6386cc4d-c630-48bc-88af-4409f4d46d70";

const { metrics, isConnected, error, connect } = useServerMetrics(serverId);

// On lance la connexion au montage du composant
onMounted(() => {
  connect();
});

const response = ref("");

async function getServer() {
  const req: any = await $fetch("/api/servers/list-server");
  response.value = req;
}
</script>

<template>
  <div class="p-6 space-y-6 max-w-[1600px]">
    <div class="flex flex-col gap-1">
      <h1
        class="text-5xl font-mono font-bold text-white uppercase tracking-wider"
      >
        System Overview
      </h1>
      <p class="text-zinc-500 font-mono">
        Real-time infrastructure performance & resource allocation.
      </p>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div class="md:col-span-2 lg:col-span-2">
        <DashboardCardsCPUMetrics />
      </div>

      <div class="md:col-span-2 lg:col-span-2">
        <DashboardCardsMemoryMetrics :value="metrics?.ram?.usagePercentage" />
      </div>

      <div class="col-span-1">
        <DashboardCardsStorage />
      </div>

      <div class="col-span-1">
        <DashboardCardsSystem />
      </div>

      <div class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 mt-2">
        <DashboardCardsContainer />
        <UButton label="Get Server" @click="getServer" />
      </div>
    </div>
    <pre>{{ response }}</pre>
  </div>

  <div>
    <h1 class="font-mono text-6xl">WEBSOCKET</h1>
    <div>
      <div v-if="error" class="text-red-500">{{ error }}</div>

      <div class="flex items-center gap-2">
        <span
          class="w-3 h-3 rounded-full"
          :class="isConnected ? 'bg-green-500' : 'bg-red-500'"
        ></span>
        <span
          >Flux Temps Réel : {{ isConnected ? "Actif" : "Déconnecté" }}</span
        >
      </div>

      <div v-if="metrics" class="flex gap-1">
        <div class="p-4">
          <p class="text-xs">CPU</p>
          <p class="text-2xl font-bold">{{ metrics.cpuCurrentUsage }}%</p>
        </div>

        <div class="p-4">
          <p class="text-xs">RAM</p>
          <p class="text-2xl font-bold">{{ metrics.ram?.usagePercentage }}%</p>
        </div>
      </div>
      <div v-else class="text-muted mt-4">
        En attente des premières métriques de l'agent...
      </div>
    </div>
  </div>
</template>
