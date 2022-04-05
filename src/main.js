import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import { Button,MessageBox, } from 'element-ui';
//Vue.component(Button.name, Button);
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


// 引入图片濑加载
import VueLazyload from 'vue-lazyload'
import erha from '@/assets/images/1.gif';
Vue.use(VueLazyload,{
  loading: erha,
})

import TypeNav from '@/components/TypeNav'
Vue.component('TypeNav',TypeNav)

import Swiper from '@/components/Swiper'
Vue.component(Swiper.name,Swiper)

import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

import '@/mock/mockServer'

import 'swiper/css/swiper.css'

// 统一引入 接口文件
import * as API from '@/api'

// 引入自定义组件
import myPlugins from "@/plugins/myPlugin"
Vue.use(myPlugins,{
   name:'upper'
})

// 引入表单验证插件
import '@/plugins/validate'


new Vue({
  router,
  store,
  // 配置全局 bus 
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  },
  render: h => h(App)
}).$mount('#app')
