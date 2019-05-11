<!--
标题导航组件：
# props:
  title: 标题
  head-background: 背景颜色（默认为#fff）
  back-type: 返回箭头颜色，可选blue和white，当返回按钮设置文本时，需要将该属性设为空
  back-text: 返回按钮文本内容
  custom-icon: 是否设置自定义返回图标（默认为false)
  set-border: 是否设置下边框（默认为true);

# events:
  on-back: 返回按钮事件，无返回值
-->

<template>
  <div>
    <x-header class="head-bar" :style="{backgroundColor: headBackground}" :class="{'vux-1px-b': setBorder}" :left-options="{backText: ''}">
      <span v-if="backType === 'white' && !customIcon && !backText" class="icon-back-white" @click="onBack" slot="overwrite-left"></span>
      <span v-if="backType === 'blue' && !customIcon && !backText" class="icon-back-blue" @click="onBack" slot="overwrite-left"></span>
      <span v-if="backText && !customIcon" class="back-txt" @click="onBack" slot="overwrite-left">{{backText}}</span>
      <span v-if="customIcon" slot="overwrite-left">
        <slot name="icon"></slot>
      </span>
      <div class="text-overflow title" :style="{color: headBackground === 'transparent' ? '#fff' : '#323232'}" slot="overwrite-title">{{title}}</div>
    </x-header>
  </div>
</template>

<script>
  import {XHeader} from 'vux';

  export default {
    name: 'head-bar',
    components: {
      XHeader,
    },
    props: {
      title: String,
      headBackground: {
        default: '#fff',
        type: String,
      },
      // 可选值：blue, white或者为空
      backType: {
        default: 'blue',
        type: String,
      },
      // 文本按钮
      backText: String,
      // 自定义返回图标或文本内容，slot为icon
      customIcon: {
        type: Boolean,
        default: false,
      },
      setBorder: {
        type: Boolean,
        default: true,
      }
    },
    methods: {
      onBack(){
        /*if(!this.backText && !this.customIcon && window.history.length <= 1){
          window.location.href = this.$store.state.WAP_HOST;
        }*/
        this.$emit('on-back');
      },
    }
  }
</script>

<style lang="less" scoped>
  /*@import '../../assets/styles/color.less';*/

  .head-bar{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 44px;
    z-index: 99;
  }
  .icon-back-white,
  .icon-back-blue{
    position: relative;
    top: -3px;
    display: inline-block;
    width: 12px;
    height: 20px;
    vertical-align: middle;
  }
  /*.icon-back-white{
    background: url("/static/images/search/icon-back-white@2x.png") no-repeat center center;
    background-size: 12px 20px;
  }*/
  .icon-back-blue{
    background: url("/static/images/components/icon-back-blue@2x.png") no-repeat center center;
    background-size: 12px 20px;
  }
  .back-txt{
    position: relative;
    top: -5px;
    color: @color-blue;
  }
  .title{
    line-height: 40px;
    color: #323232;
    font-size: 18px;
    text-align: center;
  }

  /** 样式覆盖 */
  /deep/ .vux-header-left{
    left: 15px;
    top: 12px;
  }
  /deep/ .vux-header-title-area{
    margin: 0 65px;
  }
</style>
