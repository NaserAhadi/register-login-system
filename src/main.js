import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@/store/store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

const globalComponents = {
  'BaseSnackbar':   () => import('@/components/BaseSnackbar/BaseSnackbar'),
  'OtpModal':   () => import('@/components/OtpModal/OtpModal'),
  'BaseButton':   () => import('@/components/BaseButton/BaseButton'),
  'BaseTextfield':   () => import('@/components/BaseTextfield/BaseTextfield'),
}

Object.entries(globalComponents).forEach(([name, component]) => Vue.component(name, component))

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
