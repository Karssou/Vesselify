<template>
  <UApp>
    <UDashboardGroup>
      <NavigationSidebar />

      <UDashboardSearch />

      <UDashboardPanel id="main">
        <template #header>
          <NavigationTopbar />
        </template>

        <template #body>
          <NuxtPage />
        </template>
      </UDashboardPanel>
    </UDashboardGroup>
  </UApp>
</template>
