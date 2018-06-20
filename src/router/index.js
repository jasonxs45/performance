import Vue from 'vue'
import Router from 'vue-router'
import { wxConf, mta } from 'common/utils'
// 导入路由页面配置信息
import routes from './pages'

Vue.use(Router)
let router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title || '测试'
  if (process.env.NODE_ENV === 'production') {
    wxConf.init()
  }
  next()
})
router.afterEach(() => {
  // 在路由全局钩子中执行腾讯统计的方法
  mta.pgv()
})
export default router
