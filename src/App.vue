<template>
  <v-app dark class="resizingClass">
    <Kasse></Kasse>
  </v-app>
</template>

<script>
import Kasse from './components/Kasse.vue'

export default {
  name: 'app',
  components: {
    Kasse
  }
}
</script>

<style>
  .resizingClass{
  }
</style>
