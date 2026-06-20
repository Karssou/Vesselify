<script setup lang="ts">
import type { ButtonProps, NavigationMenuItem } from "@nuxt/ui";
import type { FooterColumn } from "@nuxt/ui";

const activeSection = ref("features"); // Section active par défaut

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    activeSection.value = id;
  }
};

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Features",
    click: () => scrollToSection("features"),
    active: activeSection.value === "features",
  },
  {
    label: "Pricing",
    click: () => scrollToSection("price"),
    active: activeSection.value === "price",
  },
  {
    label: "Docs",
    to: "https://go.nuxt.com/figma-ui",
    target: "_blank",
  },
]);

onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: "-30% 0px -60% 0px", // Déclenche quand la section occupe le centre de l'écran
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, observerOptions);

  // On cible les sections à observer
  const sections = document.querySelectorAll("section[id]");
  sections.forEach((section) => observer.observe(section));
});

const plans = ref([
  {
    title: "Solo",
    price: "0€",
    description: "Pour découvrir Vesselify et monitorer vos premiers serveurs.",
    features: [
      "Jusqu'à 3 serveurs",
      "Rétention logs 24h",
      "Alertes Emails basiques",
    ],
    button: {
      label: "Commencer gratuitement",
      variant: "outline",
      color: "neutral",
      to: "/dashboard",
    } as ButtonProps,
  },
  {
    title: "Professional",
    price: "19€",
    description:
      "Pour les développeurs, équipes et infrastructures en production.",
    featured: true,
    features: [
      "Serveurs illimités",
      "Rétention 30 jours",
      "Alertes Discord / Slack / Webhooks",
      "Monitoring Docker avancé",
    ],
    button: {
      label: "Passer à Pro",
      color: "primary",
      class:
        "font-bold hover:brightness-110 transition-all shadow-[0_0_30px_rgba(208,188,255,0.3)]",
      to: "/dashboard",
    } as ButtonProps,
  },
]);

const columns: FooterColumn[] = [
  {
    label: "Product",
    children: [
      {
        label: "Features",
        to: "/#features",
      },
      {
        label: "Pricing",
        to: "/pricing",
      },
      {
        label: "Roadmap",
        to: "/roadmap",
      },
      {
        label: "Status",
        to: "/status",
      },
    ],
  },
  {
    label: "Developers",
    children: [
      {
        label: "Documentation",
        to: "/docs",
      },
      {
        label: "API Reference",
        to: "/docs/api",
      },
      {
        label: "SDK",
        to: "/docs/sdk",
      },
      {
        label: "Changelog",
        to: "/changelog",
      },
    ],
  },
  {
    label: "Company",
    children: [
      {
        label: "About",
        to: "/about",
      },
      {
        label: "Contact",
        to: "/contact",
      },
      {
        label: "Privacy",
        to: "/privacy",
      },
      {
        label: "Terms",
        to: "/terms",
      },
    ],
  },
];

const linksLanding = ref<ButtonProps[]>([
  {
    label: "Start for free",
    trailingIcon: "material-symbols:arrow-right-alt",
    color: "primary",
    class: "px-4 py-2",
  },
  {
    label: "See demo",
    color: "neutral",
    variant: "outline",
    class: "px-6 py-2",
  },
]);

const cards = ref([
  {
    title: "Monitoring Temps Réel",
    description:
      " CPU, RAM et Disque avec une latence ultra-faible. Visualisez l'état de votre infrastructure sans rafraîchir la page. ",
    icon: "material-symbols:analytics-outline-rounded",
  },
  {
    title: "Gestion Docker Native",
    description:
      "Pilotez vos conteneurs (Start, Stop, Logs) directement depuis le web. L'expérience CLI, la puissance du cloud. ",
    icon: "material-symbols:developer-board-outline-rounded",
  },
  {
    title: "Installation One-Line",
    description:
      "Connectez n'importe quel serveur en quelques secondes avec notre agent léger. Compatible toutes distros Linux.",
    icon: "material-symbols:terminal-rounded",
  },
  {
    title: "Alerting intelligent",
    description:
      "Soyez prévenu avant que vos services ne tombent. Slack, Discord, Email et Webhooks intégrés nativement. ",
    icon: "material-symbols:notifications-active-outline-rounded",
  },
]);
</script>

