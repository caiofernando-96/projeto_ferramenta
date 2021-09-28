<template>
  <v-app id="app">
    <v-main>
      <span v-if="$route.name === 'index___pt' || $route.name === 'index___en'">
        <NavBar />
        <transition name="fade" mode="out-in">
          <Nuxt />
        </transition>
        <ListaFerramentas />
        <Footer />
      </span>
      <span v-else>
        <transition name="fade" mode="out-in">
          <Nuxt />
        </transition>
        <ListaFerramentas />
        <Footer />
      </span>
    </v-main>
  </v-app>
</template>
<script>
import NavBar from "@/components/NavBar";
import ListaFerramentas from "@/components/ListaFerramentas";
import Footer from "@/components/Footer";

export default {
  components: {
    NavBar,
    ListaFerramentas,
    Footer,
  },
  head() {
    return {
      titleTemplate: "%s | Projeto Website",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    };
  },
};
</script>
<style>
.v-app-bar--hide-shadow {
  background-color: transparent !important;
}
.v-app-bar--is-scrolled {
  background-color: #1976d2 !important;
  border-color: #1976d2 !important;
}
</style>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
