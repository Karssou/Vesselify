export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@pinia/nuxt"],

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },

  routeRules: {
    // Generated at build time for SEO purpose
    "/": { prerender: true },
    // Cached for 1 hour
    "/api/*": { cache: { maxAge: 60 * 60 } },
  },
});
