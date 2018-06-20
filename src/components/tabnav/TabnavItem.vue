<template>
  <div :class="classes" @click="clickHandler">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'TabnavItem',
  data () {
    return {
      active: false
    }
  },
  computed: {
    classes () {
      return ['tabnav-item', this.active ? 'tabnav-item-active' : '']
    }
  },
  methods: {
    clickHandler (e) {
      this.active = true
      this.$emit('on-change', this.index)
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.tabnav{
 .tabnav-item{
   height:inherit;
   display: table-cell;
   vertical-align: middle;
   position: relative;
   padding:0;
   text-align: center;
   &:after{
     content: '';
     display: block;
     position: absolute;
     bottom: 0;
     left:0;
     width:100%;
     height:2px;
   }
   &.tabnav-item-active{
     &:after{
       background: $primary-color;
     }
     .text{
       color:$primary-color;
       font-weight: normal;
     }
   }
   .text{
     font-size: p2r(26);
     white-space: nowrap;
     overflow: hidden;
     text-overflow: clip;
     text-align: center;
     color:$text-color;
     font-weight: 200;
   }
 }
}
</style>
