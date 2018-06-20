import axios from 'axios'
import wx from 'weixin-js-sdk'
import { base } from 'common/utils'
import api from 'api'
import qs from 'qs'
let shareInfo = {
  title: '',
  desc: '',
  link: '',
  imgUrl: ''
}
const apilist = [
  'checkJsApi',
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'onMenuShareQQ',
  'onMenuShareWeibo',
  'hideMenuItems',
  'showMenuItems',
  'hideAllNonBaseMenuItem',
  'showAllNonBaseMenuItem',
  'translateVoice',
  'startRecord',
  'stopRecord',
  'onRecordEnd',
  'playVoice',
  'pauseVoice',
  'stopVoice',
  'uploadVoice',
  'downloadVoice',
  'chooseImage',
  'previewImage',
  'uploadImage',
  'downloadImage',
  'getNetworkType',
  'openLocation',
  'getLocation',
  'hideOptionMenu',
  'showOptionMenu',
  'closeWindow',
  'scanQRCode',
  'chooseWXPay',
  'openProductSpecificView',
  'addCard',
  'chooseCard',
  'openCard'
]
let wxConf = {
  apilist,
  init () {
    let ua = navigator.userAgent.toLowerCase()
    if (!(/micromessenger/i).test(ua)) {
      alert('请使用微信浏览器访问，否则部分功能可能无法使用！')
    } else {
      api.auth().then(res => {
        if (res.data.IsSuccess) {
          wx.config({
            debug: false,
            appId: res.data.Data.AppId,
            timestamp: res.data.Data.Timestamp,
            nonceStr: res.data.Data.NonceStr,
            signature: res.data.Data.Signature,
            jsApiList: this.apilist
          })
          wx.ready(() => {
            wx.onMenuShareAppMessage(shareInfo)
            wx.onMenuShareTimeline(shareInfo)
            wx.onMenuShareQQ(shareInfo)
          })
        } else {
          location.href = res.data.Data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  _openMap (opt) {
    wx.openLocation(opt)
  },
  _closeWindow () {
    wx.closeWindow()
  },
  _previewImg ({current, urls}) {
    wx.previewImage({
      current,
      urls
    })
  },
  _chooseImg (count = 9) {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count, // 默认9
        success (res) {
          let localIds = res.localIds
          resolve(localIds)
        }
      })
    })
  },
  _uploadImg (localId) {
    return new Promise((resolve, reject) => {
      wx.uploadImage({
        localId, // 需要上传的图片的本地ID
        success (res) {
          let serverId = res.serverId // 返回图片的服务器端ID
          resolve(serverId)
        },
        fail (err) {
          $alert({
            title: '上传失败',
            content: JSON.stringify(err)
          })
          reject(err)
        }
      })
    })
  },
  _downloadImg (serverId) {
    return axios.post(
      base.webRoot + '/Mobile-wx_UploadImg',
      qs.stringify({
        serverID: serverId
      })
    )
  },
  _wxUpload (limit, localCb, serverCb) {
    /** limit 限制图片数量，
     * localCb是选完图片后的回调，参数是本地图片路径
     * serverCb是所有图片从腾讯服务器下载下来之后的回调，参数是服务器上的图片路径
     */
    /* 图片组 */
    let images = {
      localIds: [],
      serverIds: [],
      serverUrls: []
    }
    // 选择图片
    this._chooseImg(limit).then(res => {
      images.localIds = res
      localCb && localCb(images.localIds)
      uploadImage()
    })
    let uploadImage = () => {
      if (images.localIds.length === 0) {
        $alert('请选择图片')
        return
      }
      let i = 0
      let length = images.localIds.length
      images.serverIds = []
      // 上载到微信服务器
      let upload = () => {
        this._uploadImg(images.localIds[i]).then(res => {
          images.serverIds.push(res)
          this._downloadImg(res).then(res => {
            i++
            images.serverUrls.push(res.data)
            if (i < length) {
              upload()
            } else {
              serverCb && serverCb(images.serverUrls)
            }
          }).catch(err => {
            $alert({
              title: '图片下载失败',
              content: `${err}`
            })
          })
        }).catch(err => {
          $alert({
            title: '图片上传失败',
            content: `${err}`
          })
        })
      }
      upload()
    }
  }
}
export default wxConf
