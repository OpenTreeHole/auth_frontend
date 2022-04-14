import Vue from 'vue'
import App from '@/App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import MessageStore from '@/store/modules/MessageStore'

Vue.config.productionTip = false

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Vue.config.errorHandler = (err) => {
  MessageStore.messageError(err.message)
  throw err
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