<template>
  <UApp>
    <UHeader>
      <template #title>
        <div class="flex items-center gap-3 mr-0 lg:mr-6 min-w-0">
          <svg
            class="size-10 sm:size-12 shrink-0"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="vesselifyGrad"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style="stop-color: #8b5cf6; stop-opacity: 1"
                />
                <stop
                  offset="100%"
                  style="stop-color: #37cd8f; stop-opacity: 1"
                />
              </linearGradient>
            </defs>

            <path
              d="M55 60 L100 140 L145 60"
              stroke="url(#vesselifyGrad)"
              stroke-width="20"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <circle cx="150" cy="140" r="20" fill="#37CD8F" />

            <path
              d="M55 65 L100 145 L145 65"
              stroke="#000000"
              stroke-width="20"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              opacity="0.25"
            />
          </svg>
          <h1 class="text-lg sm:text-xl font-semibold truncate">Vesselify</h1>
        </div>
        <UNavigationMenu
          class="hidden lg:block"
          :items="items"
          :ui="{
            link: 'relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-transparent data-active:after:bg-primary-500 data-active:before:bg-transparent data-active:text-primary-400 pb-2 transition-all',
          }"
        />
      </template>

      <template #right>
        <div class="hidden sm:flex items-center gap-2 lg:gap-3">
          <UColorModeButton />

          <UTooltip text="Open on GitHub">
            <UButton
              color="neutral"
              variant="ghost"
              class="mr-4"
              to="https://github.com/Karssou/Vesselify"
              target="_blank"
              icon="i-simple-icons-github"
              aria-label="GitHub"
            />
          </UTooltip>
          <UButton label="Login" to="/auth" variant="ghost" color="neutral" />
          <UButton
            label="Get Started"
            to="/auth"
            class="font-bold hover:brightness-110 transition-all shadow-[0_0_30px_rgba(208,188,255,0.3)]"
          />
        </div>
      </template>
    </UHeader>
    <section
      class="hero-section landing-reveal-up flex flex-col items-center justify-center mb-10 relative overflow-hidden pt-6 sm:pt-10 pb-20 sm:pb-32 lg:pb-40 min-h-screen"
    >
      <div class="absolute inset-0 pointer-events-none z-0">
        <div class="absolute inset-0 hero-grid-backdrop"></div>

        <div class="absolute inset-0 hero-radial-backdrop"></div>

        <div
          class="absolute -top-16 left-1/2 -translate-x-1/2 h-72 w-72 sm:h-[32rem] sm:w-[32rem] rounded-full bg-primary/20 blur-[110px] animate-hero-orb"
        ></div>
        <div
          class="absolute top-16 -left-20 h-60 w-60 rounded-full bg-emerald-500/10 blur-[120px] animate-hero-orb"
          style="animation-delay: 1.8s"
        ></div>
        <div
          class="absolute bottom-[-6rem] right-[-4rem] h-72 w-72 rounded-full bg-primary-400/10 blur-[140px] animate-hero-orb"
          style="animation-delay: 3s"
        ></div>

        <div class="absolute inset-0 opacity-[0.22]">
          <div class="hero-star hero-star-a"></div>
          <div class="hero-star hero-star-b"></div>
          <div class="hero-star hero-star-c"></div>
          <div class="hero-star hero-star-d"></div>
          <div class="hero-star hero-star-e"></div>
        </div>

        <div
          class="absolute top-0 left-[12%] w-px h-full bg-linear-to-b from-transparent via-primary-500/40 to-transparent animate-laser-vertical hidden lg:block"
        ></div>
        <div
          class="absolute top-0 left-[50%] w-px h-full bg-linear-to-b from-transparent via-emerald-500/30 to-transparent animate-laser-vertical hidden lg:block"
          style="animation-duration: 6s; animation-delay: 2s"
        ></div>
        <div
          class="absolute top-0 right-[18%] w-px h-full bg-linear-to-b from-transparent via-primary-400/40 to-transparent animate-laser-vertical hidden lg:block"
          style="animation-duration: 7s; animation-delay: 1s"
        ></div>

        <div
          class="absolute top-[26%] left-0 w-full h-px bg-linear-to-r from-transparent via-emerald-500/30 to-transparent animate-laser-horizontal hidden lg:block"
          style="animation-duration: 9s"
        ></div>
        <div
          class="absolute bottom-[34%] left-0 w-full h-px bg-linear-to-r from-transparent via-primary-500/20 to-transparent animate-laser-horizontal hidden lg:block"
          style="animation-duration: 5s; animation-delay: 3s"
        ></div>

        <div
          class="absolute top-24 left-6 hidden xl:block w-72 rounded-2xl hero-panel backdrop-blur-xl p-4 animate-hero-float landing-float-in"
          style="--reveal-delay: 120ms"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <p class="text-xs uppercase tracking-[0.3em] hero-panel-muted">
                Live Cluster
              </p>
            </div>
            <span class="text-xs text-emerald-300">+12% / 24h</span>
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm hero-panel-muted">Latency</span>
              <span class="text-sm font-semibold">18ms</span>
            </div>
            <div class="h-2 rounded-full hero-panel-chip overflow-hidden">
              <div
                class="h-full w-[74%] rounded-full bg-linear-to-r from-primary-500 to-emerald-400 animate-pulse"
              ></div>
            </div>
            <div class="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div class="rounded-lg hero-panel-chip py-2">
                <div class="font-semibold hero-panel-text">42</div>
                <div class="hero-panel-soft">Nodes</div>
              </div>
              <div class="rounded-lg hero-panel-chip py-2">
                <div class="font-semibold hero-panel-text">99.98%</div>
                <div class="hero-panel-soft">Uptime</div>
              </div>
              <div class="rounded-lg hero-panel-chip py-2">
                <div class="font-semibold hero-panel-text">24/7</div>
                <div class="hero-panel-soft">Watch</div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="absolute top-40 right-8 hidden xl:block w-64 rounded-2xl hero-panel hero-panel-strong backdrop-blur-xl p-4 animate-hero-float landing-float-in"
          style="animation-delay: 1.2s; --reveal-delay: 260ms"
        >
          <div class="flex items-center justify-between mb-3">
            <p class="text-xs uppercase tracking-[0.3em] hero-panel-muted">
              Deploy
            </p>
            <span class="text-xs text-primary-300">Rolling</span>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex items-center justify-between">
              <span class="hero-panel-muted">api-prod</span>
              <span class="text-emerald-300">Healthy</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="hero-panel-muted">worker-02</span>
              <span class="text-primary-300">Updating</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="hero-panel-muted">redis-cache</span>
              <span class="text-yellow-300">Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <UPageHero
          class="landing-reveal-up w-full"
          style="--reveal-delay: 120ms"
          description=" Pilotez vos VPS et conteneurs Docker avec une interface conçue pour la performance. Temps réel, zéro configuration, monitoring total. "
          :links="linksLanding"
        >
          <template #title>
            <div
              class="landing-stagger flex flex-wrap justify-center gap-2 mb-4 sm:mb-6"
            >
              <UBadge
                class="rounded-full tracking-normal"
                variant="subtle"
                size="lg"
                icon="material-symbols:verified-outline"
                label="NEW : Docker logs integration"
              />
              <UBadge
                class="rounded-full tracking-normal"
                variant="soft"
                color="success"
                size="lg"
                label="Realtime monitoring"
              />
            </div>

            <h1
              class="hero-text landing-reveal-up mx-auto max-w-5xl text-3xl sm:text-4xl lg:text-7xl xl:text-8xl leading-[0.92] tracking-tight"
              style="--reveal-delay: 140ms"
            >
              Monitoring de serveurs pour les ingénieurs qui exigent la
              <span class="hero-gradient-text">précision absolue</span>.
            </h1>

            <p
              class="hero-text-muted landing-reveal-up mx-auto mt-6 max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed"
              style="--reveal-delay: 220ms"
            >
              Une interface conçue comme un cockpit: réactive, lisible et
              ultra-stable. Vous voyez l'essentiel immédiatement, sans bruit
              visuel ni complexité inutile.
            </p>

            <div
              class="mx-auto mt-8 grid w-full max-w-4xl grid-cols-1 sm:grid-cols-3 gap-3 landing-stagger"
            >
              <div class="hero-stat">
                <span class="hero-stat-label">Temps réel</span>
                <span class="hero-stat-value">0.3s</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-label">Agents légers</span>
                <span class="hero-stat-value">&lt; 15MB</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-label">Alertes</span>
                <span class="hero-stat-value">Instant</span>
              </div>
            </div>
          </template>
        </UPageHero>
        <div
          class="mx-auto mt-8 sm:mt-10 max-w-4xl landing-reveal-up"
          style="--reveal-delay: 320ms"
        >
          <div
            class="hero-command-bar hero-panel hero-panel-strong rounded-2xl backdrop-blur-xl px-4 py-4 sm:px-5 sm:py-5"
          >
            <div
              class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div class="flex items-center gap-3">
                <span
                  class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"
                ></span>
                <div>
                  <p
                    class="text-xs uppercase tracking-[0.35em] hero-panel-muted"
                  >
                    Live shell
                  </p>
                  <p class="text-sm hero-panel-muted">
                    deployment-agent connected to 42 nodes
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-2 text-xs hero-panel-muted">
                <span class="hero-panel-chip rounded-full px-3 py-1"
                  >Docker</span
                >
                <span class="hero-panel-chip rounded-full px-3 py-1">VPS</span>
                <span class="hero-panel-chip rounded-full px-3 py-1">Logs</span>
              </div>
            </div>
            <div
              class="hero-code-block mt-4 rounded-xl px-4 py-4 font-mono text-xs sm:text-sm overflow-hidden"
            >
              <div class="flex items-center gap-2 text-primary-300">
                <span class="hero-panel-soft">$</span>
                <span class="typewriter-line"
                  >curl -sSL https://get.vesselify.com | sh</span
                >
              </div>
              <div class="mt-3 space-y-1 hero-panel-muted">
                <p class="command-line command-line-1">
                  # initializing secure tunnel...
                </p>
                <p class="command-line command-line-2">
                  # measuring CPU, RAM and container health...
                </p>
                <p class="command-line command-line-3 text-emerald-300">
                  # ready. your infrastructure is live.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 landing-reveal-up"
          style="--reveal-delay: 420ms"
        >
          <UAvatarGroup>
            <UAvatar
              src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
            />
            <UAvatar
              src="https://img.magnific.com/free-photo/business-finance-employment-female-successful-entrepreneurs-concept-smiling-professional-female-office-manager-ceo-e-commerce-company-looking-pleased-camera-white-background_1258-59171.jpg?semt=ais_hybrid&w=740&q=80"
            />
            <UAvatar
              src="https://www.shutterstock.com/image-photo/profile-picture-smiling-millennial-asian-260nw-1836020740.jpg"
            />
          </UAvatarGroup>
          <span class="text-muted text-center sm:text-left">
            Utilisé par plus de 2+ ingénieurs DevOps
          </span>
        </div>
      </div>
    </section>
    <section
      id="features"
      class="py-16 sm:py-24 max-w-350 mx-auto px-4 sm:px-6 relative landing-reveal-up"
      style="--reveal-delay: 120ms"
    >
      <div
        class="perspective-[1000px] relative mx-auto py-8 sm:py-14 lg:py-20 landing-reveal-scale"
        style="--reveal-delay: 100ms"
      >
        <div
          class="glow-effect w-full h-full bottom-0 left-0 bg-primary/5 blur-[120px]"
        ></div>
        <div
          class="dashboard-frame hero-panel rounded-xl overflow-hidden min-h-[680px] sm:min-h-[780px] lg:min-h-[900px] landing-float-in"
          style="--reveal-delay: 180ms"
        >
          <div
            class="bg-(--ui-surface) h-12 flex items-center px-4 justify-between border-b border-default"
          >
            <div class="flex gap-1.5">
              <div class="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div class="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div
              class="font-mono text-[10px] sm:text-sm truncate max-w-[65%] text-center"
            >
              vesselify-interactive-demo.sh
            </div>
            <div class="w-12 hidden sm:block"></div>
          </div>
          <div
            class="p-3 sm:p-6 grid grid-cols-12 gap-4 sm:gap-6 bg-(--ui-surface) min-h-[calc(680px-3rem)] sm:min-h-[calc(780px-3rem)] lg:min-h-[calc(900px-3rem)]"
          >
            <!-- Left Sidebar -->
            <aside class="col-span-12 md:col-span-4 space-y-4 sm:space-y-6">
              <div class="space-y-3">
                <p
                  class="font-label-caps text-[10px] text-on-surface-variant/60"
                >
                  ACTIVE CONTAINERS
                </p>
                <div
                  class="demo-card landing-reveal-up p-3 bg-(--ui-surface-elevated) border border-default rounded flex items-center justify-between group cursor-default"
                  style="animation-delay: 0s; --reveal-delay: 60ms"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="w-2 h-2 rounded-full bg-green-400 active-dot"
                    ></span>
                    <span
                      class="font-code-snippet text-code-snippet text-on-surface"
                      >nginx-proxy</span
                    >
                  </div>
                  <span
                    class="text-[10px] text-green-400/80 font-bold px-1.5 py-0.5 bg-green-400/10 rounded"
                    >En ligne</span
                  >
                </div>
                <div
                  class="demo-card landing-reveal-up p-3 bg-(--ui-surface-elevated) border border-default rounded flex items-center justify-between group cursor-default"
                  style="animation-delay: 0.18s; --reveal-delay: 140ms"
                >
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-green-400"></span>
                    <span
                      class="font-code-snippet text-code-snippet text-on-surface"
                      >postgres-db</span
                    >
                  </div>
                  <span
                    class="text-[10px] text-green-400/80 font-bold px-1.5 py-0.5 bg-green-400/10 rounded"
                    >En ligne</span
                  >
                </div>
                <div
                  class="demo-card landing-reveal-up p-3 bg-(--ui-surface-elevated) border border-default rounded flex items-center justify-between group cursor-default"
                  style="animation-delay: 0.36s; --reveal-delay: 220ms"
                >
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span
                      class="font-code-snippet text-code-snippet text-on-surface"
                      >redis-cache</span
                    >
                  </div>
                  <span
                    class="text-[10px] text-yellow-500/80 font-bold px-1.5 py-0.5 bg-yellow-500/10 rounded"
                    >Redémarrage...</span
                  >
                </div>
              </div>
            </aside>
            <!-- Main Stats & Graphs -->
            <main
              class="col-span-12 md:col-span-8 space-y-4 sm:space-y-6 flex flex-col"
            >
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  class="demo-card landing-reveal-up p-4 rounded-lg bg-(--ui-surface-elevated) border border-default"
                  style="animation-delay: 0.08s; --reveal-delay: 80ms"
                >
                  <p class="text-on-surface-variant/60 text-xs mb-1">
                    CPU Usage
                  </p>
                  <div class="flex items-end gap-2">
                    <span class="font-semibold text-2xl">24.2%</span>
                    <div class="flex items-end gap-0.5 h-6 pb-1">
                      <div
                        class="w-1 bg-primary/40 rounded-t-sm animate-oscillate h-[40%]"
                        style="animation-delay: 0s"
                      ></div>
                      <div
                        class="w-1 bg-primary/40 rounded-t-sm animate-oscillate h-[70%]"
                        style="animation-delay: 0.2s"
                      ></div>
                      <div
                        class="w-1 bg-primary/40 rounded-t-sm animate-oscillate h-[50%]"
                        style="animation-delay: 0.4s"
                      ></div>
                    </div>
                  </div>
                </div>
                <div
                  class="demo-card landing-reveal-up p-4 rounded-lg bg-(--ui-surface-elevated) border border-default"
                  style="animation-delay: 0.16s; --reveal-delay: 140ms"
                >
                  <p class="text-on-surface-variant/60 text-xs mb-1">
                    RAM Usage
                  </p>
                  <div class="flex items-end gap-2">
                    <span class="font-semibold text-2xl text-primary-400"
                      >1.4GB</span
                    >
                    <div class="flex items-end gap-0.5 h-6 pb-1">
                      <div
                        class="w-1 bg-primary/40 rounded-t-sm animate-oscillate h-[80%]"
                        style="animation-delay: 0.1s"
                      ></div>
                      <div
                        class="w-1 bg-primary/40 rounded-t-sm animate-oscillate h-[60%]"
                        style="animation-delay: 0.3s"
                      ></div>
                      <div
                        class="w-1 bg-primary/40 rounded-t-sm animate-oscillate h-[90%]"
                        style="animation-delay: 0.5s"
                      ></div>
                    </div>
                  </div>
                </div>
                <div
                  class="demo-card landing-reveal-up p-4 rounded-lg bg-(--ui-surface-elevated) border border-default sm:col-span-2 lg:col-span-1"
                  style="animation-delay: 0.24s; --reveal-delay: 200ms"
                >
                  <p class="text-on-surface-variant/60 text-xs mb-1">Uptime</p>
                  <div class="flex items-center justify-between gap-3">
                    <span class="font-semibold text-2xl">99.98%</span>
                    <div class="flex items-center gap-1">
                      <span
                        class="w-2 h-6 rounded-full bg-primary/30 animate-pulse"
                      ></span>
                      <span
                        class="w-2 h-8 rounded-full bg-primary/50 animate-pulse [animation-delay:150ms]"
                      ></span>
                      <span
                        class="w-2 h-10 rounded-full bg-emerald-400/70 animate-pulse [animation-delay:300ms]"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Mini Logs Flow -->
              <div
                class="demo-card hero-code-block rounded-lg p-3 min-h-44 sm:min-h-52 overflow-hidden relative flex-1 landing-reveal-up"
                style="animation-delay: 0.32s; --reveal-delay: 260ms"
              >
                <div class="absolute top-2 right-3 flex items-center gap-2">
                  <span
                    class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                  ></span>
                  <span
                    class="text-[10px] font-code-snippet hero-panel-soft uppercase tracking-widest"
                    >Live Logs</span
                  >
                </div>
                <div
                  class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"
                ></div>
                <div
                  class="space-y-1 font-mono text-[10px] sm:text-[11px] text-muted log-scroll"
                >
                  <p>
                    <span class="text-primary/60">[14:22:01]</span>
                    <span class="text-green-500/50">INFO</span> nginx: GET
                    /api/v1/health 200 OK
                  </p>
                  <p>
                    <span class="text-primary/60">[14:22:03]</span>
                    <span class="text-green-500/50">INFO</span> postgres:
                    checkpoint starting: periodic
                  </p>
                  <p>
                    <span class="text-primary/60">[14:22:05]</span>
                    <span class="text-yellow-500/50">WARN</span> redis: Memory
                    usage &gt; 80% threshold
                  </p>
                  <p>
                    <span class="text-primary/60">[14:22:08]</span>
                    <span class="text-primary/50">DEBG</span> vessel-agent:
                    Heartbeat sent to cloud
                  </p>
                  <p>
                    <span class="text-primary/60">[14:22:10]</span>
                    <span class="text-green-500/50">INFO</span> nginx: POST
                    /api/v1/metrics 201 Created
                  </p>
                  <p>
                    <span class="text-primary/60">[14:22:12]</span>
                    <span class="text-green-500/50">INFO</span> redis: RDB
                    snapshot finished
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  class="demo-card landing-reveal-up rounded-lg border border-default bg-(--ui-surface-elevated) p-4"
                  style="animation-delay: 0.42s; --reveal-delay: 320ms"
                >
                  <div class="flex items-center justify-between mb-3">
                    <p
                      class="text-xs uppercase tracking-widest hero-panel-soft"
                    >
                      Deploy queue
                    </p>
                    <span class="text-xs text-primary-400">3 active</span>
                  </div>
                  <div class="space-y-3">
                    <div
                      class="h-2 rounded-full hero-panel-chip overflow-hidden"
                    >
                      <div
                        class="h-full w-[78%] rounded-full bg-gradient-to-r from-primary-500 to-emerald-400 animate-pulse"
                      ></div>
                    </div>
                    <div
                      class="h-2 rounded-full hero-panel-chip overflow-hidden"
                    >
                      <div
                        class="h-full w-[52%] rounded-full bg-gradient-to-r from-primary-500/70 to-primary-300 animate-pulse [animation-delay:180ms]"
                      ></div>
                    </div>
                    <div
                      class="h-2 rounded-full hero-panel-chip overflow-hidden"
                    >
                      <div
                        class="h-full w-[91%] rounded-full bg-gradient-to-r from-emerald-500 to-primary-400 animate-pulse [animation-delay:320ms]"
                      ></div>
                    </div>
                  </div>
                </div>
                <div
                  class="demo-card landing-reveal-up rounded-lg border border-default bg-(--ui-surface-elevated) p-4"
                  style="animation-delay: 0.52s; --reveal-delay: 380ms"
                >
                  <div class="flex items-center justify-between mb-3">
                    <p
                      class="text-xs uppercase tracking-widest hero-panel-soft"
                    >
                      Recent events
                    </p>
                    <span class="text-xs text-green-400">Live</span>
                  </div>
                  <div class="space-y-2 text-xs sm:text-sm">
                    <p class="flex items-center justify-between gap-3">
                      <span class="hero-panel-muted"
                        >nginx-proxy restarted</span
                      >
                      <span class="text-green-400">12s ago</span>
                    </p>
                    <p class="flex items-center justify-between gap-3">
                      <span class="hero-panel-muted">CPU alert cleared</span>
                      <span class="text-primary-300">28s ago</span>
                    </p>
                    <p class="flex items-center justify-between gap-3">
                      <span class="hero-panel-muted">New webhook received</span>
                      <span class="text-emerald-300">1m ago</span>
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <div
        class="mb-16 flex flex-col gap-3 landing-reveal-up"
        style="--reveal-delay: 80ms"
      >
        <span
          class="font-mono font-bold text-primary-400 uppercase tracking-widest"
        >
          Advanced Capabilities
        </span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Conçu pour l'excellence opérationnelle.
        </h2>
      </div>

      <UPageGrid
        class="landing-stagger"
        :ui="{ base: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' }"
      >
        <UPageCard
          v-for="(card, index) in cards"
          :key="index"
          v-bind="card"
          class="h-full landing-reveal-scale"
          :style="{ '--reveal-delay': `${index * 110 + 80}ms` }"
        />
      </UPageGrid>
    </section>
    <section
      class="py-16 sm:py-24 px-4 sm:px-6 max-w-350 mx-auto bg-success/2 relative overflow-hidden landing-reveal-up"
      style="--reveal-delay: 120ms"
    >
      <div
        class="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center landing-reveal-scale"
        style="--reveal-delay: 100ms"
      >
        <div class="landing-reveal-up" style="--reveal-delay: 100ms">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Installez l'agent en une commande.
          </h1>
          <p class="text-lg text-on-surface-variant mb-10">
            Pas de fichiers YAML complexes. Pas de configurations fastidieuses.
            Un simple agent binaire écrit en Go pour une performance maximale et
            une empreinte mémoire minimale.
          </p>
          <ul class="space-y-4 mb-10">
            <li class="flex items-center gap-3 text-on-surface">
              <UIcon
                class="text-primary"
                name="material-symbols:check-circle-outline-rounded"
              />
              <span>Empreinte RAM &lt; 15MB</span>
            </li>
            <li class="flex items-center gap-3 text-on-surface">
              <UIcon
                class="text-primary"
                name="material-symbols:check-circle-outline-rounded"
              />
              <span>Support ARM64 &amp; x86_64</span>
            </li>
            <li class="flex items-center gap-3 text-on-surface">
              <UIcon
                class="text-primary"
                name="material-symbols:check-circle-outline-rounded"
              />
              <span>Auto-update sécurisé</span>
            </li>
          </ul>
        </div>
        <div class="hero-code-block rounded-xl p-1 shadow-2xl overflow-x-auto">
          <div
            class="bg-(--ui-surface) rounded-lg p-4 sm:p-6 font-code-snippet text-code-snippet relative group"
          >
            <div
              class="flex items-center justify-between gap-4 mb-4 border-b border-default pb-2"
            >
              <span class="text-on-surface-variant/40 text-sm truncate"
                >vesselify-install.sh</span
              >
              <button
                class="text-primary hover:bg-primary/10 px-2 py-1 rounded transition-all flex items-center gap-2 shrink-0"
              >
                <UIcon
                  name="material-symbols:content-copy-outline"
                  class="text-primary"
                />
                Copy
              </button>
            </div>
            <div class="space-y-2 text-sm sm:text-base">
              <p class="text-primary-container">
                <span class="text-on-surface-variant/40">$</span> curl -sSL
                https://get.vesselify.com | sh
              </p>
              <p class="text-on-surface-variant/60 animate-pulse">
                # Downloading agent binary for linux/amd64...
              </p>
              <p class="text-on-surface-variant/60">
                # Initializing connection to vesselify.cloud...
              </p>
              <p class="text-green-400">
                # Success! Server "prod-vps-01" is now active.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      class="py-16 sm:py-24 max-w-350 mx-auto px-4 sm:px-6 relative landing-reveal-up"
      style="--reveal-delay: 120ms"
    >
      <div
        class="mb-16 flex flex-col gap-3 landing-reveal-up"
        style="--reveal-delay: 100ms"
      >
        <span
          class="font-mono font-bold text-primary-400 uppercase tracking-widest"
        >
          Comparatif
        </span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Pourquoi passer à Vesselify ?
        </h2>
      </div>
      <UContainer
        class="flex flex-col lg:flex-row rounded-xl border border-default overflow-hidden"
        :ui="{
          base: 'p-0 sm:p-0 lg:p-0',
        }"
      >
        <div class="p-6 sm:p-10 bg-(--ui-surface) flex flex-col flex-1">
          <div class="flex items-center gap-3 mb-8">
            <div
              class="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-error"
            >
              <UIcon name="material-symbols:block-outline" class="size-8" />
            </div>
            <h3 class="font-bold text-xl sm:text-2xl">Méthode Classique</h3>
          </div>
          <ul class="space-y-6 grow">
            <li class="flex items-start gap-4">
              <UIcon
                name="material-symbols:sentiment-dissatisfied-outline-rounded"
                class="size-6 mt-1 text-muted"
              />
              <div>
                <p class="font-bold">SSH &amp; Commandes manuelles</p>
                <p class="text-muted text-sm">
                  Passer son temps à se connecter un par un à chaque VPS pour
                  vérifier l'état des logs.
                </p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <UIcon
                name="material-symbols:sentiment-dissatisfied-outline-rounded"
                class="size-6 mt-1 text-muted"
              />
              <div>
                <p class="font-bold">Agents lourds (500MB+)</p>
                <p class="text-sm text-muted">
                  Consomme plus de RAM que vos propres applications.
                  Installation complexe avec Python/Node.
                </p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <UIcon
                name="material-symbols:sentiment-dissatisfied-outline-rounded"
                class="size-6 mt-1 text-muted"
              />

              <div>
                <p class="font-bold text-on-surface-variant">
                  YAML &amp; Config complexe
                </p>
                <p class="text-muted text-sm">
                  3 heures pour configurer une alerte CPU qui finit par vous
                  spammer par email.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div
          class="p-6 sm:p-10 bg-(--ui-surface-elevated) flex flex-col relative overflow-hidden flex-1"
        >
          <div class="absolute top-0 right-0 p-4 opacity-10">
            <svg
              width="120"
              height="120"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M55 60 L100 140 L145 60"
                stroke="url(#vesselifyGrad)"
                stroke-width="20"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <path
                d="M55 65 L100 145 L145 65"
                stroke="#000000"
                stroke-width="20"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                opacity="0.25"
              />
            </svg>
          </div>
          <div class="flex items-center gap-3 mb-8">
            <div
              class="w-10 h-10 rounded-xl bg-primary-400/20 flex items-center justify-center text-primary"
            >
              <UIcon name="material-symbols:verified-outline" class="size-8" />
            </div>
            <h3 class="font-bold text-xl sm:text-2xl text-primary">
              Vesselify
            </h3>
          </div>
          <ul class="space-y-6 grow">
            <li class="flex items-start gap-4">
              <UIcon
                name="material-symbols:sentiment-very-satisfied-outline-rounded"
                class="size-6 mt-1 text-primary"
              />
              <div>
                <p class="font-bold">Accès centralisé</p>
                <p class="text-muted text-sm">
                  Un seul dashboard pour piloter 100+ serveurs. Docker logs en
                  temps réel sans SSH.
                </p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <UIcon
                name="material-symbols:sentiment-very-satisfied-outline-rounded"
                class="size-6 mt-1 text-primary"
              />
              <div>
                <p class="font-bold text-on-surface">
                  Agent Go ultra-léger (&lt; 15MB)
                </p>
                <p class="text-muted text-sm">
                  Zéro dépendance, compilé statiquement. Utilisation CPU
                  invisible (&lt; 0.5%).
                </p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <UIcon
                name="material-symbols:sentiment-very-satisfied-outline-rounded"
                class="size-6 mt-1 text-primary"
              />
              <div>
                <p class="font-bold">Alertes Slack/Discord en 30s</p>
                <p class="text-muted text-sm">
                  Sélectionnez vos seuils, connectez votre webhook et dormez
                  tranquille.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </UContainer>
    </section>
    <section
      class="py-16 sm:py-24 max-w-350 mx-auto px-4 sm:px-6 relative landing-reveal-up"
      style="--reveal-delay: 120ms"
    >
      <div
        class="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center landing-reveal-scale"
        style="--reveal-delay: 100ms"
      >
        <div>
          <div
            class="mb-16 flex flex-col gap-3 landing-reveal-up"
            style="--reveal-delay: 80ms"
          >
            <span
              class="font-mono font-bold text-primary-400 uppercase tracking-widest"
            >
              Sécurité by Design
            </span>
            <h2
              class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            >
              Une architecture robuste et transparente
            </h2>
          </div>
          <p class="text-lg mb-8">
            Nous ne compromettons jamais la sécurité de votre infrastructure.
            L'agent Vesselify est conçu pour être minimaliste et sécurisé.
          </p>
          <div class="space-y-6">
            <div class="flex gap-4">
              <div
                class="w-10 h-10 shrink-0 bg-(--ui-surface-elevated) rounded-lg flex items-center justify-center text-primary border border-default"
              >
                <UIcon name="material-symbols:lock-outline" class="size-6" />
              </div>
              <div>
                <h4 class="font-bold">Connexions Sortantes TLS</h4>
                <p class="text-muted text-sm">
                  L'agent initie uniquement des connexions vers nos serveurs.
                  Pas besoin d'ouvrir de ports inbound sur votre pare-feu.
                </p>
              </div>
            </div>
            <div class="flex gap-4">
              <div
                class="w-10 h-10 shrink-0 bg-(--ui-surface-elevated) rounded-lg flex items-center justify-center text-primary border border-default"
              >
                <UIcon name="material-symbols:code" class="size-6" />
              </div>
              <div>
                <h4 class="font-bold">Zéro Dépendance</h4>
                <p class="text-muted text-sm">
                  Développé en Go, l'agent est un binaire unique. Pas de Python,
                  pas de Node, pas de problèmes de vulnérabilités tierces.
                </p>
              </div>
            </div>
            <div class="flex gap-4">
              <div
                class="w-10 h-10 shrink-0 bg-(--ui-surface-elevated) rounded-lg flex items-center justify-center text-primary border border-default"
              >
                <UIcon
                  name="material-symbols:terminal-rounded"
                  class="size-6"
                />
              </div>
              <div>
                <h4 class="font-bold text-on-surface">Open Source</h4>
                <p class="text-muted text-sm">
                  Le code de l'agent est disponible sur GitHub. Auditez-le,
                  contribuez ou hébergez votre propre build.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="relative landing-float-in" style="--reveal-delay: 180ms">
          <div
            class="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"
          ></div>
          <div
            class="glass-panel p-6 sm:p-8 rounded-2xl relative border-primary/20"
          >
            <div
              class="flex items-center gap-4 mb-6 pb-6 border-b border-default"
            >
              <UIcon
                name="material-symbols:shield-person-outline"
                class="text-primary size-10"
              />
              <h3 class="font-semibold text-2xl">Votre IP reste privée</h3>
            </div>
            <div class="space-y-4 font-mono text-sm text-on-surface-variant/80">
              <p class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> TLS
                1.3 Encryption Active
              </p>
              <p class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> E2EE
                Metrics Streaming
              </p>
              <p class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> No
                Root privileges required
              </p>
              <div class="mt-8 pt-6 border-t border-default">
                <p class="text-primary mb-2">
                  # Install Agent (Ubuntu/Debian/CentOS)
                </p>
                <div class="hero-code-block p-3 rounded text-on-surface">
                  curl -sSL https://get.vesselify.com | sh
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <section
        class="py-16 sm:py-24 bg-success/2 max-w-350 mx-auto px-4 sm:px-6 relative landing-reveal-up"
        id="faq"
        style="--reveal-delay: 120ms"
      >
        <div
          class="max-w-3xl mx-auto px-gutter landing-reveal-up"
          style="--reveal-delay: 90ms"
        >
          <h2 class="font-bold text-3xl sm:text-4xl mb-10 sm:mb-12 text-center">
            Questions fréquentes
          </h2>
          <div class="space-y-4">
            <details class="group glass-panel rounded-xl overflow-hidden" open>
              <summary
                class="flex items-start justify-between gap-4 p-4 sm:p-6 cursor-pointer hover:bg-(--ui-surface-elevated) list-none text-left"
              >
                <h4 class="font-bold pr-4">
                  Quels systèmes d'exploitation sont supportés ?
                </h4>
                <UIcon
                  name="material-symbols:expand-more"
                  class="group-open:rotate-180 transition-transform size-6"
                />
              </summary>
              <div class="px-6 pb-6 text-muted">
                Vesselify supporte la majorité des distributions Linux modernes
                (64-bit et ARM) : Ubuntu 18.04+, Debian 10+, CentOS 7+,
                AlmaLinux, et Alpine Linux.
              </div>
            </details>
            <details class="group glass-panel rounded-xl overflow-hidden">
              <summary
                class="flex items-start justify-between gap-4 p-4 sm:p-6 cursor-pointer hover:bg-(--ui-surface-elevated) list-none text-left"
              >
                <h4 class="font-bold pr-4">
                  Quel est l'impact réel de l'agent sur mes performances ?
                </h4>
                <UIcon
                  name="material-symbols:expand-more"
                  class="group-open:rotate-180 transition-transform size-6"
                />
              </summary>
              <div class="px-6 pb-6 text-muted">
                L'impact est quasi-nul. L'agent consomme généralement moins de
                15MB de RAM et utilise moins de 0.5% d'un cœur CPU lors des
                collectes de métriques.
              </div>
            </details>
            <details class="group glass-panel rounded-xl overflow-hidden">
              <summary
                class="flex items-start justify-between gap-4 p-4 sm:p-6 cursor-pointer hover:bg-(--ui-surface-elevated) list-none text-left"
              >
                <h4 class="font-bold pr-4">
                  Mes logs sont-ils stockés en clair sur vos serveurs ?
                </h4>
                <UIcon
                  name="material-symbols:expand-more"
                  class="group-open:rotate-180 transition-transform size-6"
                />
              </summary>
              <div class="px-6 pb-6 text-muted">
                Les logs sont chiffrés au repos et en transit. Nous ne
                conservons que la durée de rétention définie dans votre plan.
                Vous pouvez également configurer l'agent pour masquer certaines
                informations sensibles via regex.
              </div>
            </details>
            <details class="group glass-panel rounded-xl overflow-hidden">
              <summary
                class="flex items-start justify-between gap-4 p-4 sm:p-6 cursor-pointer hover:bg-(--ui-surface-elevated) list-none text-left"
              >
                <h4 class="font-bold pr-4">
                  Puis-je utiliser Vesselify sans Docker ?
                </h4>
                <UIcon
                  name="material-symbols:expand-more"
                  class="group-open:rotate-180 transition-transform size-6"
                />
              </summary>
              <div class="px-6 pb-6 text-muted">
                Absolument. Vesselify fournit un monitoring système complet
                (CPU, RAM, Disque, Réseau) même si Docker n'est pas installé sur
                votre serveur.
              </div>
            </details>
          </div>
        </div>
      </section>
    </section>

    <section
      id="price"
      class="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 landing-reveal-up"
      style="--reveal-delay: 120ms"
    >
      <div
        class="mb-20 text-center landing-reveal-up"
        style="--reveal-delay: 100ms"
      >
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">
          Des plans simples et transparents
        </h2>

        <p class="text-lg sm:text-xl text-muted">
          Commencez gratuitement, évoluez quand votre infrastructure grandit.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto landing-stagger">
        <UCard
          v-for="(plan, index) in plans"
          :key="plan.title"
          class="h-full flex flex-col landing-reveal-scale"
          :style="{ '--reveal-delay': `${index * 120 + 120}ms` }"
          :class="[
            'relative overflow-hidden transition-all duration-300 hover:-translate-y-1',
            plan.featured
              ? 'border border-primary/50 shadow-[0_0_50px_rgba(var(--ui-primary-rgb),0.15)] md:scale-105 z-10'
              : 'scale-100 opacity-90',
          ]"
          :ui="{
            body: 'h-full flex flex-col',
          }"
        >
          <template v-if="plan.featured">
            <UBadge
              label="Most Popular"
              color="primary"
              variant="subtle"
              class="absolute top-5 right-5"
            />
          </template>

          <div class="flex flex-col flex-1">
            <div>
              <h3 class="text-xl sm:text-2xl font-bold font-mono">
                {{ plan.title }}
              </h3>

              <p class="text-muted mt-2">
                {{ plan.description }}
              </p>
            </div>

            <div class="mt-6">
              <span class="text-4xl sm:text-5xl font-bold font-mono">
                {{ plan.price }}
              </span>
              <span class="text-muted ml-2">/ mois</span>
            </div>

            <div class="mt-8 flex-1">
              <ul class="space-y-4">
                <li
                  v-for="feature in plan.features"
                  :key="feature"
                  class="flex items-center gap-3"
                >
                  <UIcon
                    name="i-lucide-check"
                    class="text-success size-5 shrink-0"
                  />
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <div class="mt-8">
              <UButton
                block
                size="xl"
                :label="plan.button.label"
                :color="plan.button.color"
                :variant="plan.button.variant"
                :to="plan.button.to"
              />
            </div>
          </div>
        </UCard>
      </div>
    </section>

    <UFooter
      class="border-t border-default bg-(--ui-bg)/80 backdrop-blur-xl landing-reveal-up"
      style="--reveal-delay: 120ms"
    >
      <template #left>
        <div class="flex flex-col gap-2 max-w-sm">
          <div class="flex items-center gap-3">
            <div
              class="size-8 rounded-lg bg-primary/10 flex items-center justify-center"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="vesselifyGrad"
                    x1="100%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style="stop-color: #8b5cf6; stop-opacity: 1"
                    />
                    <stop
                      offset="100%"
                      style="stop-color: #37cd8f; stop-opacity: 1"
                    />
                  </linearGradient>
                </defs>

                <path
                  d="M55 60 L100 140 L145 60"
                  stroke="url(#vesselifyGrad)"
                  stroke-width="20"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <path
                  d="M55 65 L100 145 L145 65"
                  stroke="#000000"
                  stroke-width="20"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  opacity="0.25"
                />
              </svg>
            </div>

            <span class="font-mono text-lg font-semibold"> Vesselify </span>
          </div>

          <p class="text-sm text-muted">
            Modern infrastructure monitoring, deployment and server management
            platform.
          </p>

          <p class="text-xs text-muted">
            © {{ new Date().getFullYear() }} Vesselify. All rights reserved.
          </p>
        </div>
      </template>
      <UFooterColumns
        :columns="columns"
        :ui="{
          root: '!grid-cols-none flex flex-col md:flex-row',
          center:
            '!grid !grid-cols-none !auto-cols-auto flex flex-col sm:flex-row justify-around w-full gap-8',
        }"
      />

      <template #right>
        <div class="flex flex-col items-start md:items-end gap-4">
          <div class="flex items-center gap-1 flex-wrap">
            <UButton
              icon="i-simple-icons-github"
              color="neutral"
              variant="ghost"
              to="https://github.com/Karssou"
              target="_blank"
            />

            <UButton
              icon="i-simple-icons-linkedin"
              color="neutral"
              variant="ghost"
              to="www.linkedin.com/in/alexandre-larue44"
            />
          </div>
        </div>
      </template>
    </UFooter>
  </UApp>
