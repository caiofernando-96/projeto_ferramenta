<template>
  <div style="height: 48px">
    <v-app-bar dense dark elevate-on-scroll fixed>
      <nuxt-link
        v-if="$vuetify.breakpoint.name == 'xs'"
        :to="localePath('index')"
        class="toolbar-title"
      >
        <v-toolbar-title @click="irHome">Projeto Website</v-toolbar-title>
      </nuxt-link>
      <nuxt-link v-else :to="localePath('index')" class="toolbar-title">
        <v-toolbar-title @click="irHome">{{
          $t("TituloSite")
        }}</v-toolbar-title>
      </nuxt-link>
      <v-spacer></v-spacer>

      <v-btn
        v-if="$vuetify.breakpoint.name !== 'xs'"
        icon
        @click="ToggleDarkMode"
      >
        <v-icon>
          {{
            $vuetify.theme.dark
              ? "mdi mdi-brightness-4"
              : "mdi mdi-brightness-7"
          }}
        </v-icon>
      </v-btn>

      <v-menu
        v-if="$vuetify.breakpoint.name === 'xs'"
        v-model="MaisInfoMobile"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
        transition="scale-transition"
        origin="right top"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark small v-bind="attrs" class="ml-5" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-divider></v-divider>

          <v-card-actions>
            <v-btn icon @click="ToggleDarkMode">
              <v-icon>
                {{
                  $vuetify.theme.dark
                    ? "mdi mdi-brightness-4"
                    : "mdi mdi-brightness-7"
                }}
              </v-icon>
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn text @click="MaisInfoMobile = false">{{
              $t("fechar")
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      IdiomaTrocar: false,
      MaisInfoMobile: false,
    };
  },

  beforeMount() {
    if (this.$cookies.get("isDark") === true) {
      this.$vuetify.theme.dark = this.$cookies.get("isDark");
    } else {
      this.$vuetify.theme.dark = false;
    }
  },
  methods: {
    irHome() {
      this.$router.push("/");
    },
    ToggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

      this.IdiomaTrocar = false;
      this.MaisInfoMobile = false;

      this.$nextTick(() => {
        this.$cookies.set("isDark", this.$vuetify.theme.dark);
      });
    },
  },
};
</script>
<style>
.toolbar-title {
  color: white !important;
  text-decoration: none;
}
</style>
