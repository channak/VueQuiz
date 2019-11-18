import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import Routes from './routes'
import Store from './store'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes:Routes
});


new Vue({
 
  render: h => h(App), 
  router:router,
  store: new Vuex.Store(Store)
 
}).$mount('#app')