</template>

<style scoped>
@keyframes laserVertical {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes laserHorizontal {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-laser-vertical {
  animation: laserVertical 8s linear infinite;
}

.animate-laser-horizontal {
  animation: laserHorizontal 10s linear infinite;
}

@keyframes demoFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

@keyframes demoSweep {
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(120%);
  }
}

.demo-card {
  position: relative;
  overflow: hidden;
  animation: demoFloat 7s ease-in-out infinite;
  will-change: transform;
}

.demo-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 20%,
    rgba(255, 255, 255, 0.07) 50%,
    transparent 80%
  );
  animation: demoSweep 5.5s ease-in-out infinite;
  pointer-events: none;
}

.demo-card:hover {
  transform: translateY(-2px) scale(1.01);
}

@keyframes heroOrb {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translate3d(0, -14px, 0) scale(1.05);
    opacity: 1;
  }
}

@keyframes heroFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(0.35deg);
  }
}

@keyframes typewriter {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

@keyframes softPulse {
  0%,
  100% {
    opacity: 0.65;
    filter: blur(0px);
  }
  50% {
    opacity: 1;
    filter: blur(0.5px);
  }
}

.animate-hero-orb {
  animation: heroOrb 12s ease-in-out infinite;
}

.animate-hero-float {
  animation: heroFloat 8s ease-in-out infinite;
}

.hero-stat {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 1rem;
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  animation: heroFloat 9s ease-in-out infinite;
}

.hero-stat:nth-child(2) {
  animation-delay: 0.9s;
}

.hero-stat:nth-child(3) {
  animation-delay: 1.8s;
}

.hero-stat::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 18%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 82%
  );
  animation: demoSweep 6s ease-in-out infinite;
  pointer-events: none;
}

