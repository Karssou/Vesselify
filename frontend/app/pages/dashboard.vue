<script lang="ts" setup>
definePageMeta({
  layout: "dashboard-layout",
});
</script>

<template>
  <h1>Le dashboard</h1>

  <div class="inline-flex items-center gap-4">
    <DashboardCardsCPUMetrics />
    <DashboardCardsMemoryMetrics />
    <DashboardCardsSystem />
    <DashboardCardsContainer />
  </div>
</template>
