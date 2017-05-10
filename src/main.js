// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
import http from 'vue-resource'
import store from './assets/store'

Vue.use(http)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,//VUEX容器注入到所有组件 通过 this.$store.state 获取store内存储的信息
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
