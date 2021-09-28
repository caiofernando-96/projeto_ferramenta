<template>
  <TemplateInterno
    :titulo="'Color Picker Online'"
    :descricao="$t('colorPickerDescricao')"
    :temerro="error"
    :erro-texto="erroDescricao"
  >
    <template #conteudo>
      <v-row>
        <v-col md="12" sm="12" lg="12" xl="12" cols="12" align="center">
          <h5 class="text-h5 text-left">Color Picker</h5>
          <h6 class="text-h6 font-weight-light text-left mb-16">
            {{ $t("colorPickerDescricao2") }}
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">mdi-help</v-icon>
              </template>
              <span>
                {{ $t("alternarModo") }}
                <v-icon small dark>mdi-unfold-more-horizontal</v-icon></span
              >
            </v-tooltip>
          </h6>
          <v-color-picker
            v-model="colorPicker"
            swatches-max-height="300px"
            class="ma-2"
            show-swatches
          ></v-color-picker>
        </v-col>
      </v-row>
    </template>
  </TemplateInterno>
</template>
<script>
import * as Vibrant from "node-vibrant";
import FormDataPost from "@/plugins/upload";
import TemplateInterno from "@/components/TemplateInterno";

export default {
  name: "ColorPicker",
  components: {
    TemplateInterno,
  },
  data: () => ({
    copiado: false,
    colorPicker: null,
    error: false,
    coresDaFoto: null,
    qualCopiar: null,
    gerando: false,
    erroDescricao: null,
  }),

  methods: {
    copiarCor(color, i, qual) {
      this.$copyText(color).then(
        () => {
          this.qualCopiar = i + qual;

          setTimeout(() => {
            this.qualCopiar = null;
          }, 2000);
        },
        () => {
          this.error = true;
          this.erroDescricao = this.$t("ouveErroCopiar");
          setTimeout(() => {
            this.error = false;
          }, 2000);
        }
      );
    },
    onChanged() {
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file;
      } else {
        console.log("Por favor atualize seu navegador");
      }
      this.attemptUpload();
    },
    onRemoved() {
      this.image = "";
      this.coresDaFoto = null;
    },
    attemptUpload() {
      if (this.image) {
        this.gerando = true;
        FormDataPost(
          "https://api-facilite-tudo.herokuapp.com/api/v1/fotos",
          this.image
        )
          .then((response) => {
            if (response.data) {
              Vibrant.from(response.data.payload.url)
                .getPalette()
                .then((palette) => {
                  this.coresDaFoto = palette;
                  this.gerando = false;
                });
            }
          })
          .catch((err) => {
            console.error(err.message);
            this.gerando = false;
          });
      }
    },
    passarParaPicker(hex) {
      this.colorPicker = hex;
    },
  },

  head() {
    return {
      title: "Color Picker Online",
      meta: [
        { name: "description", content: this.$t("colorPickerDescricaoSEO") },
        {
          name: "keywords",
          content:
            "Captura de cores, cor, color, image, color of image, hex, hsl, rgb",
        },

        // open graph facebook
        {
          property: "og:url",
          content: "https://facilitetudo.com.br" + this.$route.fullPath,
        },
        { property: "og:type", content: this.$t("ferramentas") },
        { property: "og:title", content: "Color Picker Online" },
        {
          property: "og:description",
          content: this.$t("colorPickerDescricaoSEO"),
        },
        {
          property: "og:image",
          content: require("@/assets/fotos/conversor-texto.jpg"),
        },

        // twitter
        { property: "twitter:card", content: "summary" },
        {
          property: "twitter:url",
          content: "https://facilitetudo.com.br" + this.$route.fullPath,
        },
        { property: "twitter:title", content: "Color Picker Online" },
        {
          property: "twitter:description",
          content: this.$t("colorPickerDescricaoSEO"),
        },
        {
          property: "twitter:image",
          content: require("@/assets/fotos/conversor-texto.jpg"),
        },
      ],
    };
  },
};
</script>
<style lang="css">
.index1 .picture-preview {
  z-index: 0 !important;
}
</style>
