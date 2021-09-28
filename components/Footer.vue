<template>
  <v-footer padless obsolute bottom="0">
    <v-card class="text-center" color="primary" width="100%" tile>
      <v-card-text class="white--text">
        <v-row>
          <v-col md="6" lg="6" xl="6" cols="12">
            <strong>Desenvolvido por Caio</strong> -
            {{ new Date().getFullYear() }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        {
          icon: "mdi-home",
          link: this.localePath("index"),
        },
      ],
      sociais: [
        {
          icon: "mdi-instagram",
          link: "#",
        },
        {
          icon: "mdi-facebook",
          link: "#",
        },
      ],
    };
  },
};
</script>
