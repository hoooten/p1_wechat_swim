<template>
  <div id="app" :style="{paddingTop: tabName !== 'com_center' ? '44px' : 0}">
    <head-bar
      v-if="!customerTitle"
      :title="title"
      :back-type="urlName || backFlag ? 'blue' : 'white'"
      @on-back="onBack"></head-bar>

    <router-view></router-view>

    <div v-if="tabName">
      <tabbar v-show="!module">
        <tabbar-item :selected="tabName === 'teach_point_nearby'" link="/">
          <img slot="icon" v-if="tabName === 'teach_point_nearby'" src="/static/images/bottom-tab/icon-location-blue.png">
          <img slot="icon" v-else src="/static/images/bottom-tab/icon-location-grey.png">
          <span slot="label">教点</span>
        </tabbar-item>
        <tabbar-item :selected="tabName === 'coach_qualify'" link="/coach/qualify">
          <img slot="icon" v-if="tabName === 'coach_qualify'" src="/static/images/bottom-tab/icon-qualify-blue.png">
          <img slot="icon" v-else src="/static/images/bottom-tab/icon-qualify-grey.png">
          <span slot="label">教练</span>
        </tabbar-item>

        <!--<tabbar-item :selected="tabName === 'null'" link="/community/index">
          <img slot="icon" src="/static/images/bottom-tab/icon-index-grey.png">
          <span slot="label">社区首页</span>
        </tabbar-item>-->

        <tabbar-item :selected="tabName === 'coach_join'" link="/join">
          <img slot="icon" v-if="tabName === 'coach_join'" src="/static/images/bottom-tab/icon-join-blue.png">
          <img slot="icon" v-else src="/static/images/bottom-tab/icon-join-grey.png">
          <span slot="label">加盟</span>
        </tabbar-item>
        <!--<tabbar-item :selected="tabName === 'com_center'" link="/user-center">
          <img slot="icon" v-if="tabName === 'com_center'" src="/static/images/bottom-tab/icon-center-blue.png">
          <img slot="icon" v-else src="/static/images/bottom-tab/icon-center-grey.png">
          <span slot="label">个人中心</span>
        </tabbar-item>-->
      </tabbar>

      <tabbar v-show="module">
        <tabbar-item :selected="tabName === 'community_index'" link="/community/index">
          <img v-if="tabName === 'community_index'" slot="icon" src="/static/images/bottom-tab/icon-index-blue.png">
          <img v-else slot="icon" src="/static/images/bottom-tab/icon-index-grey.png">
          <span slot="label">潜泳首页</span>
        </tabbar-item>
        <tabbar-item :selected="tabName === 'com_edit'" link="/community/posting">
          <img v-if="tabName === 'com_edit'" slot="icon" src="/static/images/bottom-tab/icon-edit-blue.png">
          <img v-else slot="icon" src="/static/images/bottom-tab/icon-edit-grey.png">
          <span slot="label">发帖</span>
        </tabbar-item>
        <tabbar-item :selected="tabName === 'com_center'" link="/user-center">
          <img v-if="tabName === 'com_center'" slot="icon" src="/static/images/bottom-tab/icon-center-blue.png">
          <img v-else slot="icon" src="/static/images/bottom-tab/icon-center-grey.png">
          <span slot="label">社区个人中心</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux';
  import {HeadBar} from '@/components';
  import {Utils} from '@/utils/utils';
  import {WxUtil} from '@/utils/wx-util';

  export default {
    name: 'app',
    components: {
      Tabbar,
      TabbarItem,
      HeadBar,
    },
    data(){
      return {
        customerTitle: false,   // 自定义头部
        showTab: true,    // 是否显示tab
        tabName: '',      // tab的标识符
        title: '',        // 导航栏标题
        urlName: '',      // 回退的路由名称
        module: '',       // 模块名称
        backFlag: false,  // 是否是回退到上一页，与urlName设置其一即可
      };
    },
    watch: {
      $route(to, from){
        if(to.meta){
          this.tabName = to.meta.tabName;
          this.title = to.query.title || to.meta.title;
          this.module = to.meta.module;
          this.backFlag = to.meta.back;
          this.urlName = '';
          this.customerTitle = to.meta.customer;

          if(to.meta.urlName){
            this.urlName = to.meta.urlName;
          }
        }
      },
    },
    created(){
      this.urlName = '';
      if(this.$route.meta){
        this.tabName = this.$route.meta.tabName;
        this.title = this.$route.query.title || this.$route.meta.title;
        this.module = this.$route.meta.module;
        this.backFlag = this.$route.meta.back;
        this.customerTitle = this.$route.meta.customer;

        if(this.$route.meta.urlName){
          this.urlName = this.$route.meta.urlName;
        }
      }
    },
    mounted(){
      // 开发环境登陆方式
      // this.$api.loginDemo({userNameOrEmailAddress: 'admin', password: '123qwe'})
      //   .then(resp => {
      //     if(resp.success){
      //       window.localStorage.setItem('token', resp.result.accessToken);
      //       window.localStorage.setItem('user_openidnn', resp.result.userId);
      //     }
      //   });
    },
    methods: {
      onBack(){
        if(this.urlName){
          this.$router.push({name: this.urlName});
        }else{
          this.$router.back();
        }
      },
    },
  }
</script>

<style lang="less">
  @import './assets/styles/common.less';

  /deep/ .weui-tabbar__icon{
    width: 16px;
    height: 16px;
  }
</style>
