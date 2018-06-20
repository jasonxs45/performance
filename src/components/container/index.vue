<template>
  <div class="container">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Container'
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
.container{
  padding: {
    left: p2r($base-padding);
    right: p2r($base-padding);
  }
  &:after{
    content: '';
    display: block;
    clear: both;
  }
}
</style>
