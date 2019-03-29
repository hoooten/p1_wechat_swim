<template>
  <div id="app">
    <router-view></router-view>

    <tabbar>
      <tabbar-item @on-item-click="onChangeTab()" :selected="tabIndex === 0" link="/">
        <img slot="icon" src="/static/images/bottom-tab/icon-location.png">
        <span slot="label">附近教点</span>
      </tabbar-item>
      <tabbar-item @on-item-click="onChangeTab()" :selected="tabIndex === 1" link="/product/introduce">
        <img slot="icon" src="/static/images/bottom-tab/icon-location.png">
        <span slot="label">教练资质</span>
      </tabbar-item>
      <tabbar-item @on-item-click="onChangeTab()" :selected="tabIndex === 2" link="/">
        <img slot="icon" src="/static/images/bottom-tab/icon-location.png">
        <span slot="label">资料下载</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem, Panel} from 'vux';

  export default {
    name: 'app',
    components: {
      Tabbar,
      TabbarItem,
      Panel,
    },
    data(){
      return {
        tabIndex: 0,
      };
    },
    methods: {
      onChangeTab(index){
        this.tabIndex = index;
      },
    },
  }
</script>

<style lang="less">
  @import './assets/styles/common.less';
</style>
