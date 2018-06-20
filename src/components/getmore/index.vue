<template>
  <div class="get-more">
    <div class="get-more-wrapper" @click="clickHandler">
      <span class="info">
        {{canClick ? '点击加载更多': '没有更多了'}}
      </span>
      <Icon v-if="canClick" name="arrow-right1"/>
    </div>
  </div>
</template>
<script>
import Icon from 'components/icon'
export default {
  name: 'Getmore',
  components: {
    Icon
  },
  props: {
    canClick: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickHandler (e) {
      if (!this.canClick) {
        return
      }
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
.get-more{
  text-align: center;
  .get-more-wrapper{
    display: inline-block;
    color:$thr-color;
    padding: p2r(20);
    .iconfont{
      font-size: p2r(24);
    }
    .info{
      font-size: p2r(24);
      font-weight: 200;
    }
  }
}
</style>
