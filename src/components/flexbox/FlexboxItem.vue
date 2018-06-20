<template>
  <div :class="classes" @click="clickHandler">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FlexboxItem',
  props: {
    span: {
      type: Number,
      default: 1
    }
  },
  computed: {
    classes () {
      return [this.span > 1 ? 'flexbox-item flexbox-item' + this.span : 'flexbox-item']
    }
  },
  methods: {
    clickHandler (e) {
      this.$emit('click', e)
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/variables.scss';
  @import '~common/scss/mixins.scss';
  .flexbox-item{
    flex:1;
    min-width:0;
    &.flexbox-item2{
      flex:2;
      min-width:0;
    }
    &.flexbox-item3{
      flex:3;
      min-width:0;
    }
    &.flexbox-item4{
      flex:4;
      min-width:0;
    }
    &.flexbox-item5{
      flex:5;
      min-width:0;
    }
  }
</style>
