<template>
  <v-card flat tile>
    <v-toolbar color="primary" dark extended flat height="100px">
      <nuxt-link :to="localePath('index')" class="toolbar-title">
        <v-toolbar-title>{{ $t("TituloSite") }}</v-toolbar-title>
      </nuxt-link>
    </v-toolbar>

    <v-card
      class="mx-auto cardContainer"
      max-width="1200"
      :style="styleReaction"
    >
      <v-toolbar flat>
        <v-toolbar-title class="grey--text">{{ titulo }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn v-if="$vuetify.breakpoint.name !== 'xs'" icon href="#content">
          <v-icon>mdi-tools</v-icon>
        </v-btn>

        <v-menu
          v-if="$vuetify.breakpoint.name === 'xs'"
          v-model="MaisInfoMobile"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
          transition="scale-transition"
          origin="right top"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon dark small v-bind="attrs" class="ml-5" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-divider></v-divider>

            <v-card-actions>
              <v-btn icon @click="ToggleDarkMode">
                <v-icon>{{
                  $vuetify.theme.dark
                    ? "mdi mdi-brightness-4"
                    : "mdi mdi-brightness-7"
                }}</v-icon>
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn text @click="MaisInfoMobile = false">{{
                $t("fechar")
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-btn
          v-if="$vuetify.breakpoint.name !== 'xs'"
          icon
          @click="ToggleDarkMode"
        >
          <v-icon>{{
            $vuetify.theme.dark
              ? "mdi mdi-brightness-4"
              : "mdi mdi-brightness-7"
          }}</v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text>
        <h2 class="text-h5 font-weight-light mb-16">{{ descricao }}</h2>

        <v-alert
          v-show="temerro"
          dense
          text
          type="error"
          class="mb-16"
          transition="fade-transition"
          >{{ erroTexto }}</v-alert
        >

        <!--  ENTRADA DO CONTEUDO CHILD -->
        <slot name="conteudo" />
        <!-- FIM - ENTRADA DO CONTEUDO  -->
        <div v-show="false" class="mt-5">
          {{ $t("obrigadoUtilizarTexto") }}
          <v-icon color="red">mdi-heart</v-icon>
          <v-row align="center">
            <v-col cols="12" align="center">
              <h2 class="text-h6 mt-5 font-weight-light">
                O que achou dessa ferramenta?
              </h2>
              <client-only>
                <vue-feedback-reaction
                  v-model="FeedBack"
                  :labels="[
                    'Péssimo',
                    'Muito ruim',
                    'Razoável',
                    'Bom',
                    'Muito bom',
                  ]"
                />
              </client-only>
            </v-col>
          </v-row>
        </div>

        <v-alert
          v-if="sucesso && !FeedBack"
          dense
          text
          type="success"
          transition="fade-transition"
          >{{ sucessoMsg }}</v-alert
        >
        <v-card
          v-if="FeedBack && mostrarFeedback"
          style="background-color: white"
          light
        >
          <v-card-text>
            <h2 class="text-h5 font-weight-light">
              Porque achou essa ferramenta {{ EmoticonSelecionado }} ?
            </h2>
            <h4 v-if="FeedBack === '1'" class="text-h6 font-weight-light">
              Nos diga por que achou Péssimo para que possamos melhorar.
            </h4>
            <h4 v-else-if="FeedBack === '2'" class="text-h6 font-weight-light">
              Nos diga por que achou Muito ruim para que possamos melhorar.
            </h4>
            <h4 v-else-if="FeedBack === '3'" class="text-h6 font-weight-light">
              Nos diga por que achou Razoável para que possamos melhorar.
            </h4>
            <h4 v-else-if="FeedBack === '4'" class="text-h6 font-weight-light">
              Nos diga por que achou bom e não muito bom para que possamos
              melhorar.
            </h4>
            <h4 v-else-if="FeedBack === '5'" class="text-h6 font-weight-light">
              Que bom que nossa ferramenta te ajudou 😊, nos diga se precisamos
              melhorar em algo
            </h4>

            <v-form
              v-if="FeedBack"
              ref="form"
              v-model="valid"
              dark
              name="feedback"
              method="post"
              class="mt-5"
              lazy-validation
              netlify
              data-netlify-honeypot="bot-field"
              @submit.prevent="submit"
            >
              <input type="hidden" name="form-name" value="feedback" />
              <input
                type="text"
                name="pagina"
                :value="$route.fullPath"
                style="opacity: 0"
              />
              <input
                type="text"
                name="escolha"
                :value="FeedBack"
                style="opacity: 0"
              />
              <input name="bot-field" hidden />

              <v-text-field
                id="nome"
                v-model="formData.name"
                outlined
                :counter="30"
                :rules="nameRules"
                label="Nome"
                required
                name="name"
                type="text"
              ></v-text-field>

              <v-text-field
                id="email"
                v-model="formData.email"
                outlined
                :rules="emailRules"
                label="E-mail"
                required
                name="email"
                type="email"
              ></v-text-field>
              <v-textarea
                id="mensagem"
                v-model="formData.mensagem"
                label="Deixe sua mensagem"
                outlined
                required
                name="mensagem"
                :rules="textareaRules"
              >
              </v-textarea>
              <v-card-actions>
                <v-btn type="submit" :disabled="!valid" color="success">
                  Enviar</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="FeedBack = null">
                  Cancelar</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-card>
</template>
<script>
export default {
  scrollToTop: true,

  props: {
    titulo: {
      type: String,
      default: null,
    },
    descricao: {
      type: String,
      default: null,
    },

    temerro: {
      type: Boolean,
      default: false,
    },
    erroTexto: {
      type: String,
      default: null,
    },
    mostrarFeedback: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    FeedBack: "",
    IdiomaTrocar: false,
    sucessoMsg: null,
    sucesso: false,
    MaisInfoMobile: false,

    valid: true,
    formData: {},
    nameRules: [
      (v) => !!v || "Por favor, Coloque seu nome",
      (v) => (v && v.length <= 30) || "Máximo 20 caracteres!",
    ],
    emailRules: [
      (v) => !!v || "Por favor. Coloque seu Email",
      (v) => /.+@.+\..+/.test(v) || "Email tem que ser válido!",
    ],
    textareaRules: [(v) => !!v || "Por favor. Escreva uma mensagem!"],
  }),

  computed: {
    idiomas() {
      return [
        {
          title: this.$t("portugues"),
          value: "pt",
          disabled: this.$i18n.locale === "pt",
        },
        {
          title: this.$t("ingles"),
          value: "en",
          disabled: this.$i18n.locale === "en",
        },
      ];
    },
    EmoticonSelecionado() {
      return this.FeedBack === "1"
        ? "Péssimo 😰"
        : this.FeedBack === "2"
        ? "Muito ruim 😢"
        : this.FeedBack === "3"
        ? "Razoável 🥺"
        : this.FeedBack === "4"
        ? "Bom 🙂"
        : this.FeedBack === "5"
        ? "Muito bom 😀"
        : "";
    },
    styleReaction() {
      return {
        background:
          this.FeedBack === "1"
            ? "rgb(255 0 0 / 39%)"
            : this.FeedBack === "2"
            ? "rgb(241 114 0 / 51%)"
            : this.FeedBack === "3"
            ? "rgb(227 154 40 / 69%)"
            : this.FeedBack === "4"
            ? "rgb(17 170 80 / 69%)"
            : this.FeedBack === "5"
            ? "rgb(25 118 210 / 58%)"
            : "",
        transition: "all 500ms linear",
      };
    },
  },

  mounted() {
    if (this.$cookies.get("isDark") === true) {
      this.$vuetify.theme.dark = this.$cookies.get("isDark");
    } else {
      this.$vuetify.theme.dark = false;
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start();

      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },

  methods: {
    irHome() {
      this.$router.push("/");
    },
    alterarLingua(lang) {
      this.$i18n.locale = lang;
      this.$router.push({
        name: this.$route.name,
        params: { lang },
        replace: true,
      });
      this.IdiomaTrocar = false;
    },
    ToggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

      this.IdiomaTrocar = false;
      this.MaisInfoMobile = false;

      this.$nextTick(() => {
        this.$cookies.set("isDark", this.$vuetify.theme.dark);
      });
    },

    encode(data) {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    },
    validate() {
      this.$refs.form.validate();
    },

    reset() {
      this.$refs.form.reset();
    },
    submit(e) {
      this.validate();
      if (!this.$refs.form.validate()) {
        e.preventDefault();
        return false;
      } else {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: this.encode({
            "form-name": e.target.getAttribute("name"),
            ...this.formData,
          }),
        })
          .then(() => {
            this.reset();
            this.sucesso = true;
            this.sucessoMsg =
              "Recebemos sua mensagem, obrigado por tornar essa ferramenta melhor 😀";
            this.FeedBack = null;
          })
          .catch((error) => alert(error));
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
<style>
.toolbar-title {
  color: white !important;
  text-decoration: none;
}
.cardContainer {
  position: relative;
  animation: animation 0.5s;
  animation-fill-mode: forwards;
}
@keyframes animation {
  from {
    top: 0px;
  }
  to {
    top: -64px;
  }
}
</style>
