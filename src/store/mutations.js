import types from './mutation-types'
export default {
  [types.OPEN_ID] (state, openid) {
    sessionStorage.openid = openid
    state.openid = sessionStorage.openid
  }
}
