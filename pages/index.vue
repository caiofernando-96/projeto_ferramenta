<template>
  <div class="home" style="margin-top: -48px">
    <v-carousel
      v-model="model"
      hide-delimiters
      :show-arrows="false"
      class="bannerHome"
      height="350px"
    >
      <v-carousel-item
        v-for="(banner, i) in banners"
        :key="i"
        :src="banner.img"
      >
        <v-card height="100%" tile color="transparent">
          <v-row class="fill-height" align="center" justify="center">
            <v-col md="12" cols="12" lg="12" xl="12">
              <div :v-if="banner.id == 1">
                <h3 class="display-3 text-center">{{ $t("ferramentas") }}</h3>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      model: 0,
      banners: [
        {
          color: "primary",
          img: require("@/assets/fotos/facilite-tudo-banner.jpg"),
        },
      ],
    };
  },

  computed: {
    FerramentasPopulares() {
      return [
        {
          title: this.$t("conversorTextos"),
          categoria: this.$t("utilidadesTexto"),
          descricao: this.$t("descricaoConversorTextoHomePopular"),
          to: this.localePath("conversores-conversor-textos"),
          img: require("@/assets/fotos/conversor-texto.jpg"),
        },
        {
          title: this.$t("formatadoresCodigoPopular"),
          categoria: this.$t("formatadoresCodigoPopularCat"),
          descricao: this.$t("descricaoFormatadorCodigoHomePopular"),
          to: this.localePath("formatadores-formatador-codigos"),
          img: require("@/assets/fotos/formatador-code.jpg"),
        },
        {
          title: this.$t("paletaCoresHome"),
          categoria: "Design",
          descricao: this.$t("paletaCoresHomeDescricao"),
          to: this.localePath("design-paleta-cores"),
          img: require("@/assets/fotos/paleta-cores.jpg"),
        },
        {
          title: "Color Picker",
          categoria: "Design",
          descricao: this.$t("colorPickerDescricaoHome"),
          to: this.localePath("design-color-picker"),
          img: require("@/assets/fotos/color-picker.jpg"),
        },
      ];
    },
  },
  head() {
    return {
      title: this.$t("paginaInicial"),
      meta: [
        { name: "description", content: this.$t("paginaInicialDescricao") },
        // open graph facebook
        { property: "og:url", content: "https://facilitetudo.com.br" },
        { property: "og:type", content: this.$t("ferramentas") },
        { property: "og:title", content: this.$t("paginaInicial") },
        {
          property: "og:description",
          content: this.$t("paginaInicialDescricao"),
        },
        {
          property: "og:image",
          content:
            "https://facilitetudo.com.br/img/conversor-texto.c639fe95.jpg",
        },

        // twitter
        { property: "twitter:card", content: "summary" },
        { property: "twitter:domain", content: "https://facilitetudo.com.br" },
        { property: "twitter:title", content: this.$t("paginaInicial") },
        {
          property: "twitter:description",
          content: this.$t("paginaInicialDescricao"),
        },
        {
          property: "twitter:image",
          content:
            "https://facilitetudo.com.br/img/conversor-texto.c639fe95.jpg",
        },
      ],
    };
  },
};
</script>
<style>
.bannerHome .v-image__image::before {
  content: "";
  width: 100%;
  height: 100%;
  background-color: rgb(25 118 210 / 45%);
  position: absolute;
}
.bannerHome .v-image__image {
  background-position: 0px -42px !important;
}
</style>
