<template>
  <div :class="classes" onselectstart="return false;">
    <slot></slot>
  </div>
</template>
<script>
let classMap = {
  justify: 'tabnav-justify',
  normal: ''
}
export default {
  name: 'Tabnav',
  props: {
    justify: {
      type: String,
      default: 'normal'
    },
    active: {
      type: Number,
      default: 0
    },
    activeClass: {
      type: [String, Array],
      default: ''
    }
  },
  data () {
    return {
      childLength: this.$children.length,
      activeIndex: null
    }
  },
  computed: {
    classes () {
      return ['tabnav', classMap[this.justify]]
    }
  },
  created () {
    this.activeIndex = this.active || 0
  },
  mounted () {
    if (!this.$children) return
    this.childLength = this.$children.length
    this.$children.forEach((item, i) => {
      this.$children[i].$on('on-change', this.changeHandler)
      item.index = i
      item.active = this.activeIndex === item.index
    })
  },
  methods: {
    changeHandler (value) {
      this.$emit('click', value)
      if (value !== this.activeIndex) {
        for (let i = 0; i < this.$children.length; i++) {
          this.$children[i].active = false
          if (i === value) {
            this.$children[i].active = true
          }
        }
        this.activeIndex = value
        this.$emit('on-change', this.activeIndex)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.#{tabnav}{
  height:p2r(80);
  &-justify{
    width:100%;
    .tabnav-item{
      width:1%;
    }
  }
}
</style>
