<template>
<div class="area-picker">
  <input
    readonly
    placeholder="请选择地区"
    :value="value"
    @click="toggleAreaPicker"
    @focus="focus"
    class="input"
  />
  <transition name="fade">
    <div
      v-show="showAreaPicker"
      class="bg"
      @click="toggleAreaPicker"
    ></div>
  </transition>
  <transition name="slide-up">
    <div
      v-show="showAreaPicker"
      class="area-picker-wrapper"
    >
      <div class="header">
        <h4 class="title">选择地区</h4>
        <Icon name="close" @on-click="toggleAreaPicker"/>
      </div>
      <div class="selected-area">
          <div
            v-for="(item, index) in tabs"
            :key="'tabnav-item-'+index+Math.random().toString(36).substr(2)"
            class="tab-item"
            :class="activeIndex === index ? 'active' : ''"
            @click="swipe(index)"
          >
          {{item}}
          </div>
      </div>
      <div class="scroll-area" ref="scrollArea">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper" @slideChange="swipeChangeHandler">
          <!-- slides -->
          <swiper-slide
            v-for="(item, index1) in banners"
            :key="'banner-'+index1+Math.random().toString(36).substr(2)"
            :class="banners.length < 2 && index1 === 0 ? 'swiper-no-swiping' : ''"
          >
            <p
              v-for="(value, key, index) in item"
              :key="'pcaa-' + key + index + Math.random().toString(36).substr(2)"
              class="items"
            >
              <label
                class="tag"
              >
                <input
                  type="radio"
                  :data-group="index1"
                  :id="key"
                  :value="value"
                  :name="'radio-'+index1"
                  :checked="tabs[index1] === value"
                  class="radio"
                  @change="radioChangeHandler"
                />
                <span class="text">
                  {{value}}
                  <Icon name="checked"/>
                </span>
              </label>
            </p>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </transition>
</div>
</template>
<script>
import Icon from '../icon'
import { pcaa } from 'area-data'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'AreaPicker',
  components: {
    swiper,
    swiperSlide,
    Icon
  },
  props: {
    border: {
      type: Boolean
    }
  },
  data () {
    return {
      showAreaPicker: false,
      pcaa,
      activeIndex: 0,
      banners: [
        pcaa[86]
      ],
      tabs: [
        '请选择'
      ]
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    },
    swiperOption () {
      return {
        effect: 'slide'
      }
    },
    value () {
      return this.tabs.filter(item => {
        return item !== '请选择' &&
               item !== '市辖区'
      }).join('')
    }
  },
  methods: {
    focus (e) {
      e.target.blur()
    },
    toggleAreaPicker () {
      this.showAreaPicker = !this.showAreaPicker
    },
    swipeChangeHandler () {
      this.activeIndex = this.swiper.activeIndex
    },
    radioChangeHandler (e) {
      let groupIndex = parseInt(e.currentTarget.dataset.group)
      let id = e.currentTarget.id
      let value = e.currentTarget.value
      if (pcaa[id]) {
        if (this.banners[groupIndex + 1]) {
          this.banners.splice(
            groupIndex + 1,
            this.banners.length - 1 - groupIndex,
            pcaa[id]
          )
          this.tabs.splice(
            groupIndex,
            this.tabs.length,
            value,
            '请选择'
          )
        } else {
          this.banners.push(pcaa[id])
          this.tabs.splice(
            this.tabs.length - 1,
            0,
            value
          )
        }
      } else {
        this.tabs.splice(
          this.tabs.length - 1,
          1,
          value
        )
        this.toggleAreaPicker()
        // 派发事件
        this.$emit('selected', this.value)
      }
      this.$refs.scrollArea.scrollTop = 0
      this.$nextTick(() => {
        this.swiper.slideNext()
      })
    },
    swipe (index) {
      this.$refs.scrollArea.scrollTop = 0
      this.swiper.slideTo(index)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.area-picker{
  .input{
    width: 100%;
    height: p2r(90);
    line-height: p2r(90);
    padding:0 p2r(30);
    background: none;
    -webkit-appearance: none;
    outline: none;
    color:$text-color;
    font-size: p2r(28);
    &::-webkit-input-placeholder{
      color:lighten($text-sub-color, 20%);
      font-weight: 200;
    }
  }
  .bg{
    width:100%;
    height: 100%;
    position: fixed;
    top:0;
    left:0;
    background: rgba(0,0,0,.7);
    z-index: 999;
  }
  .area-picker-wrapper{
    width: 100%;
    height: p2r(800);
    background: #fff;
    position: fixed;
    bottom:0;
    left:0;
    z-index: 1000;
    .header{
      .title{
        text-align: center;
        line-height: p2r(60);
        height: p2r(60);
        color: $text-sub-color;
      }
      .iconfont{
        display: inline-block;
        color: $thr-color;
        width: p2r(60);
        height: p2r(60);
        text-align: center;
        line-height: p2r(60);
        position: absolute;
        right: 0;
        top:0;
      }
    }
    .selected-area{
      height: p2r(60);
      line-height: p2r(60);
      @include _1px(#ddd);
      font-size: 0;
      .tab-item{
        display: inline-block;
        height: 100%;
        font-size: p2r(24);
        padding: 0 p2r(20);
        position: relative;
        &:after{
          content: '';
          display: block;
          height: 1px;
          position: absolute;
          width:80%;
          left: 10%;
          bottom: 0;
          background: none;
        }
        &.active{
          color: $primary-color;
          font-weight: 600;
           &:after{
            background:$primary-color;
           }
        }
      }
    }
    .scroll-area{
      width: 100%;
      height: calc(100% - 2.56rem);
      .swiper{
        height: 100%;
        .swiper-wrapper{
          height: 100%;
          .swiper-slide{
            width: 100%;
            height: 100%;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
          }
        }
      }
      .items{
        .tag{
          display: inline-block;
          width: 100%;
          position: relative;
          .radio{
            position: absolute;
            width: 100%;
            height: 100%;
            top:0;
            left:0;
            display: block;
            opacity: 0;
            outline: none;
            border: none;
            &:checked + .text{
              color: $primary-color;
              .iconfont{
                opacity: 1;
              }
            }
          }
          .text{
            display: block;
            margin:0 p2r(20);
            padding: p2r(20) 0;
            height: 100%;
            .iconfont{
              opacity: 0;
            }
          }
        }
      }
    }
  }
}
</style>
