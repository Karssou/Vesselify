<script lang="ts" setup>
definePageMeta({
  layout: "dashboard-layout",
});
</script>

<template>
  <h1>Le dashboard</h1>
  <DashboardCardsContainer />
  <ChartsDonut label="Salut" :value="70" />

  <DashboardCardsCPUMetrics class="max-w-3xl" />
</template>
