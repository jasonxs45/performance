import MtaH5 from 'mta-h5-analysis'
const sid = 500619698
const mta = {
  init () {
    MtaH5.init({
      sid, // 必填，统计用的appid
      cid: '', // 如果开启自定义事件，此项目为必填，否则不填
      autoReport: 0, // 是否开启自动上报(1:init完成则上报一次,0:使用pgv方法才上报)
      senseHash: 1, // hash锚点是否进入url统计
      senseQuery: 0, // url参数是否进入url统计
      performanceMonitor: 0, // 是否开启性能监控
      ignoreParams: [] // 开启url参数上报时，可忽略部分参数拼接上报
    })
  },
  pgv () {
    MtaH5.pgv()
  }
}
export default mta
