<template>
  <the-layout ref="layout">
    <v-card-title>
      <span
        class="flex-grow-1 text-center"
        style="font-size: 24px"
      >
        您已登录
      </span>
    </v-card-title>
    <v-card-subtitle class="mt-0">
      <span style="font-family: 'Open Sans', serif; font-size: 14px">
        {{ email }}
      </span>
    </v-card-subtitle>
    <v-card-text class="text-start"> <b>Access:</b> {{ access }} </v-card-text>
    <v-card-text class="text-start mt-n4"> <b>Refresh:</b> {{ refresh }} </v-card-text>
    <v-card-actions>
      <span
        class="text-center"
        style="width: 100%"
      >
        <v-btn
          color="primary"
          elevation="0"
          @click="logout"
        >
          <span class="mx-2">登出</span>
        </v-btn>
      </span>
    </v-card-actions>
  </the-layout>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import TheLayout from '@/components/TheLayout.vue'
import Cookies from 'js-cookie'
import { logout } from '@/apis'
@Component({
  components: { TheLayout }
})
export default class OnlinePage extends Vue {
  email = localStorage.getItem('email') || ''
  access = Cookies.get('access') || ''
  refresh = Cookies.get('refresh') || ''

  mounted() {
    if (this.$route.query.url) location.replace(this.$route.query.url as string)
  }

  async logout() {
    await logout()
  }
}
</script>

<style
  lang="scss"
  scoped
></style>
