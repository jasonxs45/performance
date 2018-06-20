<template>
  <div :class="classes" @click="clickHandler">
    <slot></slot>
  </div>
</template>

<script>
let flexMap = {
  direction: {
    column: 'flexbox-column'
  },
  wrap: {
    wrap: 'flexbox-wrap'
  },
  justify: {
    center: 'flexbox-content-center',
    justify: 'flexbox-content-justify'
  },
  align: {
    center: 'flexbox-align-center'
  }
}
export default {
  name: 'Flexbox',
  props: {
    direction: {
      type: String,
      default: 'normal'
    },
    wrap: {
      type: String,
      default: 'normal'
    },
    justify: {
      type: String,
      default: 'normal'
    },
    align: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
    classes () {
      let array = [
        'flexbox'
      ]
      for (let name in flexMap) {
        if (this[name] && flexMap[name][this[name]]) {
          array.push(flexMap[name][this[name]])
        }
      }
      return array
    }
  },
  methods: {
    clickHandler (e) {
      this.$emit('click', e)
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/variables.scss';
  @import '~common/scss/mixins.scss';
  .flexbox{
    display: flex;
    &.flexbox-content-center{
      justify-content: center;
    }
    &.flexbox-content-justify{
      justify-content:space-between;
    }
    &.flexbox-align-center{
      align-items: center;
    }
    &.flexbox-wrap{
      flex-wrap: wrap;
    }
    &.flexbox-column{
      flex-direction: column;
    }
  }
</style>
