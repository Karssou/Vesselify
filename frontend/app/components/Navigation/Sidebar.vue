<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const selectItems = ref(["Global Fleet", "Staging Fleet", "NohamDrive Fleet"]);
const value = ref("Global Fleet");

const items: NavigationMenuItem[][] = [
  [
    {
      label: "Dashboard",
      icon: "material-symbols:tile-small-outline-rounded",
      active: true,
    },
    {
      label: "Servers",
      icon: "i-lucide-inbox",
    },
    {
      label: "Alerts",
      icon: "material-symbols:notifications-outline-rounded",
      chip: true,
    },
    {
      label: "Settings",
      icon: "material-symbols:settings-outline-rounded",
    },
  ],
  [
    {
      label: "Feedback",
      icon: "i-lucide-message-circle",
      to: "https://github.com/nuxt-ui-templates/dashboard",
      target: "_blank",
    },
    {
      label: "Help & Support",
      icon: "i-lucide-info",
      to: "https://github.com/nuxt/ui",
      target: "_blank",
    },
  ],
];
</script>

<template>
  <UDashboardSidebar
    collapsible
    resizable
    :min-size="10"
    :default-size="10"
    :max-size="12"
    :ui="{
      footer: 'pt-3 border-t border-default bg-(--ui-surface)',
      header: 'bg-(--ui-surface)',
      body: 'bg-(--ui-surface)',
    }"
  >
    <template #header="{ collapsed }">
      <div
        v-if="!collapsed"
        class="inline-flex items-center mr-auto select-none"
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
              <stop offset="0%" style="stop-color: #8b5cf6; stop-opacity: 1" />
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

        <h1 class="text-xl font-bold font-mono text-primary mr-auto">
          Vesselify
        </h1>
      </div>
      <UColorModeButton v-if="!collapsed" />
      <UDashboardSidebarCollapse />
    </template>

    <template #default="{ collapsed }">
      <USelectMenu
        v-if="!collapsed"
        v-model="value"
        :items="selectItems"
        :search-input="false"
        class="w-full"
        :ui="{
          base: 'bg-white/5 border border-white/5 hover:bg-white/10 p-2.5 h-auto flex items-center gap-3 rounded-lg transition-colors',
        }"
      >
        <template #default>
          <div
            class="w-8 h-8 rounded bg-white/5 flex items-center justify-center shrink-0"
          >
            <UIcon name="material-symbols:dns" class="text-primary size-5" />
          </div>
          <div class="text-left">
            <p
              class="text-[10px] font-mono text-neutral-400 font-bold tracking-wider uppercase leading-none"
            >
              INFRASTRUCTURE
            </p>
            <p class="text-[13px] font-medium mt-1 leading-none">
              {{ value }}
            </p>
          </div>
        </template>
      </USelectMenu>
      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[0]"
        orientation="vertical"
        color="neutral"
        :ui="{
          link: 'py-2.5 text-md rounded transition-all hover:text-highlighted',
          linkLabel: 'ml-1',
          linkLeadingIcon: collapsed ? '' : 'size-6 mr-2',
        }"
      >
      </UNavigationMenu>
    </template>
    <template #footer="{ collapsed }">
      <div class="w-full flex flex-col gap-4">
        <UButton
          size="lg"
          block
          class="bg-primary font-bold py-2.5 shadow-[0px_0px_20px_10px] shadow-primary/10 hover:opacity-90"
        >
          <template #leading>
            <UIcon name="material-symbols:add" class="size-5 font-bold" />
          </template>
          <span v-if="!collapsed" class="text-sm">New Instance</span>
        </UButton>

        <UNavigationMenu
          :collapsed="collapsed"
          :items="items[1]"
          orientation="vertical"
          :ui="{
            link: 'py-2 text-sm text-neutral-400 hover:text-white',
          }"
        />
      </div>
    </template>
  </UDashboardSidebar>
</template>
