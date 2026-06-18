<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    value: number;
    label: string;
    colorClass?: string; // Ex: 'text-blue-500'
  }>(),
  {
    colorClass: "text-blue-500",
  },
);

const cleanValue = computed(() => Math.max(0, Math.min(100, props.value)));

// 1. La jauge de fond (blanche/grise) prend tout le cercle (100)
const backgroundDashArray = `100 0`;

// 2. La jauge de valeur (bleue)
// On lui enlève 3 unités (le padding) pour créer le gap avec le fond
const valueDashArray = computed(() => {
  const filled = Math.max(0, cleanValue.value - 3);
  const empty = 100 - filled;
  return `${filled} ${empty}`;
});

// 3. On décale légèrement la jauge bleue pour centrer le padding entre les deux blocs ronds
const valueDashOffset = computed(() => {
  return 25 - 1.5; // 25 est le "12h" de base, on décale de la moitié du gap (1.5)
});
</script>

<template>
  <div class="relative w-36 h-36 flex items-center justify-center">
    <svg class="w-full h-full -rotate-90" viewBox="0 0 42 42">
      <circle
        cx="21"
        cy="21"
        r="15.915"
        fill="transparent"
        stroke="currentColor"
        class="text-gray-100 dark:text-gray-800"
        stroke-width="4"
        :stroke-dasharray="backgroundDashArray"
        stroke-linecap="round"
      />

      <circle
        cx="21"
        cy="21"
        r="15.915"
        fill="transparent"
        stroke="currentColor"
        :class="[
          props.colorClass,
          'transition-[stroke-dasharray] duration-500 ease-out',
        ]"
        stroke-width="4"
        :stroke-dasharray="valueDashArray"
        :stroke-dashoffset="valueDashOffset"
        stroke-linecap="round"
      />
    </svg>

    <div
      class="absolute flex flex-col items-center justify-center text-center font-sans"
    >
      <span class="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {{ cleanValue }}%
      </span>
      <span
        class="text-xs uppercase tracking-wider text-gray-400 font-semibold"
      >
        {{ props.label }}
      </span>
    </div>
  </div>
</template>
