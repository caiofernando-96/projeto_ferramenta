<template>
  <TemplateInterno
    :titulo="$t('paletaCores')"
    :descricao="$t('paletaCoresDescricao')"
    :temerro="error"
    :erro-texto="erroDescricao"
  >
    <template #conteudo>
      <v-row>
        <v-col
          v-for="(paleta, index1) in paletaCores"
          :key="index1"
          class="mt-10"
          md="4"
          sm="12"
          lg="4"
          xl="3"
          cols="12"
        >
          <v-card flat :color="paleta.colorBack" dark tile>
            <v-card-title>{{ paleta.title }}</v-card-title>
          </v-card>
          <v-card
            v-for="(paletas, index2) in paleta.cores"
            :key="index2"
            flat
            :color="paletas.colorBack"
            :dark="paletas.isDark"
            tile
          >
            <v-hover v-slot:default="{ hover }">
              <v-row>
                <v-col align="left">
                  <v-card-title>{{ paletas.colorHex }}</v-card-title>
                </v-col>
                <v-col align="right">
                  <v-card-actions class="text-right" style="display: block">
                    <v-scroll-x-transition>
                      <div v-if="hover">
                        <v-btn
                          v-if="!paletas.copiado"
                          icon
                          @click="
                            CopiarTexto(paletas.colorHex, {
                              i1: index1,
                              i2: index2,
                            })
                          "
                        >
                          <v-icon>mdi-content-copy</v-icon>
                        </v-btn>
                        <v-chip v-else class="ma-2" color="success" label>
                          <v-icon left>mdi-check</v-icon>Copiado!
                        </v-chip>
                      </div>
                    </v-scroll-x-transition>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-hover>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </TemplateInterno>
</template>
<script>
import TemplateInterno from "@/components/TemplateInterno";

