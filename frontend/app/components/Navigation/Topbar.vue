<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const isServerView = ref(true);

const breadcrumbItems = ref<BreadcrumbItem[]>([
  {
    label: "Infrastructure",
    to: "/dashboard",
  },
  {
    label: "Server-VPS-1",
    icon: "material-symbols:dns-outline",
  },
]);
</script>

<template>
  <UDashboardNavbar class="bg-neutral-950">
    <template #leading>
      <div class="flex items-center gap-4 flex-1 min-w-0">
        <Transition name="pop">
          <UBreadcrumb
            v-if="isServerView"
            :items="breadcrumbItems"
            class="shrink-0"
          />
        </Transition>

        <div
          class="search-wrapper"
          :class="{
            'search-wrapper-server': isServerView,
            'search-wrapper-global': !isServerView,
          }"
        >
          <UDashboardSearchButton
            variant="soft"
            label="Search..."
            class="w-full"
          />
        </div>
      </div>
    </template>

    <template #right>
      <div class="relative flex items-center">
        <Transition name="pop" mode="out-in">
          <div
            v-if="isServerView"
            key="server-view"
            class="flex items-center gap-3"
          >
            <USeparator orientation="vertical" class="h-6" />

            <UBadge
              variant="subtle"
              color="neutral"
              class="rounded-full inline-flex items-center gap-2 px-3 py-1.5 uppercase"
            >
              <div class="h-2 w-2 rounded-full bg-success" />
              Healthy
            </UBadge>

            <UButton label="Redeploy" />
          </div>

          <div v-else key="global-view" class="flex items-center gap-3">
            <UButton
              icon="material-symbols:info-outline-rounded"
              variant="ghost"
              color="neutral"
            />

            <USeparator orientation="vertical" class="h-6" />

            <UButton label="Deploy" />

            <UAvatar
              src="https://avatars.githubusercontent.com/u/68859290?v=4"
            />
          </div>
        </Transition>
      </div>
    </template>
  </UDashboardNavbar>

  <div class="absolute bottom-4 right-4 z-50">
    <UButton size="sm" color="neutral" @click="isServerView = !isServerView">
      Toggle View Mode
    </UButton>
  </div>
</template>

<style scoped>
.search-wrapper {
  transition:
    width 300ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.search-wrapper-server {
  width: 240px;
}

.search-wrapper-global {
  width: 500px;
}

.pop-enter-active,
.pop-leave-active {
  transition:
    opacity 220ms ease,
    transform 220ms ease,
    filter 220ms ease;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.97);
  filter: blur(4px);
}

.pop-enter-to,
.pop-leave-from {
  opacity: 1;
  transform: scale(1);
  filter: blur(0);
}
</style>
