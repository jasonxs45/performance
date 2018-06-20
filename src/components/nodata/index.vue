<template>
  <div class="nodata">
    <!-- <Icon name="suggest"/> -->
    <img class="nodataimg" src="static/images/nodata.png">
    <div class="info">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Icon from 'components/icon'
export default {
  name: 'Nodata',
  components: {
    Icon
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
.nodata{
 text-align: center;
 color:$thr-color;
 padding-top: p2r(20);
 .nodataimg{
   width: p2r(200);
 }
 .iconfont{
   font-size: p2r(56);
 }
 .info{
   padding:p2r($base-padding);
   font-size: p2r(28);
   font-weight: 200;
   line-height: 1.4;
 }
}
</style>