export default {
  name: "PaletaCores",
  components: {
    TemplateInterno,
  },
  data: () => ({
    copiado: false,
    error: false,
    erroDescricao: null,
    paletaCores: [],
  }),
  mounted() {
    this.paletaCoresMetodo();
  },
  methods: {
    CopiarTexto(hex, indexes) {
      this.$copyText(hex).then(
        () => {
          this.paletaCores[indexes.i1].cores[indexes.i2].copiado = true;
          setTimeout(() => {
            this.paletaCores[indexes.i1].cores[indexes.i2].copiado = false;
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

    paletaCoresMetodo() {
      this.paletaCores = [
        {
          // col
          title: this.$t("vermelho"),
          colorBack: "red",
          cores: [
            {
              colorHex: "#F44336",
              copiado: false,
              colorBack: "red",
              isDark: true,
            },
            {
              colorHex: "#FFEBEE",
              copiado: false,
              colorBack: "red lighten-5",
              isDark: false,
            },
            {
              colorHex: "#FFCDD2",
              copiado: false,
              colorBack: "red lighten-4",
            },
            {
              colorHex: "#EF9A9A",
              copiado: false,
              colorBack: "red lighten-3",
              isDark: true,
            },
            {
              colorHex: "#E57373",
              copiado: false,
              colorBack: "red lighten-2",
              isDark: true,
            },
            {
              colorHex: "#EF5350",
              copiado: false,
              colorBack: "red lighten-1",
              isDark: true,
            },
            {
              colorHex: "#E53935",
              copiado: false,
              colorBack: "red darken-1",
              isDark: true,
            },
            {
              colorHex: "#D32F2F",
              copiado: false,
              colorBack: "red darken-2",
              isDark: true,
            },
            {
              colorHex: "#C62828",
              copiado: false,
              colorBack: "red darken-3",
              isDark: true,
            },
            {
              colorHex: "#B71C1C",
              copiado: false,
              colorBack: "red darken-4",
              isDark: true,
            },
            {
              colorHex: "#FF8A80",
              copiado: false,
              colorBack: "red accent-1",
              isDark: true,
            },
            {
              colorHex: "#FF5252",
              copiado: false,
              colorBack: "red accent-2",
              isDark: true,
            },
            {
              colorHex: "#FF1744",
              copiado: false,
              colorBack: "red accent-3",
              isDark: true,
            },
            {
              colorHex: "#D50000",
              copiado: false,
              colorBack: "red accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("rosa"),
          colorBack: "pink",
          cores: [
            {
              colorHex: "#E91E63",
              copiado: false,
              colorBack: "pink",
              isDark: true,
            },
            {
              colorHex: "#FCE4EC",
              copiado: false,
              colorBack: "pink lighten-5",
              isDark: false,
            },
            {
              colorHex: "#F8BBD0",
              copiado: false,
              colorBack: "pink lighten-4",
            },
            {
              colorHex: "#F48FB1",
              copiado: false,
              colorBack: "pink lighten-3",
              isDark: true,
            },
            {
              colorHex: "#F06292",
              copiado: false,
              colorBack: "pink lighten-2",
              isDark: true,
            },
            {
              colorHex: "#EC407A",
              copiado: false,
              colorBack: "pink lighten-1",
              isDark: true,
            },
            {
              colorHex: "#D81B60",
              copiado: false,
              colorBack: "pink darken-1",
              isDark: true,
            },
            {
              colorHex: "#C2185B",
              copiado: false,
              colorBack: "pink darken-2",
              isDark: true,
            },
            {
              colorHex: "#AD1457",
              copiado: false,
              colorBack: "pink darken-3",
              isDark: true,
            },
            {
              colorHex: "#880E4F",
              copiado: false,
              colorBack: "pink darken-4",
              isDark: true,
            },
            {
              colorHex: "#FF80AB",
              copiado: false,
              colorBack: "pink accent-1",
              isDark: true,
            },
            {
              colorHex: "#FF4081",
              copiado: false,
              colorBack: "pink accent-2",
              isDark: true,
            },
            {
              colorHex: "#F50057",
              copiado: false,
              colorBack: "pink accent-3",
              isDark: true,
            },
            {
              colorHex: "#C51162",
              copiado: false,
              colorBack: "pink accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("roxo"),
          colorBack: "purple",
          cores: [
            {
              colorHex: "#9C27B0",
              copiado: false,
              colorBack: "purple",
              isDark: true,
            },
            {
              colorHex: "#F3E5F5",
              copiado: false,
              colorBack: "purple lighten-5",
              isDark: false,
            },
            {
              colorHex: "#E1BEE7",
              copiado: false,
              colorBack: "purple lighten-4",
            },
            {
              colorHex: "#CE93D8",
              copiado: false,
              colorBack: "purple lighten-3",
              isDark: true,
            },
            {
              colorHex: "#BA68C8",
              copiado: false,
              colorBack: "purple lighten-2",
              isDark: true,
            },
            {
              colorHex: "#AB47BC",
              copiado: false,
              colorBack: "purple lighten-1",
              isDark: true,
            },
            {
              colorHex: "#8E24AA",
              copiado: false,
              colorBack: "purple darken-1",
              isDark: true,
            },
            {
              colorHex: "#7B1FA2",
              copiado: false,
              colorBack: "purple darken-2",
              isDark: true,
            },
            {
              colorHex: "#6A1B9A",
              copiado: false,
              colorBack: "purple darken-3",
              isDark: true,
            },
            {
              colorHex: "#4A148C",
              copiado: false,
              colorBack: "purple darken-4",
              isDark: true,
            },
            {
              colorHex: "#EA80FC",
              copiado: false,
              colorBack: "purple accent-1",
              isDark: true,
            },
            {
              colorHex: "#E040FB",
              copiado: false,
              colorBack: "purple accent-2",
              isDark: true,
            },
            {
              colorHex: "#D500F9",
              copiado: false,
              colorBack: "purple accent-3",
              isDark: true,
            },
            {
              colorHex: "#AA00FF",
              copiado: false,
              colorBack: "purple accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("roxoEscuro"),
          colorBack: "deep-purple",
          cores: [
            {
              colorHex: "#673AB7",
              copiado: false,
              colorBack: "deep-purple ",
              isDark: true,
            },
            {
              colorHex: "#EDE7F6",
              copiado: false,
              colorBack: "deep-purple lighten-5",
              isDark: false,
            },
            {
              colorHex: "#D1C4E9",
              copiado: false,
              colorBack: "deep-purple lighten-4",
            },
            {
              colorHex: "#B39DDB",
              copiado: false,
              colorBack: "deep-purple lighten-3",
              isDark: true,
            },
            {
              colorHex: "#9575CD",
              copiado: false,
              colorBack: "deep-purple lighten-2",
              isDark: true,
            },
            {
              colorHex: "#7E57C2",
              copiado: false,
              colorBack: "deep-purple lighten-1",
              isDark: true,
            },
            {
              colorHex: "#5E35B1",
              copiado: false,
              colorBack: "deep-purple darken-1",
              isDark: true,
            },
            {
              colorHex: "#512DA8",
              copiado: false,
              colorBack: "deep-purple darken-2",
              isDark: true,
            },
            {
              colorHex: "#4527A0",
              copiado: false,
              colorBack: "deep-purple darken-3",
              isDark: true,
            },
            {
              colorHex: "#311B92",
              copiado: false,
              colorBack: "deep-purple darken-4",
              isDark: true,
            },
            {
              colorHex: "#B388FF",
              copiado: false,
              colorBack: "deep-purple accent-1",
              isDark: true,
            },
            {
              colorHex: "#7C4DFF",
              copiado: false,
              colorBack: "deep-purple accent-2",
              isDark: true,
            },
            {
              colorHex: "#651FFF",
              copiado: false,
              colorBack: "deep-purple accent-3",
              isDark: true,
            },
            {
              colorHex: "#6200EA",
              copiado: false,
              colorBack: "deep-purple accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("anil"),
          colorBack: "indigo",
          cores: [
            {
              colorHex: "#3F51B5",
              copiado: false,
              colorBack: "indigo",
              isDark: true,
            },
            {
              colorHex: "#E8EAF6",
              copiado: false,
              colorBack: "indigo lighten-5",
              isDark: false,
            },
            {
              colorHex: "#C5CAE9",
              copiado: false,
              colorBack: "indigo lighten-4",
            },
            {
              colorHex: "#9FA8DA",
              copiado: false,
              colorBack: "indigo lighten-3",
              isDark: true,
            },
            {
              colorHex: "#7986CB",
              copiado: false,
              colorBack: "indigo lighten-2",
              isDark: true,
            },
            {
              colorHex: "#5C6BC0",
              copiado: false,
              colorBack: "indigo lighten-1",
              isDark: true,
            },
            {
              colorHex: "#3949AB",
              copiado: false,
              colorBack: "indigo darken-1",
              isDark: true,
            },
            {
              colorHex: "#303F9F",
              copiado: false,
              colorBack: "indigo darken-2",
              isDark: true,
            },
            {
              colorHex: "#283593",
              copiado: false,
              colorBack: "indigo darken-3",
              isDark: true,
            },
            {
              colorHex: "#1A237E",
              copiado: false,
              colorBack: "indigo darken-4",
              isDark: true,
            },
            {
              colorHex: "#8C9EFF",
              copiado: false,
              colorBack: "indigo accent-1",
              isDark: true,
            },
            {
              colorHex: "#536DFE",
              copiado: false,
              colorBack: "indigo accent-2",
              isDark: true,
            },
            {
              colorHex: "#3D5AFE",
              copiado: false,
              colorBack: "indigo accent-3",
              isDark: true,
            },
            {
              colorHex: "#304FFE",
              copiado: false,
              colorBack: "indigo accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("azul"),
          colorBack: "blue",
          cores: [
            {
              colorHex: "#2196F3",
              copiado: false,
              colorBack: "blue",
              isDark: true,
            },
            {
              colorHex: "#E3F2FD",
              copiado: false,
              colorBack: "blue lighten-5",
              isDark: false,
            },
            {
              colorHex: "#BBDEFB",
              copiado: false,
              colorBack: "blue lighten-4",
            },
            {
              colorHex: "#90CAF9",
              copiado: false,
              colorBack: "blue lighten-3",
              isDark: true,
            },
            {
              colorHex: "#64B5F6",
              copiado: false,
              colorBack: "blue lighten-2",
              isDark: true,
            },
            {
              colorHex: "#42A5F5",
              copiado: false,
              colorBack: "blue lighten-1",
              isDark: true,
            },
            {
              colorHex: "#1E88E5",
              copiado: false,
              colorBack: "blue darken-1",
              isDark: true,
            },
            {
              colorHex: "#1976D2",
              copiado: false,
              colorBack: "blue darken-2",
              isDark: true,
            },
            {
              colorHex: "#1565C0",
              copiado: false,
              colorBack: "blue darken-3",
              isDark: true,
            },
            {
              colorHex: "#0D47A1",
              copiado: false,
              colorBack: "blue darken-4",
              isDark: true,
            },
            {
              colorHex: "#82B1FF",
              copiado: false,
              colorBack: "blue accent-1",
              isDark: true,
            },
            {
              colorHex: "#448AFF",
              copiado: false,
              colorBack: "blue accent-2",
              isDark: true,
            },
            {
              colorHex: "#2979FF",
              copiado: false,
              colorBack: "blue accent-3",
              isDark: true,
            },
            {
              colorHex: "#2962FF",
              copiado: false,
              colorBack: "blue accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("azulClaro"),
          colorBack: "light-blue",
          cores: [
            {
              colorHex: "#03A9F4",
              copiado: false,
              colorBack: "light-blue",
              isDark: true,
            },
            {
              colorHex: "#E1F5FE",
              copiado: false,
              colorBack: "light-blue lighten-5",
              isDark: false,
            },
            {
              colorHex: "#B3E5FC",
              copiado: false,
              colorBack: "light-blue lighten-4",
            },
            {
              colorHex: "#81D4FA",
              copiado: false,
              colorBack: "light-blue lighten-3",
              isDark: true,
            },
            {
              colorHex: "#4FC3F7",
              copiado: false,
              colorBack: "light-blue lighten-2",
              isDark: true,
            },
            {
              colorHex: "#29B6F6",
              copiado: false,
              colorBack: "light-blue lighten-1",
              isDark: true,
            },
            {
              colorHex: "#039BE5",
              copiado: false,
              colorBack: "light-blue darken-1",
              isDark: true,
            },
            {
              colorHex: "#0288D1",
              copiado: false,
              colorBack: "light-blue darken-2",
              isDark: true,
            },
            {
              colorHex: "#0277BD",
              copiado: false,
              colorBack: "light-blue darken-3",
              isDark: true,
            },
            {
              colorHex: "#01579B",
              copiado: false,
              colorBack: "light-blue darken-4",
              isDark: true,
            },
            {
              colorHex: "#80D8FF",
              copiado: false,
              colorBack: "light-blue accent-1",
              isDark: true,
            },
            {
              colorHex: "#40C4FF",
              copiado: false,
              colorBack: "light-blue accent-2",
              isDark: true,
            },
            {
              colorHex: "#00B0FF",
              copiado: false,
              colorBack: "light-blue accent-3",
              isDark: true,
            },
            {
              colorHex: "#0091EA",
              copiado: false,
              colorBack: "light-blue accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("ciano"),
          colorBack: "cyan",
          cores: [
            {
              colorHex: "#00BCD4",
              copiado: false,
              colorBack: "cyan ",
              isDark: true,
            },
            {
              colorHex: "#E0F7FA",
              copiado: false,
              colorBack: "cyan lighten-5",
              isDark: false,
            },
            {
              colorHex: "#B2EBF2",
              copiado: false,
              colorBack: "cyan lighten-4",
            },
            {
              colorHex: "#80DEEA",
              copiado: false,
              colorBack: "cyan lighten-3",
              isDark: true,
            },
            {
              colorHex: "#4DD0E1",
              copiado: false,
              colorBack: "cyan lighten-2",
              isDark: true,
            },
            {
              colorHex: "#26C6DA",
              copiado: false,
              colorBack: "cyan lighten-1",
              isDark: true,
            },
            {
              colorHex: "#00ACC1",
              copiado: false,
              colorBack: "cyan darken-1",
              isDark: true,
            },
            {
              colorHex: "#0097A7",
              copiado: false,
              colorBack: "cyan darken-2",
              isDark: true,
            },
            {
              colorHex: "#00838F",
              copiado: false,
              colorBack: "cyan darken-3",
              isDark: true,
            },
            {
              colorHex: "#006064",
              copiado: false,
              colorBack: "cyan darken-4",
              isDark: true,
            },
            {
              colorHex: "#84FFFF",
              copiado: false,
              colorBack: "cyan accent-1",
              isDark: false,
            },
            {
              colorHex: "#18FFFF",
              copiado: false,
              colorBack: "cyan accent-2",
              isDark: true,
            },
            {
              colorHex: "#00E5FF",
              copiado: false,
              colorBack: "cyan accent-3",
              isDark: true,
            },
            {
              colorHex: "#00B8D4",
              copiado: false,
              colorBack: "cyan accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("verdeAzulado"),
          colorBack: "teal",
          cores: [
            {
              colorHex: "#009688",
              copiado: false,
              colorBack: "teal",
              isDark: true,
            },
            {
              colorHex: "#E0F2F1",
              copiado: false,
              colorBack: "teal lighten-5",
              isDark: false,
            },
            {
              colorHex: "#B2DFDB",
              copiado: false,
              colorBack: "teal lighten-4",
            },
            {
              colorHex: "#80CBC4",
              copiado: false,
              colorBack: "teal lighten-3",
              isDark: true,
            },
            {
              colorHex: "#4DB6AC",
              copiado: false,
              colorBack: "teal lighten-2",
              isDark: true,
            },
            {
              colorHex: "#26A69A",
              copiado: false,
              colorBack: "teal lighten-1",
              isDark: true,
            },
            {
              colorHex: "#00897B",
              copiado: false,
              colorBack: "teal darken-1",
              isDark: true,
            },
            {
              colorHex: "#00796B",
              copiado: false,
              colorBack: "teal darken-2",
              isDark: true,
            },
            {
              colorHex: "#00695C",
              copiado: false,
              colorBack: "teal darken-3",
              isDark: true,
            },
            {
              colorHex: "#004D40",
              copiado: false,
              colorBack: "teal darken-4",
              isDark: true,
            },
            {
              colorHex: "#A7FFEB",
              copiado: false,
              colorBack: "teal accent-1",
              isDark: false,
            },
            {
              colorHex: "#64FFDA",
              copiado: false,
              colorBack: "teal accent-2",
              isDark: true,
            },
            {
              colorHex: "#1DE9B6",
              copiado: false,
              colorBack: "teal accent-3",
              isDark: true,
            },
            {
              colorHex: "#00BFA5",
              copiado: false,
              colorBack: "teal accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("verde"),
          colorBack: "green",
          cores: [
            {
              colorHex: "#4CAF50",
              copiado: false,
              colorBack: "green",
              isDark: true,
            },
            {
              colorHex: "#E8F5E9",
              copiado: false,
              colorBack: "green lighten-5",
              isDark: false,
            },
            {
              colorHex: "#C8E6C9",
              copiado: false,
              colorBack: "green lighten-4",
            },
            {
              colorHex: "#A5D6A7",
              copiado: false,
              colorBack: "green lighten-3",
              isDark: true,
            },
            {
              colorHex: "#81C784",
              copiado: false,
              colorBack: "green lighten-2",
              isDark: true,
            },
            {
              colorHex: "#66BB6A",
              copiado: false,
              colorBack: "green lighten-1",
              isDark: true,
            },
            {
              colorHex: "#43A047",
              copiado: false,
              colorBack: "green darken-1",
              isDark: true,
            },
            {
              colorHex: "#388E3C",
              copiado: false,
              colorBack: "green darken-2",
              isDark: true,
            },
            {
              colorHex: "#2E7D32",
              copiado: false,
              colorBack: "green darken-3",
              isDark: true,
            },
            {
              colorHex: "#1B5E20",
              copiado: false,
              colorBack: "green darken-4",
              isDark: true,
            },
            {
              colorHex: "#B9F6CA",
              copiado: false,
              colorBack: "green accent-1",
              isDark: false,
            },
            {
              colorHex: "#69F0AE",
              copiado: false,
              colorBack: "green accent-2",
              isDark: true,
            },
            {
              colorHex: "#00E676",
              copiado: false,
              colorBack: "green accent-3",
              isDark: true,
            },
            {
              colorHex: "#00C853",
              copiado: false,
              colorBack: "green accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("verdeClaro"),
          colorBack: "light-green",
          cores: [
            {
              colorHex: "#8BC34A",
              copiado: false,
              colorBack: "light-green",
              isDark: true,
            },
            {
              colorHex: "#F1F8E9",
              copiado: false,
              colorBack: "light-green lighten-5",
              isDark: false,
            },
            {
              colorHex: "#DCEDC8",
              copiado: false,
              colorBack: "light-green lighten-4",
            },
            {
              colorHex: "#C5E1A5",
              copiado: false,
              colorBack: "light-green lighten-3",
              isDark: true,
            },
            {
              colorHex: "#AED581",
              copiado: false,
              colorBack: "light-green lighten-2",
              isDark: true,
            },
            {
              colorHex: "#9CCC65",
              copiado: false,
              colorBack: "light-green lighten-1",
              isDark: true,
            },
            {
              colorHex: "#7CB342",
              copiado: false,
              colorBack: "light-green darken-1",
              isDark: true,
            },
            {
              colorHex: "#689F38",
              copiado: false,
              colorBack: "light-green darken-2",
              isDark: true,
            },
            {
              colorHex: "#558B2F",
              copiado: false,
              colorBack: "light-green darken-3",
              isDark: true,
            },
            {
              colorHex: "#33691E",
              copiado: false,
              colorBack: "light-green darken-4",
              isDark: true,
            },
            {
              colorHex: "#CCFF90",
              copiado: false,
              colorBack: "light-green accent-1",
              isDark: false,
            },
            {
              colorHex: "#B2FF59",
              copiado: false,
              colorBack: "light-green accent-2",
              isDark: true,
            },
            {
              colorHex: "#76FF03",
              copiado: false,
              colorBack: "light-green accent-3",
              isDark: true,
            },
            {
              colorHex: "#64DD17",
              copiado: false,
              colorBack: "light-green accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("lima"),
          colorBack: "lime",
          cores: [
            {
              colorHex: "#CDDC39",
              copiado: false,
              colorBack: "lime",
              isDark: true,
            },
            {
              colorHex: "#F9FBE7",
              copiado: false,
              colorBack: "lime lighten-5",
              isDark: false,
            },
            {
              colorHex: "#F0F4C3",
              copiado: false,
              colorBack: "lime lighten-4",
            },
            {
              colorHex: "#E6EE9C",
              copiado: false,
              colorBack: "lime lighten-3",
              isDark: true,
            },
            {
              colorHex: "#DCE775",
              copiado: false,
              colorBack: "lime lighten-2",
              isDark: true,
            },
            {
              colorHex: "#D4E157",
              copiado: false,
              colorBack: "lime lighten-1",
              isDark: true,
            },
            {
              colorHex: "#C0CA33",
              copiado: false,
              colorBack: "lime darken-1",
              isDark: true,
            },
            {
              colorHex: "#AFB42B",
              copiado: false,
              colorBack: "lime darken-2",
              isDark: true,
            },
            {
              colorHex: "#9E9D24",
              copiado: false,
              colorBack: "lime darken-3",
              isDark: true,
            },
            {
              colorHex: "#827717",
              copiado: false,
              colorBack: "lime darken-4",
              isDark: true,
            },
            {
              colorHex: "#F4FF81",
              copiado: false,
              colorBack: "lime accent-1",
              isDark: false,
            },
            {
              colorHex: "#EEFF41",
              copiado: false,
              colorBack: "lime accent-2",
              isDark: false,
            },
            {
              colorHex: "#C6FF00",
              copiado: false,
              colorBack: "lime accent-3",
              isDark: true,
            },
            {
              colorHex: "#AEEA00",
              copiado: false,
              colorBack: "lime accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("amarelo"),
          colorBack: "yellow",
          cores: [
            {
              colorHex: "#FFEB3B",
              copiado: false,
              colorBack: "yellow",
              isDark: false,
            },
            {
              colorHex: "#FFFDE7",
              copiado: false,
              colorBack: "yellow lighten-5",
              isDark: false,
            },
            {
              colorHex: "#FFF9C4",
              copiado: false,
              colorBack: "yellow lighten-4",
            },
            {
              colorHex: "#FFF59D",
              copiado: false,
              colorBack: "yellow lighten-3",
              isDark: false,
            },
            {
              colorHex: "#FFF176",
              copiado: false,
              colorBack: "yellow lighten-2",
              isDark: false,
            },
            {
              colorHex: "#FFEE58",
              copiado: false,
              colorBack: "yellow lighten-1",
              isDark: false,
            },
            {
              colorHex: "#FDD835",
              copiado: false,
              colorBack: "yellow darken-1",
              isDark: true,
            },
            {
              colorHex: "#FBC02D",
              copiado: false,
              colorBack: "yellow darken-2",
              isDark: true,
            },
            {
              colorHex: "#F9A825",
              copiado: false,
              colorBack: "yellow darken-3",
              isDark: true,
            },
            {
              colorHex: "#F57F17",
              copiado: false,
              colorBack: "yellow darken-4",
              isDark: true,
            },
            {
              colorHex: "#FFFF8D",
              copiado: false,
              colorBack: "yellow accent-1",
              isDark: false,
            },
            {
              colorHex: "#FFFF00",
              copiado: false,
              colorBack: "yellow accent-2",
              isDark: false,
            },
            {
              colorHex: "#FFEA00",
              copiado: false,
              colorBack: "yellow accent-3",
              isDark: false,
            },
            {
              colorHex: "#FFD600",
              copiado: false,
              colorBack: "yellow accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("ambar"),
          colorBack: "amber",
          cores: [
            {
              colorHex: "#FFC107",
              copiado: false,
              colorBack: "amber",
              isDark: true,
            },
            {
              colorHex: "#FFF8E1",
              copiado: false,
              colorBack: "amber lighten-5",
              isDark: false,
            },
            {
              colorHex: "#FFECB3",
              copiado: false,
              colorBack: "amber lighten-4",
            },
            {
              colorHex: "#FFE082",
              copiado: false,
              colorBack: "amber lighten-3",
              isDark: false,
            },
            {
              colorHex: "#FFD54F",
              copiado: false,
              colorBack: "amber lighten-2",
              isDark: true,
            },
            {
              colorHex: "#FFCA28",
              copiado: false,
              colorBack: "amber lighten-1",
              isDark: true,
            },
            {
              colorHex: "#FFB300",
              copiado: false,
              colorBack: "amber darken-1",
              isDark: true,
            },
            {
              colorHex: "#FFA000",
              copiado: false,
              colorBack: "amber darken-2",
              isDark: true,
            },
            {
              colorHex: "#FF8F00",
              copiado: false,
              colorBack: "amber darken-3",
              isDark: true,
            },
            {
              colorHex: "#FF6F00",
              copiado: false,
              colorBack: "amber darken-4",
              isDark: true,
            },
            {
              colorHex: "#FFE57F",
              copiado: false,
              colorBack: "amber accent-1",
              isDark: true,
            },
            {
              colorHex: "#FFD740",
              copiado: false,
              colorBack: "amber accent-2",
              isDark: true,
            },
            {
              colorHex: "#FFC400",
              copiado: false,
              colorBack: "amber accent-3",
              isDark: true,
            },
            {
              colorHex: "#FFAB00",
              copiado: false,
              colorBack: "amber accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("laranja"),
          colorBack: "orange",
          cores: [
            {
              colorHex: "#FF9800",
              copiado: false,
              colorBack: "orange",
              isDark: true,
            },
            {
              colorHex: "#FFF3E0",
              copiado: false,
              colorBack: "orange lighten-5",
              isDark: false,
            },
            {
              colorHex: "#FFE0B2",
              copiado: false,
              colorBack: "orange lighten-4",
            },
            {
              colorHex: "#FFCC80",
              copiado: false,
              colorBack: "orange lighten-3",
              isDark: true,
            },
            {
              colorHex: "#FFB74D",
              copiado: false,
              colorBack: "orange lighten-2",
              isDark: true,
            },
            {
              colorHex: "#FFA726",
              copiado: false,
              colorBack: "orange lighten-1",
              isDark: true,
            },
            {
              colorHex: "#FB8C00",
              copiado: false,
              colorBack: "orange darken-1",
              isDark: true,
            },
            {
              colorHex: "#F57C00",
              copiado: false,
              colorBack: "orange darken-2",
              isDark: true,
            },
            {
              colorHex: "#EF6C00",
              copiado: false,
              colorBack: "orange darken-3",
              isDark: true,
            },
            {
              colorHex: "#E65100",
              copiado: false,
              colorBack: "orange darken-4",
              isDark: true,
            },
            {
              colorHex: "#FFD180",
              copiado: false,
              colorBack: "orange accent-1",
              isDark: true,
            },
            {
              colorHex: "#FFAB40",
              copiado: false,
              colorBack: "orange accent-2",
              isDark: true,
            },
            {
              colorHex: "#FF9100",
              copiado: false,
              colorBack: "orange accent-3",
              isDark: true,
            },
            {
              colorHex: "#FF6D00",
              copiado: false,
              colorBack: "orange accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("laranjaEscuro"),
          colorBack: "deep-orange",
          cores: [
            {
              colorHex: "#FF5722",
              copiado: false,
              colorBack: "deep-orange ",
              isDark: true,
            },
            {
              colorHex: "#FBE9E7",
              copiado: false,
              colorBack: "deep-orange lighten-5",
              isDark: false,
            },
            {
              colorHex: "#FFCCBC",
              copiado: false,
              colorBack: "deep-orange lighten-4",
            },
            {
              colorHex: "#FFAB91",
              copiado: false,
              colorBack: "deep-orange lighten-3",
              isDark: true,
            },
            {
              colorHex: "#FF8A65",
              copiado: false,
              colorBack: "deep-orange lighten-2",
              isDark: true,
            },
            {
              colorHex: "#FF7043",
              copiado: false,
              colorBack: "deep-orange lighten-1",
              isDark: true,
            },
            {
              colorHex: "#F4511E",
              copiado: false,
              colorBack: "deep-orange darken-1",
              isDark: true,
            },
            {
              colorHex: "#E64A19",
              copiado: false,
              colorBack: "deep-orange darken-2",
              isDark: true,
            },
            {
              colorHex: "#D84315",
              copiado: false,
              colorBack: "deep-orange darken-3",
              isDark: true,
            },
            {
              colorHex: "#BF360C",
              copiado: false,
              colorBack: "deep-orange darken-4",
              isDark: true,
            },
            {
              colorHex: "#FF9E80",
              copiado: false,
              colorBack: "deep-orange accent-1",
              isDark: true,
            },
            {
              colorHex: "#FF6E40",
              copiado: false,
              colorBack: "deep-orange accent-2",
              isDark: true,
            },
            {
              colorHex: "#FF3D00",
              copiado: false,
              colorBack: "deep-orange accent-3",
              isDark: true,
            },
            {
              colorHex: "#DD2C00",
              copiado: false,
              colorBack: "deep-orange accent-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("marrom"),
          colorBack: "brown",
          cores: [
            {
              colorHex: "#795548",
              copiado: false,
              colorBack: "brown",
              isDark: true,
            },
            {
              colorHex: "#EFEBE9",
              copiado: false,
              colorBack: "brown lighten-5",
              isDark: false,
            },
            {
              colorHex: "#D7CCC8",
              copiado: false,
              colorBack: "brown lighten-4",
            },
            {
              colorHex: "#BCAAA4",
              copiado: false,
              colorBack: "brown lighten-3",
              isDark: true,
            },
            {
              colorHex: "#A1887F",
              copiado: false,
              colorBack: "brown lighten-2",
              isDark: true,
            },
            {
              colorHex: "#8D6E63",
              copiado: false,
              colorBack: "brown lighten-1",
              isDark: true,
            },
            {
              colorHex: "#6D4C41",
              copiado: false,
              colorBack: "brown darken-1",
              isDark: true,
            },
            {
              colorHex: "#5D4037",
              copiado: false,
              colorBack: "brown darken-2",
              isDark: true,
            },
            {
              colorHex: "#4E342E",
              copiado: false,
              colorBack: "brown darken-3",
              isDark: true,
            },
            {
              colorHex: "#3E2723",
              copiado: false,
              colorBack: "brown darken-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("azulAcidentado"),
          colorBack: "blue-grey",
          cores: [
            {
              colorHex: "#607D8B",
              copiado: false,
              colorBack: "blue-grey",
              isDark: true,
            },
            {
              colorHex: "#ECEFF1",
              copiado: false,
              colorBack: "blue-grey lighten-5",
              isDark: false,
            },
            {
              colorHex: "#CFD8DC",
              copiado: false,
              colorBack: "blue-grey lighten-4",
            },
            {
              colorHex: "#B0BEC5",
              copiado: false,
              colorBack: "blue-grey lighten-3",
              isDark: true,
            },
            {
              colorHex: "#90A4AE",
              copiado: false,
              colorBack: "blue-grey lighten-2",
              isDark: true,
            },
            {
              colorHex: "#78909C",
              copiado: false,
              colorBack: "blue-grey lighten-1",
              isDark: true,
            },
            {
              colorHex: "#546E7A",
              copiado: false,
              colorBack: "blue-grey darken-1",
              isDark: true,
            },
            {
              colorHex: "#455A64",
              copiado: false,
              colorBack: "blue-grey darken-2",
              isDark: true,
            },
            {
              colorHex: "#37474F",
              copiado: false,
              colorBack: "blue-grey darken-3",
              isDark: true,
            },
            {
              colorHex: "#263238",
              copiado: false,
              colorBack: "blue-grey darken-4",
              isDark: true,
            },
          ],
        },

        {
          // col
          title: this.$t("cinza"),
          colorBack: "grey",
          cores: [
            {
              colorHex: "#9E9E9E",
              copiado: false,
              colorBack: "grey ",
              isDark: true,
            },
            {
              colorHex: "#FAFAFA",
              copiado: false,
              colorBack: "grey lighten-5",
              isDark: false,
            },
            {
              colorHex: "#F5F5F5",
              copiado: false,
              colorBack: "grey lighten-4",
            },
            {
              colorHex: "#EEEEEE",
              copiado: false,
              colorBack: "grey lighten-3",
              isDark: false,
            },
            {
              colorHex: "#E0E0E0",
              copiado: false,
              colorBack: "grey lighten-2",
              isDark: true,
            },
            {
              colorHex: "#BDBDBD",
              copiado: false,
              colorBack: "grey lighten-1",
              isDark: true,
            },
            {
              colorHex: "#757575",
              copiado: false,
              colorBack: "grey darken-1",
              isDark: true,
            },
            {
              colorHex: "#616161",
              copiado: false,
              colorBack: "grey darken-2",
              isDark: true,
            },
            {
              colorHex: "#424242",
              copiado: false,
              colorBack: "grey darken-3",
              isDark: true,
            },
            {
              colorHex: "#212121",
              copiado: false,
              colorBack: "grey darken-4",
              isDark: true,
            },
          ],
        },
      ];
    },
  },

  head() {
    return {
      title: this.$t("paletaCores"),
      meta: [
        { name: "description", content: this.$t("paletaCoresDescricaoSeo") },
        { name: "keywords", content: "cor, color, pallete, paleta, hex" },

        // open graph facebook
        {
          property: "og:url",
          content: "https://facilitetudo.com.br" + this.$route.fullPath,
        },
        { property: "og:type", content: this.$t("ferramentas") },
        { property: "og:title", content: this.$t("paletaCores") },
        {
          property: "og:description",
          content: this.$t("paletaCoresDescricaoSeo"),
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
        { property: "twitter:title", content: this.$t("paletaCores") },
        {
          property: "twitter:description",
          content: this.$t("paletaCoresDescricaoSeo"),
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
