<script lang="ts" setup></script>

<template>
  <UCard
    class="w-md h-full bg-neutral-950"
    :ui="{
      body: 'p-0 sm:p-0 h-full flex flex-col',
      header: 'p-0 sm:p-0',
      footer: 'p-0 sm:p-0',
    }"
  >
    <div class="flex items-center gap-1 px-5 pt-4 pb-4">
      <UIcon
        name="material-symbols:memory-outline-rounded"
        class="size-6 text-primary"
      />

      <div class="flex flex-col leading-tight">
        <h1 class="font-mono text-xl uppercase tracking-wide">
          System Information
        </h1>
      </div>

      <UButton
        icon="material-symbols:info-outline-rounded"
        variant="ghost"
        color="neutral"
        class="ml-auto"
      />
    </div>

    <!-- BODY -->
    <div class="px-5 py-6 flex flex-col justify-around grow">
      <section class="space-y-1">
        <p class="text-xs uppercase tracking-wider text-muted">Processor</p>
        <p class="text-base font-mono">AMD EPYC 7763 (64-Core)</p>
      </section>

      <section class="space-y-1">
        <p class="text-xs uppercase tracking-wider text-muted">Memory Type</p>
        <p class="text-base font-mono">32GB DDR4</p>
      </section>

      <section class="space-y-1">
        <p class="text-xs uppercase tracking-wider text-muted">OS Runtime</p>
        <p class="text-base font-mono">Ubuntu 26.06 LTS</p>
      </section>
    </div>

    <USeparator class="w-[95%] ml-auto mr-auto" />

    <!-- FOOTER -->
    <div class="flex items-center gap-2 px-5 py-4">
      <UIcon name="material-symbols:history" class="size-4 text-muted" />

      <span class="text-sm text-muted">
        Uptime : <span class="font-medium text-default">24h 50m</span>
      </span>

      <UBadge
        label="stable"
        variant="soft"
        color="success"
        class="ml-auto uppercase rounded-full px-3"
      />
    </div>
  </UCard>
</template>
