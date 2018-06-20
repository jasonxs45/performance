<template>
<container>
  <row
    :value="value"
    class="img-row"
  >
  <div v-if="readonly" class="zs">
    <img-cell
      v-for="(img, index) in value"
      :key="'img-'+index"
    >
      <img :src="img" @click="preview(img, value)"/>
    </img-cell>
  </div>
  <div v-else>
    <img-cell
      v-for="(img, index) in images.localIds"
      :key="'img-'+index"
      :del="!readonly"
      :index="index"
      :count="images.localIds.length"
      @delete="deleteHandler"
    >
      <img :src="img" @click="preview(img, images.localIds)"/>
    </img-cell>
    <div
      v-if="showUpload"
      class="img-cell"
    >
      <div
        class="upload-btn"
        @click="uploadImgs"
      >
        <Icon name="camera"/>
      </div>
    </div>
  </div>
  </row>
</container>
</template>
<script>
import Container from 'components/container'
import Row from 'components/row'
import Icon from 'components/icon'
import ImgCell from './ImgCell'
import { wxConf } from 'common/utils'
export default {
  name: 'ImgRow',
  components: {
    Container,
    Row,
    Icon,
    ImgCell
  },
  props: {
    value: {
      type: Array
    },
    readonly: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      images: {
        localIds: [],
        serverUrls: []
      },
      finish: true
    }
  },
  computed: {
    showUpload () {
      if (this.readonly) {
        return !this.readonly
      } else {
        return this.images.localIds.length < this.limit
      }
    },
    uploadFinish () {
      if (this.readonly) {
        return true
      } else {
        return this.finish
      }
    }
  },
  methods: {
    preview (current, urls) {
      wxConf._previewImg({
        current,
        urls
      })
    },
    uploadImgs () {
      if (!this.finish) {
        return
      }
      this.finish = false
      wxConf._wxUpload(this.limit - this.images.localIds.length, localIds => {
        this.images.localIds = this.images.localIds.concat(localIds)
        this.$emit('localImg', this.images.localIds)
      }, serverUrls => {
        this.images.serverUrls = this.images.serverUrls.concat(serverUrls)
        this.$emit('input', this.images.serverUrls)
        this.finish = true
      })
    },
    deleteHandler (index) {
      if (!this.uploadFinish) {
        return
      }
      this.images.localIds.splice(index, 1)
      this.images.serverUrls.splice(index, 1)
      this.$emit('input', this.images.serverUrls)
      this.$emit('delete', this.images.serverUrls)
    }
  }
}
</script>
<style lang="scss">
@import "~common/scss/variables.scss";
.img-row{
  margin: {
    left: p2r(-20) !important;
    right: p2r(-20) !important;
  }
  font-size: 0;
  .img-cell{
    width: 20%;
    padding-top: 20%;
    position: relative;
  }
  .upload-btn{
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    border:1px dashed $primary-color;
    border-radius: 4px;
    text-align: center;
    color:lighten($primary-color, 15%);
    .iconfont{
      position: absolute;
      width: p2r(80);
      height: p2r(80);
      font-size: p2r(42);
      left: 50%;
      top: 50%;
      margin-left: p2r(-40);
      margin-top: p2r(-40);
      line-height: p2r(80);
    }
  }
}
</style>
