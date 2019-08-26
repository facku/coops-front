import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import {store} from './store'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = 'http://localhost/'


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
