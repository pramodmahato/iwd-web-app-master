import Vue from 'vue'
import Vuex from 'vuex'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './style.css'
import { store } from './store/store';
import VueFire from 'vuefire'



Vue.config.productionTip = false
Vue.use(VueFire);
Vue.use(Vuex)


new Vue({
  router,
  store,
  
  render: h => h(App)
}).$mount('#app')
