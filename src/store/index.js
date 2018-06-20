import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import modules from './modules'
Vue.use(Vuex)
let state = {
  openid: ''
}
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules,
  strict: debug
})
