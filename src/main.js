// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入vuex
import store from './store/index.js'
//引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
//引入animate.css
import animated from 'animate.css' // npm install animate.css --save安装，在引入
Vue.use(animated)

//axios vue-axios
import axios from 'axios';
import VueAxios from "vue-axios"
Vue.use(VueAxios,axios)
//全局接口 地址
axios.defaults.baseURL="http://127.0.0.1:9527"
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
