<template>
  <div class="x-option" @click="clickHandler">
    <slot>{{label}}</slot>
  </div>
</template>
<script>
export default {
  name: 'XOption',
  props: {
    label: {
      type: String
    },
    value: {
      type: [String, Object, Number]
    }
  },
  methods: {
    clickHandler (e) {
      this.$emit('on-change', {label: this.label, value: this.value})
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.x-option{
  font-size: p2r(24);
  padding:p2r(30) 0;
  margin:0 p2r(30);
  color:$text-sub-color;
  @include _1px(lighten($primary-color, 30%));
  &:last-child{
    background: none;
  }
}
</style>
