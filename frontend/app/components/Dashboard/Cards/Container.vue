<script lang="ts" setup>
import type { separator } from "#build/ui";

type ContainerService = {
  name: string;
  image: string;
  status: "running" | "exited" | "failed";
  cpu: string;
  ram: number;
};

const statusConfig: Record<
  ContainerService["status"],
  { color: "neutral" | "success" | "error"; dotClass: string }
> = {
  running: { color: "success", dotClass: "bg-success" },
  exited: { color: "neutral", dotClass: "bg-neutral-400" },
  failed: { color: "error", dotClass: "bg-error" },
};

const tableData = ref<ContainerService[]>([
  {
    name: "vesselify-backend",
    image: "vesselify-backend:latest",
    status: "running",
    cpu: "1.8%",
    ram: 142,
  },
  {
    name: "vesselify-frontend",
    image: "vesselify-frontend:latest",
    status: "running",
    cpu: "0.4%",
    ram: 88,
  },
  {
    name: "vesselify-db",
    image: "postgres:16-alpine",
    status: "running",
    cpu: "0.2%",
    ram: 64,
  },
  {
    name: "old-auth-service",
    image: "node:18-alpine",
    status: "exited",
    cpu: "0.0%",
    ram: 0,
  },
  {
    name: "broken-cron-task",
    image: "python:3.11-slim",
    status: "failed",
    cpu: "0.0%",
    ram: 0,
  },
]);

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    // Largeur fixe pour cette colonne
    size: 220,
  },
  {
    accessorKey: "image",
    header: "Image",
    size: 220,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 130,
  },
  {
    accessorKey: "cpu",
    header: "CPU",
    size: 80,

    meta: {
      class: {
        th: "text-center",
        td: "text-center",
      },
    },
  },
  {
    accessorKey: "ram",
    header: "RAM",
    size: 90,
    meta: {
      class: {
        th: "text-center",
        td: "text-center",
      },
    },
  },
  {
    id: "actions",
    header: "",
    size: 110,
    meta: {
      class: {
        th: "text-right",
        td: "text-right",
      },
    },
  },
];

const handleAction = (
  action: "pause" | "stop" | "refresh",
  containerName: string,
) => {
  console.log(`Action ${action} sur le conteneur : ${containerName}`);
};
</script>

<template>
  <UCard
    :ui="{
      header: 'p-0 sm:px-0',
      body: 'p-0 sm:p-0',
    }"
    class="bg-(--ui-surface) h-fit w-400 shadow-md"
  >
    <template #header>
      <div
        class="w-full h-16 bg-elevated inline-flex gap-3 items-center px-4 sm:px-6"
      >
        <UIcon
          name="material-symbols:stacks-outline-rounded"
          class="size-7 text-primary"
        />
        <h1 class="font-semibold">Containers</h1>
        <UBadge
          label="6 running"
          class="uppercase rounded-sm px-3 py-1 mr-auto text-xs font-semibold"
          variant="soft"
        />
        <UButton
          label="Prune"
          variant="outline"
          icon="material-symbols:cleaning-services-outline-rounded"
          class="rounded-sm"
        />
        <UButton
          label="Create"
          icon="material-symbols:add"
          class="rounded-sm font-bold shadow-[0px_0px_20px_10px] shadow-primary/10 hover:opacity-90"
        />
      </div>
    </template>

    <template #default>
      <UTable
        :data="tableData"
        :columns="columns"
        sticky
        :ui="{
          thead: 'uppercase text-xs',
          tr: 'hover:bg-primary/5 transition-colors group',
          th: 'px-4 py-3 text-xs font-semibold text-muted tracking-wider',
          td: 'px-4 py-3.5 text-sm whitespace-nowrap',
          separator: 'bg-neutral-500',
        }"
      >
        <!-- Colonne Name : nom en gras + image en sous-titre -->
        <template #name-cell="{ row }">
          <div class="flex flex-col gap-0.5">
            <span class="font-semibold text-highlighted text-sm leading-tight">
              {{ row.getValue("name") }}
            </span>

            <span class="font-mono text-[10px] text-muted leading-tight">
              container
            </span>
          </div>
        </template>

        <!-- Colonne Image -->
        <template #image-cell="{ row }">
          <UBadge color="neutral" variant="subtle" class="font-mono text-xs">
            {{ row.getValue("image") }}
          </UBadge>
        </template>

        <!-- Colonne Status -->
        <template #status-cell="{ row }">
          <UBadge
            class="rounded-full gap-1.5"
            variant="subtle"
            :color="
              statusConfig[row.getValue('status') as ContainerService['status']]
                .color
            "
          >
            <span
              class="size-1.5 rounded-full shrink-0"
              :class="
                statusConfig[
                  row.getValue('status') as ContainerService['status']
                ].dotClass
              "
            />
            {{ row.getValue("status") }}
          </UBadge>
        </template>

        <!-- Colonne CPU -->
        <template #cpu-cell="{ row }">
          <span class="font-mono text-sm tabular-nums">
            {{ row.getValue("cpu") }}
          </span>
        </template>

        <!-- Colonne RAM -->
        <template #ram-cell="{ row }">
          <span class="font-mono text-sm tabular-nums">
            {{ row.getValue("ram") }} MB
          </span>
        </template>

        <!-- Colonne Actions -->
        <template #actions-cell="{ row }">
          <div
            class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <UTooltip text="Refresh" :delay-duration="10">
              <UButton
                icon="material-symbols:sync-rounded"
                variant="ghost"
                color="neutral"
                size="xs"
                @click="handleAction('refresh', row.getValue('name'))"
              />
            </UTooltip>
            <UTooltip text="Pause" :delay-duration="10">
              <UButton
                icon="material-symbols:pause-rounded"
                variant="ghost"
                color="neutral"
                size="xs"
                @click="handleAction('pause', row.getValue('name'))"
              />
            </UTooltip>
            <UTooltip text="Stop" :delay-duration="10">
              <UButton
                icon="material-symbols:crop-square-outline"
                variant="ghost"
                color="error"
                size="xs"
                @click="handleAction('stop', row.getValue('name'))"
              />
            </UTooltip>
          </div>
        </template>
      </UTable>
    </template>
  </UCard>
</template>
