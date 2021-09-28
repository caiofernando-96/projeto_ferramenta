<template>
  <TemplateInterno
    :titulo="$t('geradorTextoTachado')"
    :descricao="$t('geradorTextoTachadoDescricao')"
    :temerro="error"
    :erro-texto="erroDescricao"
  >
    <template #conteudo>
      <v-row>
        <v-col align="center" md="12" cols="12" lg="12">
          <v-btn-toggle
            v-model="tipoTachado"
            borderless
            color="primary"
            mandatory
          >
            <v-btn value="rasurado">
              <span class="hidden-sm-and-down">{{ $t("botaoRasurado") }}</span>
              <span class="hidden-md-and-up">R̶Z̶</span>
            </v-btn>
            <v-btn v-show="false" value="simbolo-barra">
              <span class="hidden-sm-and-down">{{
                $t("botaoSimbiloBarra")
              }}</span>
              <span class="hidden-md-and-up">S̷B̷</span>
            </v-btn>
            <v-btn value="sublinhado">
              <span class="hidden-sm-and-down">{{
                $t("botaoSublinhado")
              }}</span>
              <span class="hidden-md-and-up">S͟</span>
            </v-btn>
            <v-btn v-show="false" value="sublinhado-duplo">
              <span class="hidden-sm-and-down">{{
                $t("botaoSublinhadoDuplo")
              }}</span>
              <span class="hidden-md-and-up">S͇D͇</span>
            </v-btn>
            <v-btn v-show="false" value="linha-pontilhada">
              <span class="hidden-sm-and-down">{{
                $t("botaoLinhaPontilhada")
              }}</span>
              <span class="hidden-md-and-up">P̤O̤</span>
            </v-btn>
            <v-btn v-show="false" value="linha-onda">
              <span class="hidden-sm-and-down">{{ $t("botaoLinhaOnda") }}</span>
              <span class="hidden-md-and-up">L̰O̰</span>
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col md="6" cols="12" lg="6">
          <v-card color="rgba(0, 0, 0, 0.06)" min-height="210">
            <v-textarea
              v-model="inputTexto"
              :label="$t('qualTexto')"
              hide-details
              auto-grow
              solo
              flat
              background-color="rgba(0, 0, 0, 0.0)"
            >
              <template v-slot:append>
                <v-scroll-x-transition>
                  <v-icon v-show="inputTexto" @click="Limpar()"
                    >mdi-close</v-icon
                  >
                </v-scroll-x-transition>
              </template>
            </v-textarea>
          </v-card>
        </v-col>
        <v-col md="6" cols="12" lg="6">
          <v-card color="rgba(0, 0, 0, 0.06)" min-height="210">
            <v-textarea
              v-model="inputTextoResultado"
              :label="$t('resultadoApareceraAqui')"
              hide-details
              auto-grow
              solo
              flat
              background-color="rgba(0, 0, 0, 0.0)"
              readonly
            >
              <template v-slot:append>
                <v-icon
                  v-if="!copiado"
                  :disabled="!inputTexto"
                  @click="CopiarTexto"
                  >mdi-content-copy</v-icon
                >
                <v-chip v-else class="ma-2" color="success" label>
                  <v-icon left>mdi-check</v-icon>
                  {{ $t("copiado") }}
                </v-chip>
              </template>
            </v-textarea>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </TemplateInterno>
</template>
<script>
import TemplateInterno from "@/components/TemplateInterno";

export default {
  name: "TextoRiscoMeio",

  components: {
    TemplateInterno,
  },

  data: () => ({
    inputTexto: "",
    copiado: false,
    error: false,
    erroDescricao: null,
    alterado: false,
    tipoTachado: "",
    inputTextoResultado: "",
  }),
  watch: {
    inputTexto() {
      this.ConverterTextoLinha();
    },
    tipoTachado() {
      this.ConverterTextoLinha();
    },
  },

  methods: {
    ConverterTextoLinha() {
      if (!this.inputTexto) return false;

      if (this.tipoTachado === "rasurado")
        this.inputTextoResultado = this.inputTexto
          .split("")
          .map((char) => char + "\u0336")
          .join("");
      else if (this.tipoTachado === "simbolo-barra")
        this.inputTextoResultado = this.inputTexto
          .split("")
          .map((char) => char + "\u0337")
          .join("");
      else if (this.tipoTachado === "sublinhado")
        this.inputTextoResultado = this.inputTexto
          .split("")
          .map((char) => char + "\u035F")
          .join("");
      else if (this.tipoTachado === "sublinhado-duplo")
        this.inputTextoResultado = this.inputTexto
          .split("")
          .map((char) => char + "\u0347")
          .join("");
      else if (this.tipoTachado === "linha-pontilhada")
        this.inputTextoResultado = this.inputTexto
          .split("")
          .map((char) => char + "\u0324")
          .join("");
      else if (this.tipoTachado === "linha-onda")
        this.inputTextoResultado = this.inputTexto
          .split("")
          .map((char) => char + "\u0330")
          .join("");
      else this.inputTextoResultado = this.inputTexto;
    },
    Limpar() {
      this.inputTextoResultado = null;
      this.inputTexto = "";
    },
    CopiarTexto() {
      this.$copyText(this.inputTextoResultado).then(
        () => {
          this.copiado = true;
          setTimeout(() => {
            this.copiado = false;
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
  },

  head() {
    return {
      title: this.$t("textoTachado"),
      meta: [
        { name: "description", content: this.$t("textoTachadoDescricao") },
        {
          name: "keywords",
          content:
            "texto, risco, sublinhado, linha onda, onda, duplo, barra, facebook, whatsapp, instagram, redes sociais, texto, gerador, generator, espaçador",
        },

        // open graph facebook
        {
          property: "og:url",
          content: "https://facilitetudo.com.br" + this.$route.fullPath,
        },
        { property: "og:type", content: this.$t("ferramentas") },
        { property: "og:title", content: this.$t("textoTachado") },
        {
          property: "og:description",
          content: this.$t("textoTachadoDescricao"),
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
        { property: "twitter:title", content: this.$t("textoTachado") },
        {
          property: "twitter:description",
          content: this.$t("textoTachadoDescricao"),
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
