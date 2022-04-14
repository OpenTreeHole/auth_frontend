import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: 'Open Tree Hole 登录'
    },
    component: LoginPage
  },
  {
    name: 'register',
    path: '/register',
    meta: {
      title: 'Open Tree Hole 注册'
    },
    component: RegisterPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  }

  if (from.query.url) to.query.url = from.query.url

  next()
})

export default router
