// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 导入腾讯统计模块
import { mta } from 'common/utils'
import wx from 'weixin-js-sdk'
window.wx = wx
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  created () {
    // 初始化腾讯统计
    mta.init()
  },
  template: '<App/>'
})
