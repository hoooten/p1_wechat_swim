<template>
  <div>
    <div class="padding-tb-15 coach-img">
      <img :src="headImgUrl">
    </div>

    <group label-width="5.5em" v-if="coachData">
      <cell primary="content" title="姓名：">
        <div class="content">{{coachData.name}}</div>
      </cell>
      <cell primary="content" title="性别：">
        <div class="content">{{coachData.gender ? '男' : '女'}}</div>
      </cell>
      <cell primary="content" title="手机：">
        <div class="content">{{coachData.phone}}</div>
      </cell>
      <cell primary="content" title="地址：">
        <div class="content">{{coachData.address}}</div>
      </cell>
      <cell primary="content" title="微信：">
        <div class="content">{{coachData.wechat}}</div>
      </cell>
      <cell primary="content" title="出生年月：">
        <div class="content">{{coachData.birthdate | formatDate}}</div>
      </cell>
      <cell primary="content" title="身高(cm)：">
        <div class="content">{{coachData.height > 0 ? coachData.height : '-'}}</div>
      </cell>
      <cell primary="content" title="证书等级：">
        <div class="content">{{coachData.certificateLevel}}</div>
      </cell>
      <cell primary="content" title="职位：">
        <div class="content">{{coachData.position}}</div>
      </cell>
      <cell primary="content" title="公司名称：">
        <div class="content">{{coachData.company}}</div>
      </cell>
      <cell primary="content" title="简介：">
        <div class="content">{{coachData.profile}}</div>
      </cell>
    </group>
  </div>
</template>

<script>
  import {Group, Cell} from 'vux';

  export default {
    name: 'coach-detail',
    components: {
      Group,
      Cell,
    },
    data(){
      return {
        coachData: {},
      };
    },
    computed: {
      id(){
        return this.$route.params.id;
      },

      headImgUrl(){
        return window.localStorage.getItem('head_img');
      },
    },
    created(){
      this.getCoachData();
    },
    methods: {
      getCoachData(){
        this.$vux.loading.show();
        this.$api.getCoachDetail({id: this.id})
          .then(resp => {
            if(resp.success){
              this.coachData = resp.result.tech;
            }
            this.$vux.loading.hide();
          });
      },
    },
  }
</script>

<style lang="less" scoped>
  .coach-img{
    text-align: center;

    img{
      width: 100px;
      height: 100px;
      border-radius: 100px;
    }
  }
  .content{
    color: #323232;
  }
</style>
