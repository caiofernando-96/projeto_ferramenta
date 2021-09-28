<template>
  <TemplateInterno :titulo="$t('termosUso')" :mostrar-feedback="false">
    <template #conteudo>
      <v-container class="mt-16 mb-16">
        <h2 class="text-h6 pt-2 font-weight-regular">
          {{ $t("termosUsoTexto") }}
          <br />
          {{ $t("termosUsoTexto2") }}
        </h2>

        <h1 class="text-h3 mt-16">{{ $t("licencaUso") }}</h1>
        <h2 class="text-h6 pt-2 font-weight-regular">
          {{ $t("licencaUsoTexto") }}
          <br />
          {{ $t("licencaUsoTexto2") }} <b> {{ $t("licencaUsoTexto3") }}</b>
          {{ $t("licencaUsoTexto4") }}
        </h2>
      </v-container>
    </template>
  </TemplateInterno>
</template>

<script>
import TemplateInterno from "@/components/TemplateInterno";

export default {
  components: {
    TemplateInterno,
  },
  head() {
    return {
      title: this.$t("termosUso"),
      meta: [
        { name: "description", content: this.$t("descricaoTermosSEO") },
        {
          name: "keywords",
          content:
            "texto, espaçado, facebook, whatsapp, instagram, redes sociais, texto, gerador, generator, espaçador",
        },

        // open graph facebook
        {
          property: "og:url",
          content: "https://facilitetudo.com.br" + this.$route.fullPath,
        },
        { property: "og:type", content: this.$t("ferramentas") },
        { property: "og:title", content: this.$t("termosUso") },
        {
          property: "og:description",
          content: this.$t("descricaoTermosSEO"),
        },
        {
          property: "og:image",
          content: require("@/assets/fotos/Gerador-de-imagens-Facilite-Tudo.jpg"),
        },

        // twitter
        { property: "twitter:card", content: "summary" },
        {
          property: "twitter:url",
          content: "https://facilitetudo.com.br" + this.$route.fullPath,
        },
        { property: "twitter:title", content: this.$t("termosUso") },
        {
          property: "twitter:description",
          content: this.$t("descricaoTermosSEO"),
        },
        {
          property: "twitter:image",
          content: require("@/assets/fotos/Gerador-de-imagens-Facilite-Tudo.jpg"),
        },
      ],
    };
  },
};
</script>
