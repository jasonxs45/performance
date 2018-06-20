<template>
  <label class="textarea-wrapper">
    <textarea
      :placeholder="placeholder"
      :name="name"
      :value="value"
      :disabled="disabled"
      :readonly="readonly"
      @input="inputHandler"
      @change="changeHandler"
      class="textarea"
    >
    </textarea>
  </label>
</template>
<script>
export default {
  name: 'XTextarea',
  props: {
    placeholder: {
      type: String
    },
    name: {
      type: String
    },
    value: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    readonly: {
      type: Boolean
    }
  },
  methods: {
    changeHandler (e) {
      this.$emit('change', e.target.value)
    },
    inputHandler (e) {
      this.$emit('input', e.target ? e.target.value : e)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.textarea-wrapper{
  border-radius: 4px;
  width:inherit;
  height: p2r(200);
  display: inline-block;
  border:1px solid lighten($primary-color, 10%);
  background: lighten($primary-color, 38%);
  .textarea{
    padding:p2r(20);
    font-size: p2r(24);
    color:$text-color;
    border:none;
    outline: none;
    width:100%;
    height:100%;
    border-radius: inherit;
    text-align: inherit;
    font-size: inherit;
    line-height: inherit;
    font-family: inherit;
    min-height:inherit;
    color:inherit;
    resize: none;
    background: inherit;
    &::-webkit-input-placeholder{
      color:lighten($primary-color, 20%);
      font-weight: 200;
    }
  }
}
</style>
