<template>
  <TemplateInterno
    :titulo="$t('entreContato')"
    :descricao="$t('preenchaForm')"
    :mostrar-feedback="false"
  >
    <template #conteudo>
      <v-alert
        v-if="sucesso"
        dense
        text
        type="success"
        transition="fade-transition"
        >{{ sucessoMsg }}</v-alert
      >

      <v-form
        ref="form"
        v-model="valid"
        name="contato"
        method="post"
        class="mt-16"
        lazy-validation
        netlify
        data-netlify-honeypot="bot-field"
        @submit.prevent="submit"
      >
        <input type="hidden" name="form-name" value="contato" />
        <input name="bot-field" hidden />

        <v-text-field
          id="nome"
          v-model="formData.name"
          outlined
          :counter="30"
          :rules="nameRules"
          :label="$t('nome')"
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
          :label="$t('deixeMensagem')"
          outlined
          required
          name="mensagem"
          :rules="textareaRules"
        >
        </v-textarea>
        <v-btn type="submit" :disabled="!valid" color="primary">
          {{ $t("enviar") }}</v-btn
        >
      </v-form>
    </template>
  </TemplateInterno>
</template>

<script>
import TemplateInterno from "@/components/TemplateInterno";

export default {
  components: {
    TemplateInterno,
  },
  data() {
    return {
      valid: true,
      formData: {},
      sucessoMsg: null,
      sucesso: false,
      nameRules: [
        (v) => !!v || this.$t("campoObrigatorioNome"),
        (v) => (v && v.length <= 30) || "Max 20 caracteres (Characters)!",
      ],
      emailRules: [
        (v) => !!v || this.$t("campoObrigatorioEmail"),
        (v) => /.+@.+\..+/.test(v) || this.$t("emailvalido"),
      ],
      textareaRules: [(v) => !!v || this.$t("escrevaMensagem")],
    };
  },

  methods: {
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
  head() {
    return {
      title: this.$t("entreContato"),
      meta: [
        { name: "description", content: this.$t("descricaoContatoSEO") },
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
        { property: "og:title", content: this.$t("entreContato") },
        {
          property: "og:description",
          content: this.$t("descricaoContatoSEO"),
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
        { property: "twitter:title", content: this.$t("entreContato") },
        {
          property: "twitter:description",
          content: this.$t("descricaoContatoSEO"),
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
