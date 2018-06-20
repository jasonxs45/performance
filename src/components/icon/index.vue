<template>
  <i :class="classes" @click="clickHandler"></i>
</template>
<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    classes () {
      return ['iconfont', `icon-${this.name}`]
    }
  },
  methods: {
    clickHandler (e) {
      this.$emit('on-click', e)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/iconfont.scss";
</style>
