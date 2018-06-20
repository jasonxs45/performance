import axios from 'axios'
import qs from 'qs'
import { base } from 'common/utils'
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(undefined, function axiosRetryInterceptor (err) {
  let config = err.config
  if (!config || !config.retry) return Promise.reject(err)
  config.__retryCount = config.__retryCount || 0
  if (config.__retryCount >= config.retry) {
    return Promise.reject(err)
  }
  config.__retryCount += 1
  let backoff = new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, config.retryDelay || 1)
  })
  return backoff.then(() => {
    return axios(config)
  })
})
let api = {
  // 模拟数据
  mock (opt) {
    let index = $loading('加载中')
    return axios.post(
      base.MOCK_URL + opt.Act,
      qs.stringify(opt)
    ).then(res => {
      return new Promise((resolve, reject) => {
        if (res.status === 200) {
          $close(index)
          resolve(res)
        }
      })
    }).catch(err => {
      let index = $alert({
        title: '对不起',
        content: `网络错误，请稍候再试！`,
        yes () {
          $close(index)
          $closeAll()
        }
      })
      return new Promise((resolve, reject) => {
        reject(err)
      })
    })
  },
  // 授权
  auth () {
    return axios.post('/Admin-GetAuthorize', {
      redirectUrl: location.href
    }).then(res => {
      return new Promise((resolve, reject) => {
        if (res.status === 200) {
          resolve(res)
        }
      })
    }).catch(err => {
      let index = $alert({
        content: `${err}<br/>网络错误，请稍候再试！`,
        yes () {
          $close(index)
          $closeAll()
        }
      })
      return new Promise((resolve, reject) => {
        reject(err)
      })
    })
  },
  // 全局查询方法
  fetch (opt) {
    Object.assign(opt, { openid: base.openid })
    let index = $loading('加载中')
    return axios.post(
      base.BASE_URL,
      qs.stringify(opt)
    ).then(res => {
      return new Promise((resolve, reject) => {
        if (res.status === 200) {
          $close(index)
          resolve(res)
        }
      })
    }).catch(err => {
      let index = $alert({
        content: `${err}<br/>网络错误，请稍候再试！`,
        yes () {
          $close(index)
          $closeAll()
        }
      })
      return new Promise((resolve, reject) => {
        reject(err)
      })
    })
  }
  // 公用请求
}
export default api
