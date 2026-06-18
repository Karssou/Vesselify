<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// 1. Props pour passer les métriques reçues par ton WebSocket
const props = withDefaults(
  defineProps<{
    cpuValue: number; // Le pourcentage de CPU actuel (ex: 12.4)
    maxHistoryPoints?: number; // Nombre de points affichés sur le graph
  }>(),
  {
    maxHistoryPoints: 20, // Garde les 20 derniers relevés à l'écran
  },
);

// 2. Historique des points pour dessiner le graphique (valeurs entre 0 et 100)
const history = ref<number[]>([]);

// Remplit le graphique initialement avec la valeur actuelle ou des 0
onMounted(() => {
  history.value = Array(props.maxHistoryPoints).fill(props.cpuValue);
});

// À chaque fois que la prop `cpuValue` change via ton WS, on met à jour l'historique
watch(
  () => props.cpuValue,
  (newVal) => {
    history.value.push(newVal);
    if (history.value.length > props.maxHistoryPoints) {
      history.value.shift(); // Enlève le plus vieux point pour faire défiler
    }
  },
);

// 3. CALCUL MAGIQUE DU CHEMIN SVG (Path)
// Largeur SVG fixe = 100, Hauteur SVG fixe = 40 (calqué sur ton viewBox="0 0 100 40")
const svgPaths = computed(() => {
  const points = history.value;
  const totalPoints = points.length;
  if (totalPoints === 0) return { line: "", area: "", lastY: 20 };

  const width = 100;
  const height = 40;
  const stepX = width / (props.maxHistoryPoints - 1);

  // Construction de la suite de coordonnées X, Y
  const coords = points.map((val, index) => {
    const x = index * stepX;
    // On inverse le Y car en SVG, le 0 est en haut et le 100% est en bas
    // On garde une marge pour pas que les courbes lèchent les bords du cadre
    const y = height - (val / 100) * (height - 8) - 4;
    return { x, y };
  });

  // Génération de la ligne brisée (ou lissée)
  let linePath = `M ${coords[0].x},${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    linePath += ` L ${coords[i].x},${coords[i].y}`;
  }

  // Génération de la zone de remplissage du dégradé (fermeture en bas du SVG)
  const areaPath = `${linePath} L 100,40 L 0,40 Z`;

  // Position Y du dernier point à droite (pour la puce lumineuse)
  const lastY = coords[coords.length - 1].y;

  return {
    line: linePath,
    area: areaPath,
    lastY,
  };
});
</script>

<template>
  <div
    class="bg-surface-card border border-border-subtle rounded-xl p-6 flex flex-col relative overflow-hidden group hover:border-primary/20 transition-all"
  >
    <div class="flex justify-between items-start mb-6">
      <div class="flex flex-col gap-1">
        <h3
          class="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-widest flex items-center gap-2"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
          CPU Load
        </h3>
        <p class="text-[11px] text-on-surface-variant">
          Percent usage across all logical cores
        </p>
      </div>
      <div class="text-right">
        <span class="font-code-md text-2xl text-primary" id="cpu-stat">
          {{ props.cpuValue.toFixed(1) }}%
        </span>
      </div>
    </div>

    <div
      class="flex-1 min-h-[80px] chart-grid rounded-lg border border-border-subtle/30 relative overflow-hidden"
    >
      <div class="absolute inset-0 pointer-events-none opacity-50">
        <svg
          class="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 40"
        >
          <path
            :d="svgPaths.area"
            fill="url(#cpuGrad)"
            class="transition-all duration-300 ease-out"
          />
          <path
            :d="svgPaths.line"
            fill="none"
            stroke="var(--primary)"
            stroke-width="1.5"
            class="transition-all duration-300 ease-out"
          />

          <defs>
            <linearGradient id="cpuGrad" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop
                offset="0%"
                style="stop-color: var(--primary); stop-opacity: 0.4"
              ></stop>
              <stop
                offset="100%"
                style="stop-color: var(--primary); stop-opacity: 0"
              ></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div
        class="absolute right-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_var(--primary)] transition-all duration-300 ease-out"
        :style="{
          top: `${(svgPaths.lastY / 40) * 100}%`,
          transform: 'translate(25%, -50%)',
        }"
      ></div>
    </div>
  </div>
</template>
