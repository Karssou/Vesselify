<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    usedGb?: number;
    totalGb?: number;
    tierName?: string;
    tierType?: string;
  }>(),
  {
    usedGb: 384,
    totalGb: 512,
    tierName: "NVMe SSD Tier",
    tierType: "Premium",
  },
);

const usagePercentage = computed(() => {
  if (!props.totalGb) return 0;
  return Math.round((props.usedGb / props.totalGb) * 100);
});

const chartOptions = computed(() => ({
  chart: {
    type: "radialBar",
    sparkline: { enabled: true },
  },
  plotOptions: {
    radialBar: {
      startAngle: 0,
      endAngle: 360,
      hollow: {
        margin: 0,
        size: "70%",
        background: "transparent",
      },
      track: {
        background: "rgba(255, 255, 255, 0.05)",
        strokeWidth: "100%",
        margin: 0,
      },
      dataLabels: {
        show: false,
      },
    },
  },

  colors: ["#10b981"],
  stroke: {
    lineCap: "round",
  },
}));

// ApexCharts prend un tableau de pourcentages pour le RadialBar
const chartSeries = computed(() => [usagePercentage.value]);
</script>

<template>
  <UCard
    class="max-w-lg bg-neutral-950"
    :ui="{ body: 'h-full flex flex-col p-4' }"
  >
    <template #default>
      <div class="flex items-center gap-2">
        <UIcon name="material-symbols:storage-rounded" class="size-5" />
        <h1 class="uppercase text-xl font-mono font-bold">Disk space</h1>
      </div>
      <div class="flex items-center gap-6 justify-between">
        <div
          class="relative w-35 h-35 shrink-0 flex items-center justify-center"
        >
          <ClientOnly>
            <apexchart
              width="140"
              height="140"
              type="radialBar"
              :options="chartOptions"
              :series="chartSeries"
            />
          </ClientOnly>

          <div
            class="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span class="font-mono text-xl font-bold text-white">
              {{ usagePercentage }}%
            </span>
          </div>
        </div>

        <div class="flex-1 min-w-0 pl-2">
          <div class="mb-4 flex items-baseline gap-1">
            <span
              class="text-5xl font-mono font-bold text-white tracking-tight"
            >
              {{ props.usedGb }}
            </span>
            <span
              class="text-2xl font-mono font-bold text-white tracking-tight mr-1"
            >
              GB
            </span>
            <span class="text-zinc-500 font-mono text-xs whitespace-nowrap">
              / {{ props.totalGb }} GB
            </span>
          </div>

          <div class="space-y-2">
            <div
              class="flex justify-between font-mono text-[11px] text-zinc-400"
            >
              <span>{{ props.tierName }}</span>
              <span class="text-zinc-500">{{ props.tierType }}</span>
            </div>

            <UProgress
              v-model="usagePercentage"
              :max="100"
              color="secondary"
              size="sm"
            />
          </div>
        </div>
      </div>
    </template>
  </UCard>
</template>
