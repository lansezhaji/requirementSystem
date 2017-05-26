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
  components: { App },
})
/**
 * 拦截网络请求,头部添加tocken。返回时判断tocken有效性
 * @param  {[type]} options.request(request) {               const jwtToken         [description]
 * @param  {[type]} response(response)       {               if    (response.status [description]
 * @return {[type]}                          [description]
 */
Vue.http.interceptors.push((request, next) => {
  　console.log(this)//此处this为请求所在页面的Vue实例
   // modify request
   request.method = 'POST';//在请求之前可以进行一些预处理和配置
   request.headers.set('token', localStorage.getItem("token"));
　　next((response) => {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
    if (response.body.status == 0) {

      
    }
　　return response;
 
 });
});