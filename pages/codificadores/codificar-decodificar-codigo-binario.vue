<template>
  <TemplateInterno
    :titulo="$t('codificadorDecodificadorCodigoBinario')"
    :descricao="$t('codificadorDecodificadorCodigoBinarioDescricao')"
    :temerro="error"
    :erro-texto="erroDescricao"
  >
    <template #conteudo>
      <v-row>
        <v-col align="center" cols="12">
          <v-btn-toggle v-model="Alternar" borderless color="primary">
            <v-btn value="codificador">
              <span>{{ $t("codificador") }}</span>
            </v-btn>
            <v-btn value="decodificador">
              <span>{{ $t("decodificador") }}</span>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>

      <v-row v-if="Alternar === 'codificador'">
        <v-col md="12" xl="12" cols="12">
          <div class="text-h6 font-weight-light codificadorClass">
            {{ $t("codificador") }}
          </div>
        </v-col>
        <v-col md="6" cols="12">
          <v-card color="rgba(0, 0, 0, 0.06)" min-height="178">
            <v-textarea
              v-model="inputTextoCodificador"
              :label="$t('qualTexto')"
              auto-grow
              solo
              flat
              hide-details
              background-color="rgba(0, 0, 0, 0.0)"
            >
              <template v-slot:append>
                <v-scroll-x-transition>
                  <v-icon v-show="inputTextoCodificador" @click="Limpar2"
                    >mdi-close</v-icon
                  >
                </v-scroll-x-transition>
              </template>
            </v-textarea>
          </v-card>
        </v-col>
        <v-col md="6" cols="12">
          <v-card color="rgba(0, 0, 0, 0.06)" min-height="178">
            <v-textarea
              v-model="inputTextoResultado2"
              :label="$t('resultadoApareceraAqui')"
              readonly
              auto-grow
              solo
              flat
              hide-details
              background-color="rgba(0, 0, 0, 0.0)"
            >
              <template v-slot:append>
                <v-icon
                  v-if="!copiado2"
                  :disabled="!inputTextoResultado2"
                  @click="CopiarTexto2"
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

      <v-row v-if="Alternar === 'decodificador'">
        <v-col md="12" cols="12">
          <div class="text-h6 font-weight-light">{{ $t("decodificador") }}</div>
        </v-col>

        <v-col md="6" cols="12">
          <v-card color="rgba(0, 0, 0, 0.06)" min-height="178">
            <v-textarea
              v-model="inputTexto"
              :label="$t('qualCodigo')"
              auto-grow
              solo
              flat
              hide-details
              background-color="rgba(0, 0, 0, 0.0)"
            >
              <template v-slot:append>
                <v-scroll-x-transition>
                  <v-icon v-show="inputTexto" @click="Limpar">mdi-close</v-icon>
                </v-scroll-x-transition>
              </template>
            </v-textarea>
          </v-card>
        </v-col>
        <v-col md="6" cols="12">
          <v-card color="rgba(0, 0, 0, 0.06)" min-height="178">
            <v-textarea
              v-model="inputTextoResultado"
              :label="$t('resultadoApareceraAqui')"
              readonly
              auto-grow
              solo
              flat
              hide-details
              background-color="rgba(0, 0, 0, 0.0)"
            >
              <template v-slot:append>
                <v-icon
                  v-if="!copiado"
                  :disabled="!inputTextoResultado"
                  @click="CopiarTexto"
                  >mdi-content-copy</v-icon
                >
                <v-chip v-else class="ma-2" color="success" label>
                  <v-icon left>mdi-check</v-icon>
                  {{ $t("copiado") }}
                </v-chip>
              </template>
            </v-textarea>
            <v-row>
              <v-col cols="12" align="right" class="pb-0">
                <v-btn-toggle
                  v-model="alterarResultadoTextoCaso"
                  color="primary"
                  dense
                  group
                >
                  <v-btn value="maiusculo" class="ma-0">
                    {{ $t("maiusculo") }}
                  </v-btn>

                  <v-btn value="minusculo" class="ma-0">
                    {{ $t("minusculo") }}
                  </v-btn>

                  <v-btn value="none" class="ma-0"> {{ $t("padrao") }} </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <div class="mt-16">
        <h2 class="text-h6 mt-5">O que é Código Binário?</h2>
        <p>
          O sistema binário ou de base 2 é um sistema de numeração posicional em
          que todas as quantidades se representam com base em dois números, ou
          seja, zero e um (0 e 1).<br />
          Os computadores digitais trabalham internamente com dois níveis de
          tensão, pelo que o seu sistema de numeração natural é o sistema
          binário. Com efeito, num sistema simples como este é possível
          simplificar o cálculo, com o auxílio da lógica booliana. Em
          computação, chama-se um dígito binário (0 ou 1) de bit, que vem do
          inglês Binary Digit. Um agrupamento de 8 bits corresponde a um byte
          (Binary Term). Um agrupamento de 4 bits, ainda, é chamado de nibble.
          <br />
          Um processador é formado por milhares de blocos lógicos complexos,
          formados por portas lógicas básicas, e o funcionamento destas está
          amparado por um postulado fundamental à eletrônica digital que
          determina que um circuito opere apenas com dois níveis de tensão bem
          definidos. Em um circuito digital TTL (Transistor Transistor Logic ou
          simplesmente TTL é uma classe de circuitos digitais construídos de
          transistores de junção bipolar (BJT), e resistores), os dois níveis de
          tensão padronizados são 0V (zero volt) e 5V (cinco volts). Ao projetar
          um sistema digital, ao invés de trabalhar com níveis de tensão
          trabalha-se com níveis lógicos, então, no caso do circuito TTL, 0V
          será representado por “0” e 5V será representado por “1”, e os níveis
          de tensão entre eles serão ignorados, ou seja, adotar-se-á uma faixa
          até a qual será considerado nível lógico zero, e a partir dela, nível
          lógico 1. Neste caso, de 0V a 2,5V temos “0”, e a partir daí até 5V
          temos “1”.
        </p>
      </div>
    </template>
  </TemplateInterno>
