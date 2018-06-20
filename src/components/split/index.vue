<template>
  <div :class="classes"></div>
</template>
<script>
export default {
  name: 'Split',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes () {
      return ['split', this.type === 'line' ? 'line' : '']
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
 .split{
   width:100%;
   height:p2r(10);
   background: $background-color;
   &.line{
     height: 1px;
     background: $line-color;
     transform: scaleY(.5);
   }
 }
</style>
