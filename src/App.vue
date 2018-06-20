<template>
  <div id="app">
    <p class="btn">点击</p>
    <div>
      <img class="apps" v-for="(item, index) in imgs" :src="item" :key="'item--' + index" alt="" />
    </div>
    <Split />
    <img-row :readonly="false" v-model="imgs" @input="uploadListener" @delete="deleteHandler"></img-row>
    <router-view/>
  </div>
</template>

<script>
import {
  Split,
  ImgRow,
  ImgCell
} from 'components'
export default {
  name: 'App',
  components: {
    Split,
    ImgRow,
    ImgCell
  },
  data () {
    return {
      msg: '',
      imgs: [
        'https://cn.vuejs.org/images/bmqb.png',
        'https://cn.vuejs.org/images/bmqb.png',
        'https://cn.vuejs.org/images/bmqb.png'
      ]
    }
  },
  created () {},
  methods: {
    uploadListener (val) {
    },
    deleteHandler (val) {
    }
  }
}
</script>

<style>
.btn{
  font-size: 20px;
  margin: 20px;
}
.apps{
  width: 40px;
}
</style>
