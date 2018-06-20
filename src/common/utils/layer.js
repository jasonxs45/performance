import '../scss/layer.scss'
let doc = window.document
let query = 'querySelectorAll'
let claname = 'getElementsByClassName'
let S = (s) => {
  return doc[query](s)
}

// 默认配置
let config = {
  type: 0,
  shade: true,
  shadeClose: true,
  fixed: true,
  anim: 'scale' // 默认动画类型
}

let ready = {
  extend (obj) {
    let newobj = JSON.parse(JSON.stringify(config))
    for (let i in obj) {
      newobj[i] = obj[i]
    }
    return newobj
  },
  timer: {},
  end: {}
}

// 点触事件
ready.touch = (elem, fn) => {
  elem.addEventListener('click', (e) => {
    fn.call(this, e)
  }, false)
}

let index = 0
let classs = ['layui-m-layer']
let Layer = function (options) {
  let that = this
  that.config = ready.extend(options)
  that.view()
}

Layer.prototype.view = function () {
  let that = this
  let config = that.config
  let layerbox = doc.createElement('div')

  that.id = layerbox.id = classs[0] + index
  layerbox.setAttribute('class', classs[0] + ' ' + classs[0] + (config.type || 0))
  layerbox.setAttribute('index', index)

  // 标题区域
  let title = (function () {
    let titype = typeof config.title === 'object'
    return config.title
      ? '<h3 style="' + (titype ? config.title[1] : '') + '">' + (titype ? config.title[0] : config.title) + '</h3>'
      : ''
  }())

  // 按钮区域
  let button = (function () {
    typeof config.btn === 'string' && (config.btn = [config.btn])
    let btns = (config.btn || []).length
    let btndom
    if (btns === 0 || !config.btn) {
      return ''
    }
    btndom = '<span yes type="1">' + config.btn[0] + '</span>'
    if (btns === 2) {
      btndom = '<span no type="0">' + config.btn[1] + '</span>' + btndom
    }
    return '<div class="layui-m-layerbtn">' + btndom + '</div>'
  }())

  if (!config.fixed) {
    config.top = config.hasOwnProperty('top') ? config.top : 100
    config.style = config.style || ''
    config.style += ' top:' + (doc.body.scrollTop + config.top) + 'px'
  }

  if (config.type === 2) {
    config.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (config.content || '') + '</p>'
  }

  if (config.skin) config.anim = 'up'
  if (config.skin === 'msg') config.shade = false

  layerbox.innerHTML = (config.shade
    ? '<div ' + (typeof config.shade === 'string' ? 'style="' + config.shade + '"' : '') + ' class="layui-m-layershade"></div>' : '') +
        '<div class="layui-m-layermain" ' + (!config.fixed ? 'style="position:static;"' : '') + '>' +
          '<div class="layui-m-layersection">' +
            '<div class="layui-m-layerchild ' + (config.skin ? 'layui-m-layer-' + config.skin + ' ' : '') + (config.className ? config.className : '') + ' ' + (config.anim ? 'layui-m-anim-' + config.anim : '') + '" ' + (config.style ? 'style="' + config.style + '"' : '') + '>' +
              title +
              '<div class="layui-m-layercont">' + config.content + '</div>' +
                button +
            '</div>' +
          '</div>' +
        '</div>'

  if (!config.type || config.type === 2) {
    let dialogs = doc[claname](classs[0] + config.type)
    let dialen = dialogs.length
    if (dialen >= 1) {
      layer.close(dialogs[0].getAttribute('index'))
    }
  }

  document.body.appendChild(layerbox)
  let elem = that.elem = S(`#${that.id}`)[0]
  config.success && config.success(elem)

  that.index = index++
  that.action(config, elem)
}

Layer.prototype.action = function (config, elem) {
  let that = this
  // 自动关闭
  if (config.time) {
    ready.timer[that.index] = setTimeout(() => {
      layer.close(that.index)
    }, config.time * 1000)
  }

  // 确认取消
  let btn = function (event) {
    let type = event.currentTarget.getAttribute('type')
    if (parseInt(type) === 0) {
      config.no && config.no()
      layer.close(that.index)
    } else {
      config.yes ? config.yes(that.index) : layer.close(that.index)
    }
  }

  if (config.btn) {
    let btns = elem[claname]('layui-m-layerbtn')[0].children
    let btnlen = btns.length
    for (let ii = 0; ii < btnlen; ii++) {
      ready.touch(btns[ii], btn)
    }
  }

  // 点遮罩关闭
  if (config.shade && config.shadeClose) {
    let shade = elem[claname]('layui-m-layershade')[0]
    ready.touch(shade, () => {
      layer.close(that.index, config.end)
    })
  }

  config.end && (ready.end[that.index] = config.end)
}

let layer = {
  index,
  // 核心方法
  open (options) {
    let o = new Layer(options || {})
    return o.index
  },
  loading (text) {
    return this.open({
      type: 2,
      content: text,
      shadeClose: false
    })
  },
  close (index) {
    let ibox = S(`#${classs[0]}${index}`)[0]
    if (!ibox) return
    ibox.innerHTML = ''
    doc.body.removeChild(ibox)
    clearTimeout(ready.timer[index])
    delete ready.timer[index]
    typeof ready.end[index] === 'function' && ready.end[index]()
    delete ready.end[index]
  },

  // 关闭所有layer层
  closeAll () {
    let boxs = doc[claname](classs[0])
    for (let i = 0; i < boxs.length; i++) {
      layer.close((boxs[0].getAttribute('index') | 0))
    }
  }
}
window.layer = layer
let $toast = msg => {
  return layer.open({
    content: msg,
    skin: 'msg',
    time: 2
  })
}
let $loading = text => {
  return layer.open({
    type: 2,
    content: text,
    shadeClose: false
  })
}
let $simplealert = opts => {
  opts = Object.assign({
    shadeClose: false,
    btn: ''
  }, opts)
  return layer.open(opts)
}
let $alert = opt => {
  let opts
  if (typeof opt === 'string') {
    opts = {
      shadeClose: false,
      btn: '确定',
      content: opt
    }
  } else if (typeof opt === 'object') {
    opts = {
      shadeClose: false,
      content: '',
      btn: '确定'
    }
    opts = Object.assign(opts, opt)
  }
  return layer.open(opts)
}
let $confirm = opts => {
  let optss = {
    deClose: false,
    content: '',
    btn: ['确定', '取消']
  }
  let yes = () => {
    opts.yes()
    layer.close(index)
  }
  for (let n in opts) {
    if (n !== 'yes') {
      optss[n] = opts[n]
    }
  }
  optss.yes = yes
  let index = layer.open(optss)
  return index
}
let $close = index => {
  layer.close(index)
}
window.$toast = $toast
window.$loading = $loading
window.$alert = $alert
window.$confirm = $confirm
window.$simplealert = $simplealert
window.$close = $close
window.$closeAll = layer.closeAll
export default layer
