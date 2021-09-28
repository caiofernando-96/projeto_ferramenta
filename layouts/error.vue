<template>
  <div class="container">
    <div v-if="error.statusCode === 404">
      <h1>Página não encontrada</h1>
      <p>{{ error.message }}</p>
    </div>

    <div v-else>
      <h1>Oops, ouve um erro ao carregar o app, desculpe</h1>
    </div>
    <n-link to="/">Home</n-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default() {},
    },
  },
  layout: "default", // If you prefers you can set a custom layout for the error page
};
</script>
