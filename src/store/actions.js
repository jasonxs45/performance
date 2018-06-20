import types from './mutation-types'
import api from 'api'
export default {
  getOpenid ({state, commit}) {
    let openid
    if (sessionStorage === 'undefined' || !sessionStorage.openid) {
      api.mock({
        Act: 'newslist'
      }).then(res => {
        openid = '12123'
        commit(types.OPEN_ID, openid)
      }).catch(err => {
        console.log(err)
      })
    } else {
      openid = sessionStorage.openid
      commit(types.OPEN_ID, openid)
    }
  }
}
