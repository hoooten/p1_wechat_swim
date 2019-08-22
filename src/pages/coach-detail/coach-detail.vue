<template>
  <div>
    <head-bar
      title="教练详情"
      @on-back="onBack">
      <span class="collection" :class="{on: isCollect}" slot="right-btn" @click="onCollectCoach"></span>
    </head-bar>

    <div class="coach-head">
      <div class="head-l">
        <img class="img-position-center" :src="headImgUrl">
      </div>
      <div class="head-r">
        <div>
          <strong>{{coachData.name}}</strong>
          <span>
            <stars :score="averageScores"></stars>
          </span>
        </div>
        <p>性别：{{coachData.gender ? '男' : '女'}}, {{coachData.profile}}</p>
      </div>
    </div>

    <div class="group-wrp">
      <group label-width="5.5em" v-if="coachData">
        <cell>
          <span class="font-color-grey" slot="title">性别</span>
          <div class="content">{{coachData.gender ? '男' : '女'}}</div>
        </cell>
        <cell>
          <span class="font-color-grey" slot="title">手机</span>
          <div class="content">{{coachData.phone}}</div>
        </cell>
        <cell>
          <span class="font-color-grey" slot="title">地址</span>
          <div class="content">{{coachData.address}}</div>
        </cell>
        <cell>
          <span class="font-color-grey" slot="title">微信</span>
          <div class="content">{{coachData.wechat}}</div>
        </cell>
        <cell>
          <span class="font-color-grey" slot="title">出生年月</span>
          <div class="content">{{coachData.birthdate | formatDate}}</div>
        </cell>
        <cell>
          <span class="font-color-grey" slot="title">身高(cm)</span>
          <div class="content">{{coachData.height > 0 ? coachData.height : '-'}}</div>
        </cell>
        <cell>
          <span class="font-color-grey" slot="title">证书等级</span>
          <div class="content">{{coachData.certificateLevel}}教练证</div>
        </cell>
        <cell>
          <span class="font-color-grey" slot="title">职位</span>
          <div class="content">{{coachData.position}}</div>
        </cell>
        <cell>
          <span class="font-color-grey" slot="title">公司名称</span>
          <div class="content">{{coachData.company}}</div>
        </cell>
      </group>
    </div>

    <div class="padding-15" v-if="!isScored.id">
      <x-button :gradients="['#597AEE', '#596BEE']" @click.native="isShowComment = true">去评价</x-button>
    </div>

    <!-- 教点评论 -->
    <star-comment
      title="给教练打个分吧～"
      v-model="isShowComment"
      @on-comment="onCommentCoach"></star-comment>
  </div>
</template>

<script>
  import {Group, Cell, XButton} from 'vux';
  import {HeadBar, StarComment, Stars} from '@/components';

  export default {
    name: 'coach-detail',
    components: {
      Group,
      Cell,
      HeadBar,
      XButton,
      StarComment,
      Stars,
    },
    data(){
      return {
        isScored: {},     // 是否已评分
        averageScores: 0, // 平均分
        isShowComment: false,
        coachData: {},
        favorite: {},
        isCollect: false,
        headImgUrl: '',
      };
    },
    computed: {
      id(){
        return this.$route.params.id;
      },

      // headImgUrl(){
      //   return window.localStorage.getItem('head_img');
      // },
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
              this.averageScores = resp.result.averageScore;
              this.isScored = resp.result.score || {};
              this.headImgUrl = resp.result.userPhoto;

              // 是否已收藏教练
              if(resp.result.favorite){
                this.favorite = resp.result.favorite;
                this.isCollect = true;
              }else{
                this.isCollect = false;
              }
            }
            this.$vux.loading.hide();
          });
      },

      onBack(){
        this.$router.back();
      },

      /** 收藏教练 */
      onCollectCoach(){
        if(!this.isCollect){
          this.$vux.loading.show();
          this.$api.collectCoach({techId: this.id})
            .then(resp => {
              if(resp.success){
                this.getCoachData();
                this.$vux.toast.show('收藏成功！');
                // this.isCollect = true;
              }
              this.$vux.loading.hide();
            });
        }else{
          this.cancelCollectCoach();
        }
      },

      /** 取消收藏教练 */
      cancelCollectCoach(){
        this.$vux.loading.show();
        this.$api.cancelCollectCoach({id: this.favorite.id})
          .then(resp => {
            if(resp.success){
              this.getCoachData();
              this.$vux.toast.show('已取消收藏');
              // this.isCollect = false;
            }
            this.$vux.loading.hide();
          });
      },

      /** 评价教练 */
      onCommentCoach(scores){
        if(!this.isScored.id){
          this.$vux.loading.show();
          this.$api.commitCoachComment({score: scores, techId: this.coachData.id})
            .then(resp => {
              if(resp.success){
                this.$vux.toast.show('感谢您的支持！');
                this.getCoachData();
              }
              this.$vux.loading.hide();
            });
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .coach-head{
    display: flex;
    margin-top: 10px;
    padding: 12px;
    background: #fff;

    .head-l{
      width: 51px;
      height: 51px;
      border-radius: 51px;
      overflow: hidden;

      img{
        width: 100%;
        min-height: 51px;
      }
    }
    .head-r{
      flex: 1;
      margin-left: 15px;

      strong{
        vertical-align: middle;
      }
      p{
        margin-top: 8px;
        color: #666;
        font-size: 13px;
      }
    }
  }
  .stars-img{
    width: 10px;
    height: auto;
    vertical-align: middle;
  }
  .group-wrp{
    margin-top: 10px;
    padding-right: 12px;
    background: #fff;
  }
  .collection{
    display: inline-block;
    width: 16px;
    height: 17px;
    background: url("/static/images/collection-empty.png") no-repeat center center;
    background-size: 16px auto;

    &.on{
      background: url("/static/images/collection-flag.png") no-repeat center center;
      background-size: 16px auto;
    }
  }

  /deep/ .weui-cell{
    padding: 15px 2px 15px 15px;
  }
  /deep/ .weui-cells{
    margin-top: 0;
  }
  /deep/ .weui-cells:before,
  /deep/ .weui-cells:after{
    border-top: none;
    border-bottom: none;
  }
  /deep/ .weui-cell__ft{
    color: #323232;
  }
</style>
