<template>
  <div :count="count" :index="index" class="img-cell">
    <slot></slot>
    <div
      v-if="del"
      class="delete"
      @click="clickHandler"
    >
      <Icon
        name="close"
      />
    </div>
  </div>
</template>
<script>
import Icon from 'components/icon'
export default {
  name: 'ImgCell',
  components: {
    Icon
  },
  props: {
    count: {
      type: Number,
      default: 0
    },
    del: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    clickHandler () {
      this.$emit('delete', this.index)
    }
  }
}
</script>
<style lang="scss">
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.img-cell{
  border-radius: 4px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  img{
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    object-fit: cover;
    border-radius: 4px;
  }
  .delete{
    position: absolute;
    width:p2r(40);
    height: p2r(40);
    text-align: center;
    top: 0;
    right: 0;
    z-index:1;
    background: $primary-color;
    border-radius: 50%;
    color:#fff;
    .iconfont{
      height: 100%;
      font-size: p2r(28);
      line-height: p2r(40);
      display: inline-block;
    }
  }
}
</style>
