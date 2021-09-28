<template>
  <TemplateInterno
    :titulo="$t('conversorTextos')"
    :descricao="$t('conversorTextosDescricao')"
    :temerro="error"
    :erro-texto="erroDescricao"
  >
    <template #conteudo>
      <v-row>
        <v-col align="center">
          <v-btn-toggle v-model="converterTexto" borderless color="primary">
            <v-btn value="PrimeiraTodosMaiuscula">
              <span class="hidden-sm-and-down">{{
                $t("botaoPrimeiraLetraTodosMaiusculo")
              }}</span>
            </v-btn>
            <v-btn v-show="false" value="PrimeiraLetraMaiusculo">
              <span class="hidden-sm-and-down">{{
                $t("botaoPrimeiraLetraMaiusculo")
              }}</span>
            </v-btn>
            <v-btn value="Maiusculo">
              <span class="hidden-sm-and-down">{{ $t("maiusculo") }}</span>
            </v-btn>
            <v-btn value="Minusculo">
              <span class="hidden-sm-and-down">{{ $t("minusculo") }}</span>
            </v-btn>
            <v-btn v-show="false" value="Alternando">
              <span class="hidden-sm-and-down">{{ $t("alternando") }}</span>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-card color="rgba(0, 0, 0, 0.06)" min-height="210">
        <v-textarea
          v-model="inputTexto"
          :label="$t('vamosCorrigir')"
          counter
          auto-grow
          solo
          flat
          background-color="rgba(0, 0, 0, 0.0)"
        >
          <template v-slot:append>
            <v-icon v-if="!copiado" :disabled="!inputTexto" @click="CopiarTexto"
              >mdi-content-copy</v-icon
            >
            <v-chip v-else class="ma-2" color="success" label>
              <v-icon left>mdi-check</v-icon>
              {{ $t("copiado") }}
            </v-chip>
          </template>
        </v-textarea>

        <v-col cm="12" align="right">
          <v-scroll-x-transition>
            <v-icon v-show="inputTexto" @click="Limpar()">mdi-close</v-icon>
          </v-scroll-x-transition>
        </v-col>
      </v-card>
    </template>
  </TemplateInterno>
</template>
<script>
import TemplateInterno from "@/components/TemplateInterno";

export default {
  name: "ConversorTextos",
  components: {
    TemplateInterno,
  },

  data: () => ({
    inputTexto: "",
    copiado: false,
    converterTexto: null,
    error: false,
    erroDescricao: null,
  }),

  watch: {
    inputTexto() {
      if (this.converterTexto === "PrimeiraTodosMaiuscula")
        this.PrimeiraPalavraMaiusculo();
      else if (this.converterTexto === "PrimeiraLetraMaiusculo")
        this.PrimeiraLetraMaiusculo();
      else if (this.converterTexto === "Maiusculo") this.ParaMaiusculo();
      else if (this.converterTexto === "Minusculo") this.ParaMinusculo();
      else if (this.converterTexto === "Alternando") this.Alternando();
    },
    converterTexto() {
      if (this.converterTexto === "PrimeiraTodosMaiuscula")
        this.PrimeiraPalavraMaiusculo();
      else if (this.converterTexto === "PrimeiraLetraMaiusculo")
        this.PrimeiraLetraMaiusculo();
      else if (this.converterTexto === "Maiusculo") this.ParaMaiusculo();
      else if (this.converterTexto === "Minusculo") this.ParaMinusculo();
      else if (this.converterTexto === "Inverter") this.Reverse();
      else if (this.converterTexto === "Alternando") this.Alternando();
    },
  },

  methods: {
    Limpar() {
      this.converterTexto = null;
      this.inputTexto = "";
    },
    PrimeiraLetraMaiusculo() {
      // eg Teste teste
      this.inputTexto = this.inputTexto
        .toLowerCase()
        .replace(/[a-z]/i, function (text) {
          return text.toUpperCase();
        })
        .trim();
    },
    PrimeiraPalavraMaiusculo() {
      // eg Teste Teste
      this.inputTexto = this.inputTexto.replace(/\w\S*/g, function (text) {
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
      });
    },

    ParaMaiusculo() {
      // eg TESTE
      this.inputTexto = this.inputTexto.toUpperCase();
    },

    ParaMinusculo() {
      // eg teste
      this.inputTexto = this.inputTexto.toLowerCase();
    },

    Alternando() {
      // eg TeStE
      const chars = this.inputTexto.split("");

      this.inputTexto = chars
        .map((value, index) => {
          return index % 2
            ? this.inputTexto[index].toLowerCase()
            : this.inputTexto[index].toUpperCase();
        })
        .join("");
    },
    Reverse() {
      // eg etset
      const reversed = (inputTexto) => [...inputTexto].reverse().join("");

      this.inputTexto = reversed(this.inputTexto);
    },

    CopiarTexto() {
      this.$copyText(this.inputTexto).then(
        () => {
          this.copiado = true;
          setTimeout(() => {
            this.copiado = false;
          }, 2000);
        },
        () => {
          this.error = true;
          this.erroDescricao = "Ouve um erro ao copiar";
          setTimeout(() => {
            this.error = false;
          }, 2000);
        }
      );
    },
  },

  head() {
    return {
      title: this.$t("conversorTextosTitle"),
      meta: [
        {
          name: "description",
          content: this.$t("conversorTextosTitleDescricao"),
        },
        {
          name: "keywords",
          content:
            "Conversor, Conversor, Gerador, Generator, Texto, Text, Maiusculo, Minusculo, Maiúsculo, Minúsculo, Primeira Letra",
        },

        // open graph facebook
        {
          property: "og:url",
          content: "https://facilitetudo.com.br" + this.$route.fullPath,
        },
        { property: "og:type", content: this.$t("ferramentas") },
        { property: "og:title", content: this.$t("conversorTextosTitle") },
        {
          property: "og:description",
          content: this.$t("conversorTextosTitleDescricao"),
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
        { property: "twitter:title", content: this.$t("conversorTextosTitle") },
        {
          property: "twitter:description",
          content: this.$t("conversorTextosTitleDescricao"),
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
