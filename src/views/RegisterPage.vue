<template>
  <the-layout ref="layout">
    <v-form
      ref="form"
      lazy-validation
      @submit.prevent
    >
      <template v-if="step === 1">
        <v-card-title>
          <span
            class="flex-grow-1 text-center"
            style="font-size: 24px"
          >
            {{ isForgetPassword ? '忘记密码' : '注册' }}
          </span>
        </v-card-title>
        <v-card-subtitle>
          <span class="text-subtitle-1">{{ isForgetPassword ? '使用复旦学邮(@fudan.edu.cn)以找回密码' : '使用您的复旦学邮(@fudan.edu.cn)进行注册！' }}</span>
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
        <v-card-actions class="justify-end">
          <v-btn
            color="primary"
            elevation="0"
            @click="submit"
          >
            <span class="mx-2">验证邮箱</span>
          </v-btn>
        </v-card-actions>
      </template>
      <template v-else-if="step === 2">
        <v-card-title>
          <span
            class="flex-grow-1 text-center"
            style="font-size: 24px"
          >
            确认邮箱
          </span>
        </v-card-title>
        <v-card-subtitle class="mt-0">
          <span class="flex-grow-1 text-center">
            <v-btn
              outlined
              rounded
              small
              style="letter-spacing: initial; border: thin solid lightgrey"
              @click="step = 1"
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
        </v-card-subtitle>
        <v-card-text> 我们将向你的邮箱发送验证码，请注意查收。</v-card-text>
        <v-card-actions>
          <span class="col-6 text-start">
            <v-btn
              text
              color="primary"
              @click="step = 1"
            >
              <span>返回上一步</span>
            </v-btn>
          </span>
          <span class="col-6 text-end">
            <v-btn
              color="primary"
              elevation="0"
              :disabled="sendCodeTimeout > 0"
              @click="submit"
            >
              <span class="mx-2">{{ sendCodeText }}</span>
            </v-btn>
          </span>
        </v-card-actions>
      </template>
      <template v-else-if="step >= 3">
        <v-card-title>
          <span
            class="flex-grow-1 text-center"
            style="font-size: 24px"
          >
            验证邮箱
          </span>
        </v-card-title>
        <v-card-subtitle class="mt-0">
          <span class="flex-grow-1 text-center">
            <v-btn
              outlined
              rounded
              small
              style="letter-spacing: initial; border: thin solid lightgrey"
              @click="step = 1"
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
        </v-card-subtitle>
        <v-card-text>
          <span>
            我们已向 {{ email }} 发送验证码。<br />未收到？
            <v-btn
              class="px-0"
              text
              color="primary"
              @click="step = 2"
              style="height: 19px; margin-top: -3px"
            >
              <span>返回上一步</span>
            </v-btn>
            。
          </span>
        </v-card-text>
        <v-card-text class="mt-8">
          <v-text-field
            outlined
            clearable
            label="验证码"
            type="code"
            :rules="codeRules"
            v-model="code"
            @keydown.enter="submit"
          >
          </v-text-field>
        </v-card-text>
        <template v-if="step === 3">
          <v-card-actions>
            <span class="col-6 text-start">
              <v-btn
                text
                color="primary"
                @click="step = 2"
              >
                <span>返回上一步</span>
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
        <template v-else-if="step === 4">
          <v-card-text class="mt-n9">
            <v-text-field
              outlined
              clearable
              label="设置密码"
              type="password"
              :rules="passwordRules"
              v-model="password"
            >
            </v-text-field>
          </v-card-text>
          <v-card-text class="mt-n9">
            <v-text-field
              outlined
              clearable
              label="重复输入密码"
              type="password"
              :rules="password2Rules"
              v-model="password2"
              @keydown.enter="submit"
            >
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <span class="col-6 text-start">
              <v-btn
                text
                color="primary"
                @click="step = 2"
              >
                <span>返回上一步</span>
              </v-btn>
            </span>
            <span class="col-6 text-end">
              <v-btn
                color="primary"
                elevation="0"
                @click="submit"
              >
                <span class="mx-2">{{ isForgetPassword ? '确认' : '注册' }}</span>
              </v-btn>
            </span>
          </v-card-actions>
        </template>
      </template>
    </v-form>
  </the-layout>
</template>

<script lang="ts">
import { Component, Ref } from 'vue-property-decorator'
import Vue from 'vue'
import TheLayout from '@/components/TheLayout.vue'
import { changePassword, register, verifyWithEmail } from '@/apis'
import MessageStore from '@/store/modules/MessageStore'

@Component({
  components: { TheLayout }
})
export default class RegisterPage extends Vue {
  step = 1
  email = ''
  code = ''
  password = ''
  password2 = ''

  sendCodeTimeout = 0

  @Ref() layout!: TheLayout
  @Ref() form!: { validate: () => boolean }

  get isForgetPassword() {
    return this.$route.query.type === 'forget_password'
  }

  get emailRules() {
    return [(v: string) => this.checkEmail(v) || '不是正确的复旦学邮格式！']
  }

  get codeRules() {
    return [(v: string) => v.length == 6 || '请输入6位验证码！']
  }

  get passwordRules() {
    return [(v: string) => (v.length >= 8 && v.length <= 12) || '请输入8~12位密码！']
  }

  get password2Rules() {
    return [(v: string) => v === this.password || '两次输入密码不相同！']
  }

  get sendCodeText() {
    return this.sendCodeTimeout > 0 ? this.sendCodeTimeout.toString() : '发送验证码'
  }

  checkEmail(email: string) {
    return /^\d+@(m\.)?fudan\.edu\.cn$/.test(email) || this.email === 'admin@opentreehole.org'
  }

  async submit() {
    if (this.form.validate()) {
      switch (this.step) {
        case 1:
          this.submitEmail()
          break
        case 2:
          await this.sendCode()
          break
        case 3:
          this.submitCode()
          break
        case 4:
          await this.submitPassword()
          break
      }
    }
  }

  submitEmail() {
    this.step++
  }

  async sendCode() {
    this.sendCodeTimeout = 60
    const interval = setInterval(() => {
      this.sendCodeTimeout--
      if (this.sendCodeTimeout === 0) clearInterval(interval)
    }, 1000)
    const { message } = await this.layout.load(verifyWithEmail(this.email))
    MessageStore.messageSuccess(message)
    this.step++
  }

  submitCode() {
    this.step++
  }

  async submitPassword() {
    const submitPasswordFunc = this.isForgetPassword ? changePassword : register
    const { message } = await this.layout.load(submitPasswordFunc(this.password, this.email, this.code))
    MessageStore.messageSuccess(message)
    await this.$router.push({ name: 'online' })
  }

  mounted() {
    const email = localStorage.getItem('email')
    if (email && this.checkEmail(email)) {
      this.email = email
      this.step = 2
    }
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
