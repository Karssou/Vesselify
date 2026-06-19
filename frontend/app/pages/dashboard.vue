<script lang="ts" setup>
definePageMeta({
  layout: "dashboard-layout",
});
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
        <DashboardCardsMemoryMetrics />
      </div>

      <div class="col-span-1">
        <DashboardCardsStorage />
      </div>

      <div class="col-span-1">
        <DashboardCardsSystem />
      </div>

      <div class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 mt-2">
        <DashboardCardsContainer />
      </div>
    </div>
  </div>
</template>