.hero-stat-label {
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

.hero-stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
}

.hero-command-bar {
  animation: heroFloat 10s ease-in-out infinite;
}

.typewriter-line {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 1px solid rgba(139, 92, 246, 0.8);
  animation:
    typewriter 4.5s steps(40, end) infinite alternate,
    softPulse 3s ease-in-out infinite;
}

.command-line {
  opacity: 0.8;
  transform: translateY(0);
  animation: heroFloat 7s ease-in-out infinite;
}

.command-line-2 {
  animation-delay: 0.4s;
}

.command-line-3 {
  animation-delay: 0.8s;
}

.hero-star {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow:
    0 0 8px rgba(255, 255, 255, 0.6),
    0 0 18px rgba(139, 92, 246, 0.35);
  animation: softPulse 4s ease-in-out infinite;
}

.hero-star-a {
  top: 16%;
  left: 12%;
}

.hero-star-b {
  top: 22%;
  right: 18%;
  animation-delay: 1s;
}

.hero-star-c {
  top: 46%;
  left: 22%;
  animation-delay: 2s;
}

.hero-star-d {
  top: 55%;
  right: 28%;
  animation-delay: 3s;
}

.hero-star-e {
  bottom: 20%;
  left: 50%;
  animation-delay: 1.5s;
}
</style>
