<script lang="ts" setup>
const servers = ref("");

async function getServers() {
  servers.value = await $fetch("/api/servers/get-server", {
    method: "GET",
    credentials: "include",
  });
}
</script>

<template>
  <UApp>
    <ServerForm />
    <UButton loading-auto label="Get servers" @click="getServers" />
    <pre>{{ servers }}</pre>
  </UApp>
</template>
