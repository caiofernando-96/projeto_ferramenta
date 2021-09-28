<template>
  <TemplateInterno
    :titulo="$t('formatadorOnline')"
    :descricao="$t('formatadorOnlineDescricao')"
    :temerro="error"
    :erro-texto="erroDescricao"
  >
    <template #conteudo>
      <v-card id="formatador" flat style="overflow: hidden">
        <v-tabs
          v-model="tipoProgramacao"
          dense
          fixed-tabs
          :background-color="$vuetify.theme.isDark ? null : '#f5f5f5'"
        >
          <v-tab
            v-for="item in editoresDisponiveis"
            :key="item.title"
            :href="'#' + item.aceCode"
          >
            <v-icon left>{{ item.icone }}</v-icon>
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </v-card>

      <v-row align="center">
        <v-col md="12" lg="12" cols="12">
          <v-card elevation="15" color="#161616">
            <v-card-text>
              <v-row style="height: 43px" class="pa-0">
                <v-col md="6" class="pa-0">
                  <v-menu
                    v-model="menuOpcoes"
                    :close-on-content-click="false"
                    :nudge-width="200"
                    offset-x
                    transition="scale-transition"
                    origin="top left"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-fab-transition>
                        <v-btn
                          v-show="temConfig"
                          v-bind="attrs"
                          icon
                          dark
                          v-on="on"
                        >
                          <v-icon>mdi-cog</v-icon>
                        </v-btn>
                      </v-fab-transition>
                    </template>

                    <v-card>
                      <v-list>
                        <v-subheader>{{
                          $t("opcoes").toUpperCase()
                        }}</v-subheader>
                        <template v-for="(opcoes, i) in ListaOpcoes">
                          <div v-if="i === tipoProgramacao" :key="i">
                            <template v-for="(lista, i2) in opcoes">
                              <template v-if="lista.type == 'switch'">
                                <v-list-item
                                  v-if="!lista.opcoes.length"
                                  :key="i2"
                                >
                                  <v-switch
                                    v-model="lista.model"
                                    hide-details
                                    color="primary"
                                    :label="lista.title"
                                  ></v-switch>
                                </v-list-item>
                                <v-list-item v-else :key="i2">
                                  <v-row>
                                    <v-col md="12">
                                      <v-switch
                                        v-model="lista.model"
                                        hide-details
                                        color="primary"
                                        :label="lista.title"
                                      ></v-switch>
                                      <template
                                        v-for="(opcoes2, i3) in lista.opcoes2"
                                      >
                                        <v-checkbox
                                          :key="i3"
                                          v-model="opcoes2.model"
                                          :disabled="!lista.model"
                                          class="ml-12"
                                          hide-details
                                          :label="opcoes2.title"
                                          :value="lista.value"
                                        ></v-checkbox>
                                      </template>
                                    </v-col>
                                  </v-row>
                                </v-list-item>
                              </template>
                            </template>
                          </div>
                        </template>
                      </v-list>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text color="primary" @click="menuOpcoes = false"
                          >Fechar</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-col>
                <v-col md="6" align="right" class="pa-0">
                  <v-btn
                    v-if="!copiado"
                    dark
                    icon
                    :disabled="!codeEditor"
                    @click="CopiarTexto"
                  >
                    <v-icon>mdi-content-copy</v-icon>
                  </v-btn>
                  <v-chip v-else class="ma-2" color="success" label>
                    <v-icon left>mdi-check</v-icon>
                    {{ $t("copiado") }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-card-text>
            <client-only>
              <ace-editor
                ref="EditorRef"
                v-model="codeEditor"
                v-bind="EditorOptions"
                height="500"
                @init="editorInit"
              />
            </client-only>

            <v-card-actions style="height: 60px">
              <v-btn color="success" :disabled="!codeEditor" @click="Formatar">
                <v-icon left>mdi-check</v-icon>
                {{ $t("formatar") }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-scroll-x-transition>
                <v-btn v-show="codeEditor" dark icon @click="Limpar">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-scroll-x-transition>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </TemplateInterno>
</template>
<script>
import TemplateInterno from "@/components/TemplateInterno";

import prettier from "prettier/standalone";
import parseHtml from "prettier/parser-html";
// import parseAngular from 'prettier/parser-angular'
import parsePostCss from "prettier/parser-postcss";
import parseBabel from "prettier/parser-babel";
import parseTypeScript from "prettier/parser-typescript";
import parsePHP from "@prettier/plugin-php";
import parserGraphql from "prettier/parser-graphql";
import parserMarkdown from "prettier/parser-markdown";

export default {
  name: "HtmlFormat",
  components: {
    TemplateInterno,
  },

  data() {
    return {
      inputTexto: null,
      copiado: false,
      alterado: false,
      tipoProgramacao: "html",
      error: false,
      menuOpcoes: false,
      erroDescricao: null,

      ListaOpcoes: {
        json: [
          {
            title: this.$t("formatarJson5"),
            model: false,
            type: "switch",
            opcoes: [
              {
                title: "Single Quote",
                model: false,
                type: "checkbox",
                value: "singleQuote",
              },
            ],
          },
          {
            title: this.$t("formatarStringfy"),
            model: false,
            type: "switch",
            opcoes: [], // obrigatório
          },
        ],
      },

      editoresDisponiveis: [
        {
          title: "html",
          icone: "mdi-language-html5",
          aceCode: "html",
        },
      ],

      editoresDisponiveisMais: [
        {
          title: "Angular",
          icone: "mdi-angular",
          aceCode: "angular",
        },
        {
          title: "Scss",
          icone: "mdi-sass",
          aceCode: "scss",
        },
        {
          title: "Less",
          icone: "mdi-less-than",
          aceCode: "less",
        },
        {
          title: "GraphQl",
          icone: "mdi-graphql",
          aceCode: "graphqlschema",
        },
        {
          title: "Markdown",
          icone: "mdi-language-markdown",
          aceCode: "markdown",
        },
        {
          title: "Yaml",
          icone: "mdi-file-document-outline",
          aceCode: "yaml",
        },
      ],

      codeEditor: this.$t("codeEditorTexto"),
      EditorOptions: {
        theme: "chaos",
        lang: "html",
      },
    };
  },

  computed: {
    aceEditor() {
      return this.$refs.EditorRef.editor;
    },
    temConfig() {
      // checa se existe opcoes para a determinada lingua selecionada
      return this.checkConfig(this.ListaOpcoes, this.tipoProgramacao);
    },
  },
  watch: {
    tipoProgramacao() {
      this.modoEditor();
    },
    "ListaOpcoes.json.0.model"(value) {
      // verifica por alteracoes - JSON5
      if (value) {
        // se o json5 estiver ativo
        if (this.ListaOpcoes.json[1].model)
          // verifica se esta ativo o stringfy
          this.ListaOpcoes.json[1].model = false; // seta o stringfy para falso
      }
    },
    "ListaOpcoes.json.1.model"(value) {
      // verifica por alteracoes - STRINGFY
      if (value) {
        // se o stringfy estiver ativo
        if (this.ListaOpcoes.json[0].model)
          // verifica se esta ativo o json5
          this.ListaOpcoes.json[0].model = false; // seta o json5 para falso
      }
    },

    "$route.query.editor"(value) {
      if (!value) return false;

      if (this.ProcurarChave(this.editoresDisponiveis, value).length) {
        this.tipoProgramacao = value;
      } else if (
        this.ProcurarChave(this.editoresDisponiveisMais, value).length
      ) {
        this.addItem(
          this.ProcurarChave(this.editoresDisponiveisMais, value)[0]
        );
        this.tipoProgramacao = value;
      }
    },
  },
  methods: {
    checkConfig(obj, key) {
      return Object.keys(obj).includes(key);
    },
    ProcurarChave(arr, searchKey) {
      return arr.filter((obj) =>
        Object.keys(obj).some((key) => obj[key].includes(searchKey))
      );
    },
    addItem(item) {
      const removed = this.editoresDisponiveis.splice(0, 1);
      this.editoresDisponiveis.push(
        ...this.editoresDisponiveisMais.splice(
          this.editoresDisponiveisMais.indexOf(item),
          1
        )
      );
      this.editoresDisponiveisMais.push(...removed);
      this.$nextTick(() => {
        this.tipoProgramacao = item.aceCode;
      });
    },
    Limpar() {
      this.codeEditor = "";
    },
    CopiarTexto() {
      this.$copyText(this.codeEditor).then(
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
    Formatar() {
      if (!this.codeEditor) return;

      if (this.tipoProgramacao === "javascript") {
        try {
          this.codeEditor = prettier.format(this.codeEditor, {
            parser: "typescript",
            plugins: [parseTypeScript],
          });
        } catch (error) {
          this.error = true;
          this.erroDescricao =
            "Ouve um erro ao formatar, tem certeza que é a lingua certa?";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else if (this.tipoProgramacao === "html") {
        try {
          this.codeEditor = prettier.format(this.codeEditor, {
            parser: "html",
            plugins: [parseHtml],
          });
        } catch (error) {
          this.error = true;
          this.erroDescricao =
            "Ouve um erro ao formatar, tem certeza que é a lingua certa?";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else if (this.tipoProgramacao === "css") {
        try {
          this.codeEditor = prettier.format(this.codeEditor, {
            parser: "css",
            plugins: [parsePostCss],
          });
        } catch (error) {
          this.error = true;
          this.erroDescricao =
            "Ouve um erro ao formatar, tem certeza que é a lingua certa?";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else if (this.tipoProgramacao === "json") {
        try {
          let formato = "json";
          let singleQuote = false;

          if (this.ListaOpcoes.json[0].model) {
            // json5
            formato = "json5";
            if (this.ListaOpcoes.json[0].opcoes[0].model)
              // verifica se esta ativo o single quote
              singleQuote = true; // seta o single quote para true
          } else if (this.ListaOpcoes.json[1].model) {
            // stringfy
            formato = "json-stringify";
          }

          this.codeEditor = prettier.format(this.codeEditor, {
            // trailingComma: 'es5',
            singleQuote,
            parser: formato,
            plugins: [parseBabel],
          });
        } catch (error) {
          this.error = true;
          this.erroDescricao =
            "Ouve um erro ao formatar, tem certeza que é a lingua certa?";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else if (this.tipoProgramacao === "XML") {
        try {
          this.codeEditor = prettier.format(this.codeEditor, {
            parser: "html",
            plugins: [parseHtml],
          });
        } catch (error) {
          this.error = true;
          this.erroDescricao =
            "Ouve um erro ao formatar, tem certeza que é a lingua certa?";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else if (this.tipoProgramacao === "vue") {
        try {
          this.codeEditor = prettier.format(this.codeEditor, {
            parser: "vue",
            plugins: [parseHtml],
          });
        } catch (error) {
          this.error = true;
          this.erroDescricao =
            "Ouve um erro ao formatar, tem certeza que é a lingua certa?";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else if (this.tipoProgramacao === "php") {
        try {
          this.codeEditor = prettier.format(this.codeEditor, {
            parser: "php",
            plugins: [parsePHP],
          });
        } catch (error) {
          this.error = true;
          this.erroDescricao =
            "Ouve um erro ao formatar, tem certeza que é a lingua certa?";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else if (this.tipoProgramacao === "angular") {
        try {
          this.codeEditor = prettier.format(this.codeEditor, {
            parser: "angular",
            plugins: [parseHtml],
          });
        } catch (error) {
          this.error = true;
          this.erroDescricao =
            "Ouve um erro ao formatar, tem certeza que é a lingua certa?";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else if (this.tipoProgramacao === "scss") {
        try {
          this.codeEditor = prettier.format(this.codeEditor, {
            parser: "scss",
            plugins: [parsePostCss],
          });
        } catch (error) {
          this.error = true;
          this.erroDescricao =
            "Ouve um erro ao formatar, tem certeza que é a lingua certa?";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else if (this.tipoProgramacao === "less") {
        try {
          this.codeEditor = prettier.format(this.codeEditor, {
            parser: "less",
            plugins: [parsePostCss],
          });
        } catch (error) {
          this.error = true;
          this.erroDescricao =
            "Ouve um erro ao formatar, tem certeza que é a lingua certa?";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else if (this.tipoProgramacao === "graphqlschema") {
        try {
          this.codeEditor = prettier.format(this.codeEditor, {
            parser: "graphql",
            plugins: [parserGraphql],
          });
        } catch (error) {
          this.error = true;
          this.erroDescricao =
            "Ouve um erro ao formatar, tem certeza que é a lingua certa?";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else if (this.tipoProgramacao === "markdown") {
        try {
          this.codeEditor = prettier.format(this.codeEditor, {
            parser: "markdown",
            plugins: [parserMarkdown],
          });
        } catch (error) {
          this.error = true;
          this.erroDescricao =
            "Ouve um erro ao formatar, tem certeza que é a lingua certa?";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else if (this.tipoProgramacao === "yaml") {
        try {
          this.codeEditor = prettier.format(this.codeEditor, {
            parser: "markdown",
            plugins: [parserMarkdown],
          });
        } catch (error) {
          this.error = true;
          this.erroDescricao =
            "Ouve um erro ao formatar, tem certeza que é a lingua certa?";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      }
    },
    modoEditor() {
      if (this.tipoProgramacao === "vue") this.EditorOptions.lang = "html";
      else if (this.tipoProgramacao === "angular")
        this.EditorOptions.lang = "html";
      else this.EditorOptions.lang = this.tipoProgramacao;
    },
    editorInit(editor) {
      require("brace/ext/language_tools");

      require("brace/mode/html");
      require("brace/mode/javascript");
      require("brace/mode/typescript");
      require("brace/mode/xml");
      require("brace/mode/css");
      require("brace/mode/scss");
      require("brace/mode/json");
      require("brace/mode/less");
      require("brace/mode/php");
      require("brace/mode/graphqlschema");
      require("brace/mode/markdown");
      require("brace/mode/yaml");

      require("brace/theme/chaos");
      require("brace/snippets/javascript"); // snippet
      require("brace/snippets/html"); // snippet
      require("brace/snippets/css"); // snippet
      require("brace/snippets/text"); // snippet
      require("brace/snippets/xml"); // snippet
      require("brace/snippets/json"); // snippet
      require("brace/snippets/php"); // snippet
      require("brace/snippets/scss"); // snippet
      require("brace/snippets/less"); // snippet
      require("brace/snippets/graphqlschema"); // snippet
      require("brace/snippets/markdown"); // snippet
      require("brace/snippets/yaml"); // snippet

      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
      });
    },
  },

  head() {
    return {
      title: this.$t("formatadorCodigos"),
      meta: [
        { name: "description", content: this.$t("formatadorCodigosDescricao") },
        {
          name: "keywords",
          content:
            "formatador, formatar, formatter, online formatter, code, html, css, js, javascript, scss, vue, markdow, php, less, angular, yaml, xml, json",
        },

        // open graph facebook
        {
          property: "og:url",
          content: "https://facilitetudo.com.br" + this.$route.fullPath,
        },
        { property: "og:type", content: this.$t("ferramentas") },
        { property: "og:title", content: this.$t("formatadorCodigos") },
        {
          property: "og:description",
          content: this.$t("formatadorCodigosDescricao"),
        },
        {
          property: "og:image",
          content: require("@/assets/fotos/formatador-code.jpg"),
        },

        // twitter
        { property: "twitter:card", content: "summary" },
        {
          property: "twitter:url",
          content: "https://facilitetudo.com.br" + this.$route.fullPath,
        },
        { property: "twitter:title", content: this.$t("formatadorCodigos") },
        {
          property: "twitter:description",
          content: this.$t("formatadorCodigosDescricao"),
        },
        {
          property: "twitter:image",
          content: require("@/assets/fotos/formatador-code.jpg"),
        },
      ],
    };
  },
};
</script>
