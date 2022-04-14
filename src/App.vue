<template>
  <v-app>
    <message-snackbar />

    <v-main>
      <router-view :key="$route.fullPath + ($route.params.id || '') + $route.query"></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import MessageSnackbar from '@/components/MessageSnackbar.vue'
@Component({
  components: { MessageSnackbar }
})
export default class App extends Vue {}
</script>
