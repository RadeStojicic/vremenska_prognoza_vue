import Vue from 'vue'
import App from './App.vue'
import Main from './components/main/Main.vue'



Vue.config.productionTip = false
Vue.component('app-main', Main)



new Vue({
  render: h => h(App),
}).$mount('#app')


