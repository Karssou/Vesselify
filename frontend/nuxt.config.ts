export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/google-fonts"],

  css: ["~/assets/css/main.css"],

  googleFonts: {
    download: true,
    inject: true,
    families: {
      Inter: [400, 500, 600, 700],
      "JetBrains Mono": [400, 500, 700],
    },
  },

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

  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
    },
  },
});
