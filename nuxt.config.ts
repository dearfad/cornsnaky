// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-11-20",
  devtools: { enabled: false },
  ssr: true,
  modules: [
    "vuetify-nuxt-module",
    "@nuxtjs/supabase",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  piniaPluginPersistedstate: {
    storage: "localStorage",
  },
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    public: {
      cryptoKey: "",
    },
  },
});
