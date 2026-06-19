<script lang="ts" setup>
import { computed, ref } from "vue";

const chartRef = ref();

function getRandomInt(min: number, max: number) {
  if (typeof window === "undefined" || !window.crypto) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const range = max - min;
  const randomBuffer = new Uint32Array(1);

  window.crypto.getRandomValues(randomBuffer);

  return min + (randomBuffer[0]! % range);
}

function generateInitialData(pointsCount = 15) {
  const now = Date.now();

  return Array.from({ length: pointsCount }, (_, index) => ({
    x: now - (pointsCount - index) * 5000,
    y: getRandomInt(10, 50),
  }));
}

const series = ref([
  {
    name: "CPU Load",
    data: generateInitialData(),
  },
]);

const currentCpuValue = computed(() => {
  const data = series.value[0]!.data;
  return data[data.length - 1]?.y ?? 0;
});

const chartOptions = {
  chart: {
    id: "cpu-chart",
    type: "area",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: false,
    },
    parentHeightOffset: 0,
  },

  dataLabels: {
    enabled: false,
  },

  stroke: {
    curve: "smooth",
    width: 2,
  },

  colors: ["var(--color-primary-500)"],

  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.2,
      opacityTo: 0,
      stops: [0, 90, 100],
    },
  },
  markers: {
    size: 0,
    hover: { size: 4 },
  },

  xaxis: {
    type: "datetime",

    tickAmount: 24,

    labels: {
      datetimeUTC: false,

      datetimeFormatter: {
        year: "HH:mm",
        month: "HH:mm",
        day: "HH:mm",
        hour: "HH:mm",
        minute: "HH:mm",
      },

      style: {
        colors: "#a1a1aa",
        fontSize: "10px",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      },
    },

    axisBorder: {
      show: false,
    },

    axisTicks: {
      show: false,
    },
  },

  yaxis: {
    min: 0,
    max: 100,
    tickAmount: 12,

    labels: {
      show: false,
    },

    axisBorder: {
      show: false,
    },

    axisTicks: {
      show: false,
    },
  },

  grid: {
    show: true,
    borderColor: "rgba(255, 255, 255, 0.03)",
    strokeDashArray: 0,
    position: "back",
    xaxis: {
      lines: { show: true },
    },
    yaxis: {
      lines: { show: true },
    },
    padding: {
      top: -25,
      right: 0, // Décale la grille et la courbe pour manger la marge de droite
      bottom: 0,
      left: -10, // Décale la grille et la courbe pour manger la marge de gauche
    },
  },

  tooltip: {
    theme: "dark",

    x: {
      format: "HH:mm:ss",
    },

    y: {
      formatter: (value: number) => `${value}%`,
    },
  },

  legend: {
    show: false,
  },
};
</script>

<template>
  <UCard
    class="h-100 min-w-lg bg-neutral-950"
    :ui="{ body: 'h-full flex flex-col p-4' }"
  >
    <template #default>
      <div class="flex justify-between items-start mb-3">
        <div class="flex flex-col">
          <h1
            class="text-xl font-bold font-mono text-primary-400 uppercase flex items-center gap-2"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-primary-400" />
            CPU Load
          </h1>

          <p class="text-sm text-on-surface-variant">
            Percent usage across all logical cores
          </p>
        </div>

        <div class="text-right">
          <span class="font-mono text-3xl text-primary-400">
            {{ currentCpuValue }}%
          </span>
        </div>
      </div>

      <div class="flex-1 min-h-15">
        <ClientOnly>
          <apexchart
            class="border rounded-md border-neutral-700"
            ref="chartRef"
            width="100%"
            height="100%"
            type="area"
            :options="chartOptions"
            :series="series"
          />
        </ClientOnly>
      </div>
    </template>
  </UCard>
</template>
