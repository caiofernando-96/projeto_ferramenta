<template>
  <v-container style="height: 600px" class="mt-16">
    <v-row align="center" height="100%">
      <v-col>
        <h3 class="font-weight-light text-h5 mb-10">
          Lista de ferramentas disponíveis
        </h3>

        <v-text-field
          v-show="false"
          v-model="search"
          class="mt-10"
          :placeholder="$t('pesquisarFerramenta')"
          solo-inverted
          rounded
          dense
          hide-details
          style="max-width: 300px"
          flat
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>

        <v-row v-if="!search">
          <template v-for="card in Links">
            <v-col
              v-for="(coluna, i) in card.colunas"
              :key="i"
              md="4"
              lg="4"
              xl="4"
              cols="12"
            >
              <v-card
                v-for="(list, i2) in coluna.cards"
                :key="i2"
                outlined
                class="mt-5"
                shaped
                style="overflow: hidden"
              >
                <v-list class="pt-0 pb-0">
                  <h4
                    style="
                      padding: 15px;
                      background-color: #1976d2;
                      color: white;
                    "
                  >
                    {{ list.section }}
                  </h4>
                  <hr />
                  <template v-for="(item, i3) in list.itens">
                    <v-list-item
                      :key="item.title"
                      :nuxt="true"
                      link
                      :to="localePath(item.to)"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.title"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider
                      v-if="i + 1 < list.itens.length"
                      :key="i3"
                    ></v-divider>
                  </template>
                </v-list>
              </v-card>
            </v-col>
          </template>
        </v-row>

        <v-card
          v-if="search && filterFerramentas.length"
          outlined
          class="mt-5"
          shaped
          style="overflow: hidden"
        >
          <v-list class="pt-0 pb-0">
            <h4 style="padding: 15px; background-color: #1976d2; color: white">
              {{ $t("resultado") }}
            </h4>
            <v-list-item
              v-for="(itens, i) in filterFerramentas"
              :key="i"
              link
              :to="localePath(itens.to)"
              :nuxt="true"
            >
              <v-list-item-content>
                <v-list-item-title v-text="itens.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
        </v-card>
        <v-alert
          v-else-if="search && !filterFerramentas.length"
          class="mt-5"
          dense
          type="info"
          max-width="600px"
          >{{ $t("resultadoNEncontrado") }}</v-alert
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    // usado function para usar o this
    return {
      search: null,
    };
  },
  computed: {
    filterFerramentas() {
      if (this.search) {
        // console.log(this.Links[0].colunas);
        const result = [];
        for (const obj in this.Links[0].colunas) {
          for (const obj2 in this.Links[0].colunas[obj].cards) {
            this.Links[0].colunas[obj].cards[obj2].itens.filter((tool) => {
              if (
                tool.title.toLowerCase().includes(this.search.toLowerCase())
              ) {
                result.push(tool);
              }
            });
          }
        }
        return result;

        // return this.Links
      } else {
        return this.Links;
      }
    },

    Links() {
      return [
        {
          colunas: [
            {
              cards: [
                {
                  section: this.$i18n.t("utilidadesTexto"),
                  itens: [
                    {
                      title: this.$i18n.t("converterTextoMaiusculo"),
                      to: "conversores-conversor-textos",
                    },
                    {
                      title: this.$i18n.t("converterTextoMinusculo"),
                      to: "conversores-conversor-textos",
                    },
                    {
                      title: this.$i18n.t("primeiraLetraCadaPalavraMaiusculo"),
                      to: "conversores-conversor-textos",
                    },
                    {
                      title: this.$i18n.t("textoRasurado"),
                      to: "utilidades-texto-tachado",
                    },
                    {
                      title: this.$i18n.t("textoSublinhado"),
                      to: "utilidades-texto-tachado",
                    },
                  ],
                },
              ],
            },
            {
              cards: [
                {
                  section: "Formatador",
                  itens: [
                    {
                      title: this.$i18n.t("formatar") + " HTML",
                      to: "formatadores-formatador-codigos",
                      query: "html",
                    },
                  ],
                },
                /* {
                section: "Conversores",
                itens: [
                  {
                    title: "Converter csv to html",
                    to: "csvToHtml"
                  }
                ]
              } */
              ],
            },
            {
              cards: [
                {
                  section: "Codificador ou Decodificador",
                  itens: [
                    {
                      title:
                        this.$i18n.t("codificarDecodificar") +
                        " Código Binário",
                      to: "codificadores-codificar-decodificar-codigo-binario",
                    },
                  ],
                },
                {
                  section: "Design",
                  itens: [
                    {
                      title: this.$i18n.t("paletaCoresHome"),
                      to: "design-paleta-cores",
                    },
                    {
                      title: "Color Picker",
                      to: "design-color-picker",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
    },
  },
  /* methods: {
    checarRota(rota, query = null) {
      if (this.$route.name !== rota) {
        this.$router.push({ name: rota });
      } else {
        document.getElementById("formatador").scrollIntoView();
        if (this.$route.query.editor !== query) {
          this.$router.push({ name: rota, query: { editor: query } });
        }
      }
    },
  }, */
};
</script>
