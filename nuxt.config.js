import i18n from "./traducao/i18n";
const isDev = process.env.NODE_ENV !== "production";

export default {
  // https://nuxtjs.org/api/configuration-modern
  modern: !isDev,

  // https://nuxtjs.org/api/configuration-head
  head: {
    titleTemplate(title) {
      if (title) {
        return `${title} - Fecilite Tudo`;
      }
      return "Fecilite Tudo";
    },
  },

  // https://nuxtjs.org/api/configuration-modules
  modules: [
    // https://http.nuxtjs.org/
    "@nuxt/http",
    "@nuxtjs/axios",
    "nuxt-clipboard2",
    "cookie-universal-nuxt",

    // https://pwa.nuxtjs.org/
    "@nuxtjs/pwa",

    [
      "nuxt-i18n",
      {
        seo: true,
        strategy: "prefix",
        defaultLocale: "pt",
        locales: [
          {
            name: "Português",
            code: "pt",
            iso: "pt-BR",
          },
          {
            name: "English",
            code: "en",
            iso: "en-US",
          },
        ],
        vueI18n: i18n,
      },
    ],

    // https://github.com/nuxt-community/sentry-module
    // "@nuxtjs/sentry",

    // https://github.com/nuxt-community/analytics-module
    // [
    //   "@nuxtjs/google-analytics",
    //   {
    //     // TODO: Change this id to your Google Analytics ID
    //     id: process.env.GOOGLE_ANALYTICS
    //   }
    // ]
  ],

  buildModules: [
    // Simple usage
    "@nuxtjs/vuetify",
  ],

  vuetify: {},
  router: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ["script", "style", "font"].includes(type);
      },
    },
    async scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }

      const findEl = async (hash, x = 0) => {
        return (
          document.querySelector(hash) ||
          new Promise((resolve) => {
            if (x > 50) {
              return resolve(document.querySelector("#app"));
            }
            setTimeout(() => {
              resolve(findEl(hash, ++x || 1));
            }, 100);
          })
        );
      };

      if (to.hash) {
        const el = await findEl(to.hash);
        if ("scrollBehavior" in document.documentElement.style) {
          return window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
        } else {
          return window.scrollTo(0, el.offsetTop);
        }
      }

      return { x: 0, y: 0 };
    },
  },

  // https://nuxtjs.org/api/configuration-plugins
  plugins: [
    { src: "~plugins/vue-feedback", ssr: false },
    { src: "~plugins/vue-editor", ssr: false },
    { src: "~plugins/vue-picture-input", ssr: false },
    { src: "~plugins/ace-editor", ssr: false },
  ],

  // https://nuxtjs.org/api/configuration-css
  css: ["~assets/styles/app"],

  // https://nuxtjs.org/api/configuration-build
  build: {
    extractCSS: !isDev,
    standalone: true,
    transpile: ["vee-validate/dist/rules"],
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: "empty",
      };
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /node_modules/,
          options: {
            fix: true,
          },
        });
      }
    },
  },
};
