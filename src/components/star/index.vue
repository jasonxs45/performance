<template>
<div
  class="star"
  :class="starType"
  @click.stop="clickHandler"
>
  <span
    v-for="(itemClass,index) in itemClasses"
    :key="'star-'+index"
    :class="itemClass"
    :data-index="index"
    class="star-item"
  >
  </span>
</div>
</template>
<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_OFF = 'off'
const CLS_HALF = 'half'
export default {
  name: 'Star',
  props: {
    size: {
      type: Number,
      default: 48
    },
    score: {
      type: [Number, String],
      default: 0
    },
    readOnly: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      rateScore: 0
    }
  },
  computed: {
    myScore () {
      return this.readOnly ? this.score : this.rateScore
    },
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = []
      let score = Math.floor(this.myScore * 2) / 2
      let hasDecimal = isNaN(score) ? 0 : score % 1 !== 0
      let integer = isNaN(score) ? 0 : Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  },
  methods: {
    clickHandler (e) {
      if (this.readOnly) return
      let starW = e.target.getBoundingClientRect().width
      let innerLeft = e.target.getBoundingClientRect().left
      let downX = e.clientX
      let score = Number(e.target.dataset.index) + Math.floor((downX - innerLeft) / starW * 2) / 2 + 0.5
      if (!isNaN(score)) {
        this.rateScore = score
        this.$emit('on-rate', this.rateScore)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.star {
  display: inline-block;
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    &:last-child {
      margin-right: 0 !important;
    }
  }
  &.star-48 {
    .star-item {
      width: p2r(48);
      height: p2r(48);
      margin-right: p2r(10);
      &.on {
        @include bgimg("star48_on");
      }
      &.off {
        @include bgimg("star48_off");
      }
      &.half {
        @include bgimg("star48_half");
      }
    }
  }
  &.star-36 {
    .star-item {
      width: p2r(36);
      height: p2r(36);
      margin-right: p2r(10);
      &.on {
        @include bgimg("star36_on");
      }
      &.off {
        @include bgimg("star36_off");
      }
      &.half {
        @include bgimg("star36_half");
      }
    }
  }
  &.star-24 {
    .star-item {
      width: p2r(24);
      height: p2r(24);
      margin-right: p2r(6);
      &.on {
        @include bgimg("star24_on");
      }
      &.off {
        @include bgimg("star24_off");
      }
      &.half {
        @include bgimg("star24_half");
      }
    }
  }
}
</style>
