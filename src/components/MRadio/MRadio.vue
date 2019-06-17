<template>
  <div>
    <label v-for="(option, idx) of options" :key="idx" class="lb-wrp" :class="{on: checked == option.value}" :style="{'margin-right': `${marginRight}px`}">
      <input type="radio" :value="option.value" @click="onChange($event)"/>{{option.name}}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'm-radio',
    props: {
      value: {
        type: String | Number,
        default: '',
      },
      options: {
        type: [Array, Object],
        required: true,
      },
      // defaultOption: {
      //   type: String | Number,
      //   default: '',
      // },
      marginRight: {
        type: Number,
        default: 20,
      }
    },

    data(){
      return {
        checked: '',
      };
    },
    watch: {
      value(cur){
        this.checked = cur;
      },
    },
    // mounted(){
    //   this.checked = this.defaultOption;
    // },
    methods: {
      onChange(event){
        this.checked = event.target.value;
        this.$emit('input', event.target.value);
      },
    },
  }
</script>

<style lang="less" scoped>
  .lb-wrp{
    position: relative;
    display: inline-block;
    /*margin-right: 10px;*/
    padding-left: 24px;
    vertical-align: middle;
    font-size: 16px;
    background: url("/static/images/components/btn_normal_rentcar@2x.png") no-repeat left center;
    background-size: 20px 20px;

    input{
      position: absolute;
      opacity: 0;
    }
    &.on{
      background: url("/static/images/components/btn_hl_rentcar@2x.png") no-repeat left center;
      background-size: 20px 20px;
    }
  }
  /*.checkbox-label{
    background: url("/static/images/components/nocheck_square.png") no-repeat left center;
    background-size: 22px 22px;

    &.on{
      background: url("/static/images/components/nocheck_square.png") no-repeat left center;
      background-size: 22px 22px;
    }
  }
  .radio-label{

  }*/
</style>
