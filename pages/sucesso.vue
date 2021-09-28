<template>
  <v-container style="height: 250px">
    <v-row align="center" class="fill-height">
      <v-col align="center">
        <v-card color="success" dark max-width="600px" shaped>
          <v-icon class="pt-4" large>mdi-check-circle</v-icon>
          <v-card-title class="justify-center">
            {{ $t("obrigadoContato") }}
          </v-card-title>
          <v-btn icon :to="{ name: 'Home' }" class="mb-4" exact>
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
