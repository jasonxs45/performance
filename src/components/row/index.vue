<template>
  <div class="row">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Row'
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
.row{
  margin: {
    left: p2r(-$base-padding);
    right: p2r(-$base-padding);
  }
  &:after{
    content: '';
    display: block;
    clear: both;
  }
}
</style>
