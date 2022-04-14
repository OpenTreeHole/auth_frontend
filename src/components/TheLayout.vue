<template>
  <v-container fill-height>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="11"
        sm="9"
        md="7"
        lg="5"
        xl="4"
        class="text-center"
      >
        <v-card
          class="pt-12 px-10 pb-9"
          elevation="0"
          outlined
        >
          <v-progress-linear
            :active="isLoading"
            indeterminate
            absolute
            top
            color="teal"
          >
          </v-progress-linear>
          <v-card-title class="justify-center">
            <v-img
              src="@/assets/img.png"
              max-width="199px"
            ></v-img>
          </v-card-title>
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
export default class TheLayout extends Vue {
  isLoading = false

  async load<T>(promise: Promise<T>) {
    this.isLoading = true
    try {
      const response = await promise
      this.isLoading = false
      return response
    } catch (e) {
      this.isLoading = false
      throw e
    }
  }
}
</script>

<style
  lang="scss"
  scoped
></style>