</template>
<script>
import TemplateInterno from "@/components/TemplateInterno";

export default {
  name: "TradutorCodigoMorse",

  components: {
    TemplateInterno,
  },

  data: () => ({
    inputTexto: null,
    inputTextoCodificador: null,
    copiado: false,
    copiado2: false,
    inputTextoResultado: null,
    inputTextoResultado2: null,
    alterarResultadoTextoCaso: "none",
    Alternar: "codificador",
    erroDescricao: null,
    error: false,
  }),
  watch: {
    inputTexto() {
      this.DecodeBinario();
    },
    inputTextoCodificador() {
      this.codeBinario();
    },
    alterarResultadoTextoCaso() {
      this.DecodeBinario();
    },
  },

  methods: {
    DecodeBinario() {
      if (!this.inputTexto) return;

      this.inputTextoResultado = this.inputTexto
        .split(" ")
        .map((bin) => String.fromCharCode(parseInt(bin, 2)))
        .join("");
      if (this.alterarResultadoTextoCaso === "maiusculo") {
        this.inputTextoResultado = this.inputTextoResultado.toUpperCase();
      } else if (this.alterarResultadoTextoCaso === "minusculo") {
        this.inputTextoResultado = this.inputTextoResultado.toLowerCase();
      } else {
        this.inputTextoResultado = this.inputTexto
          .split(" ")
          .map((bin) => String.fromCharCode(parseInt(bin, 2)))
          .join("");
      }
    },

    codeBinario() {
      if (!this.inputTextoCodificador) return;

      this.inputTextoResultado2 = this.inputTextoCodificador
        .split("")
        .map((char) => {
          return char.charCodeAt(0).toString(2);
        })
        .join(" ");
    },

    Limpar() {
      this.inputTextoResultado = null;
      this.inputTexto = null;
    },
    Limpar2() {
      this.inputTextoResultado2 = null;
      this.inputTextoCodificador = null;
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
          this.erroDescricao = "Ouve um erro ao copiar";
          setTimeout(() => {
            this.erroDescricao = false;
          }, 2000);
        }
      );
    },
    CopiarTexto2() {
      this.$copyText(this.inputTextoResultado2).then(
        () => {
          this.copiado2 = true;
          setTimeout(() => {
            this.copiado2 = false;
          }, 2000);
        },
        () => {
          this.error = true;
          this.erroDescricao = "Ouve um erro ao copiar";
          setTimeout(() => {
            this.erroDescricao = false;
          }, 2000);
        }
      );
    },
  },

  head() {
    return {
      title: this.$t("codificadorBinario"),
      meta: [
        {
          name: "description",
          content: this.$t("codificadorBinarioDescricao"),
        },
        {
          name: "keywords",
          content:
            "Codificador, Decodificador, Código Binário, Código, Gerador, Ferramenta, Conversor",
        },

        // open graph facebook
        {
          property: "og:url",
          content: "https://facilitetudo.com.br" + this.$route.fullPath,
        },
        { property: "og:type", content: this.$t("ferramentas") },
        { property: "og:title", content: this.$t("codificadorBinario") },
        {
          property: "og:description",
          content: this.$t("codificadorBinarioDescricao"),
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
        { property: "twitter:title", content: this.$t("codificadorBinario") },
        {
          property: "twitter:description",
          content: this.$t("codificadorBinarioDescricao"),
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
