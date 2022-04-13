<template>
  <the-layout>
    <v-form
      ref="form"
      lazy-validation
    >
      <template v-if="step === 1">
        <v-card-title>
          <span
            class="flex-grow-1 text-center"
            style="font-size: 24px"
          >
            登录
          </span>
        </v-card-title>
        <v-card-subtitle>
          <span class="text-subtitle-1">使用您的 FDU Hole 账号</span>
        </v-card-subtitle>
        <v-card-text class="mt-8">
          <v-text-field
            outlined
            clearable
            label="复旦大学电子邮箱"
            type="email"
            :rules="emailRules"
            v-model="email"
            @keydown.enter="submit"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <span class="col-6 text-start">
            <v-btn
              text
              color="primary"
            >
              <span>注册 FDU Hole 账号</span>
            </v-btn>
          </span>
          <span class="col-6 text-end">
            <v-btn
              color="primary"
              elevation="0"
              @click="submit"
            >
              <span class="mx-2">下一步</span>
            </v-btn>
          </span>
        </v-card-actions>
      </template>
      <template v-else-if="step === 2">
        <v-card-title>
          <span class="flex-grow-1 text-center">
            <v-btn
              outlined
              rounded
              small
              style="letter-spacing: initial; border: thin solid lightgrey"
              @click="
                step = 1
                password = ''
              "
            >
              <div
                class="d-flex justify-center align-center"
                style="height: 30px"
              >
                <span style="font-family: 'Open Sans', serif; font-size: 14px">
                  {{ email }}
                </span>
                <svg
                  style="width: 24px; height: 24px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                  />
                </svg>
              </div>
            </v-btn>
          </span>
        </v-card-title>
        <v-card-text class="mt-8">
          <v-text-field
            outlined
            clearable
            label="输入您的密码"
            :type="passwordInputType"
            v-model="password"
            @keydown.enter="submit"
          >
          </v-text-field>
          <v-checkbox
            class="mt-n7"
            v-model="showPassword"
            label="显示密码"
          >
          </v-checkbox>
        </v-card-text>
        <v-card-actions>
          <span class="col-6 text-start">
            <v-btn
              text
              color="primary"
            >
              <span>忘记密码？</span>
            </v-btn>
          </span>
          <span class="col-6 text-end">
            <v-btn
              color="primary"
              elevation="0"
              @click="submit"
            >
              <span class="mx-2">登录</span>
            </v-btn>
          </span>
        </v-card-actions>
      </template>
    </v-form>
  </the-layout>
</template>

<script lang="ts">
import { Component, Ref } from 'vue-property-decorator'
import Vue from 'vue'
import TheLayout from '@/components/TheLayout.vue'
@Component({
  components: { TheLayout }
})
export default class LoginPage extends Vue {
  step = 1
  email = ''
  password = ''

  showPassword = false

  @Ref() form!: { validate: () => boolean }

  get passwordInputType() {
    return this.showPassword ? '' : 'password'
  }

  get emailRules() {
    return [() => this.checkEmail() || '不是正确的复旦学邮格式！']
  }

  checkEmail() {
    return /^\d+@(m\.)?fudan\.edu\.cn$/.test(this.email) || this.email === 'admin@opentreehole.org'
  }

  submit() {
    if (this.form.validate()) {
      if (this.step === 1) this.submitEmail()
    }
  }

  submitEmail() {
    localStorage.setItem('email', this.email)
    this.step++
  }
}
</script>

<style
  lang="scss"
  scoped
>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&family=Prompt:wght@500&display=swap');

.v-btn {
  text-transform: initial;
}
</style>
