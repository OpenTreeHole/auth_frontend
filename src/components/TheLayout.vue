<template>
  <v-container fill-height>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="10"
        sm="8"
        md="6"
        lg="4"
        class="text-center"
      >
        <v-card
          class="pt-12 px-10 pb-9"
          elevation="0"
          outlined
        >
          <slot />
        </v-card>
        <span class="d-flex justify-end mt-2">
          <span class="d-flex ml-2">
            <v-btn
              text
              color="secondary"
              small
              href="https://www.fduhole.com/#/license"
            >
              <span>社区公约</span>
            </v-btn>
          </span>
          <span class="d-flex ml-2">
            <v-btn
              text
              color="secondary"
              small
              href="https://github.com/OpenTreeHole/auth_frontend/blob/master/LICENSE"
            >
              <span>开源协议</span>
            </v-btn>
          </span>
          <span class="d-flex ml-2">
            <v-btn
              text
              color="secondary"
              small
              href="https://github.com/OpenTreeHole/"
            >
              <span>GITHUB</span>
            </v-btn>
          </span>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class TheLayout extends Vue {}
</script>

<style
  lang="scss"
  scoped
></style>
