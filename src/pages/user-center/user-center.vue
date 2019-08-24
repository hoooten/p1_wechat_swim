<template>
  <div>
    <div class="base-head">
      <div class="base-title">个人中心</div>
      <div class="avatar-row">
        <div class="rd-avt">
          <img class="img-position-center" :src="headImgUrl">
        </div>
        <div class="us-nick">
          <div>
            <strong>{{nickName}}</strong>
            <img src="/static/images/icon-vip@2x.png">
          </div>
          <div class="us-id">ID：120304120</div>
        </div>
        <div class="sign-tag">
          <img src="/static/images/icon-point-white@2x.png">
          <span>签到送积分</span>
        </div>
      </div>
    </div>

    <div class="usr-card-out">
      <div class="card-row">
        <div class="usr-card-item">
          <p>我的订单</p>
          <strong>5</strong>
        </div>
        <div class="usr-card-item">
          <p>我的收藏</p>
          <strong>15</strong>
        </div>
        <div class="usr-card-item">
        <p>优惠券</p>
        <strong>6</strong>
      </div>
      </div>
    </div>

    <div class="link-wrp" v-if="userInfo.user">
      <group>
      <!--<cell value-align="right" is-link :link="`/user/posting-history/${userInfo.user.id}`">
        <div class="cell-tt" slot="title">
          <img src="/static/images/my-posting.png">
          <span>我的发帖</span>
        </div>
        <div class="posting-count">{{userInfo.topicCount}}</div>
      </cell>-->
      <cell value-align="right" is-link>
        <div class="cell-tt" slot="title">
          <img src="/static/images/my-vip.png">
          <span>实名认证</span>
        </div>
        <div>未认证</div>
      </cell>
      <cell value-align="right" is-link>
        <div class="cell-tt" slot="title">
          <img src="/static/images/my-share.png">
          <span>分享记录</span>
        </div>
      </cell>
      </group>
    </div>

    <div class="link-wrp">
      <group>
        <cell value-align="right" is-link>
          <div class="cell-tt" slot="title">
            <img src="/static/images/my-info.png">
            <span>个人信息</span>
          </div>
          <div>完善个人信息</div>
        </cell>
        <cell value-align="right" is-link>
          <div class="cell-tt" slot="title">
            <img src="/static/images/my-server.png">
            <span>客服中心</span>
          </div>
        </cell>
        <cell value-align="right" is-link>
          <div class="cell-tt" slot="title">
            <img src="/static/images/my-question.png">
            <span>常见问题</span>
          </div>
        </cell>
      </group>
    </div>

    <!--<div class="user-head">
      <div class="avatar">
        <span>
          <img class="img-position-center" :src="headImgUrl">
        </span>
      </div>
      <div class="nick-name">{{nickName}}</div>
    </div>

    <div class="bg-color-white base-cell" v-if="userInfo.user">
      <group>
        <cell value-align="right" is-link :link="`/user/posting-history/${userInfo.user.id}`">
          <div class="cell-tt" slot="title">
            <img src="/static/images/user-center/icon-message.png">
            <span>我的发帖 {{userInfo.topicCount}}</span>
          </div>
          <div>
            <span>查看</span>
          </div>
        </cell>
        <cell value-align="right" is-link link="/join">
          <div class="cell-tt" slot="title">
            <img src="/static/images/bottom-tab/icon-join-blue.png">
            <span>加盟记录</span>
          </div>
          <div>
            <span>查看</span>
          </div>
        </cell>
      </group>
    </div>-->
  </div>
</template>

<script>
  import {Cell, Group} from 'vux';

  export default {
    name: 'user-center',
    components: {
      Cell,
      Group,
    },
    data(){
      return {
        userInfo: {},
        // userImg: '',
      };
    },
    computed: {
      // 用户头像
      headImgUrl(){
        return window.localStorage.getItem('head_img');
      },

      nickName(){
        return window.localStorage.getItem('nick_name');
      },
    },
    created(){
      this.getUserData();
    },
    methods: {
      getUserData(){
        this.$vux.loading.show();
        this.$api.getUserInfo({id: window.localStorage.getItem('user_id')})
          .then(resp => {
            if(resp.success){
              this.userInfo = resp.result;
              // this.userImg = resp.result.user.photoURL ? resp.result.user.photoURL : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554999782090&di=c4c31edac68aab4c36c28cf89d3f4361&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201807%2F08%2F030411wzuptoo5o97j8z4v.jpg';
            }
            this.$vux.loading.hide();
          });
      },
    },
  }
</script>

<style lang="less" scoped>
  .base-head{
    width: 100%;
    height: 171px;
    background: url("/static/images/user-head-bg@2x.png") no-repeat center;
    background-size: cover;
  }
  .base-title{
    line-height: 42px;
    color: #fff;
    text-align: center;
    font-size: 16px;
  }
  .avatar-row{
    display: flex;
    position: relative;
    padding: 10px 15px;
  }
  .rd-avt{
    width: 51px;
    height: 51px;
    overflow: hidden;
    border: 1px solid #fff;
    border-radius: 50%;
  }
  .us-nick{
    flex: 1px;
    margin-left: 18px;
    color: #fff;

    strong{
      font-size: 16px;
      vertical-align: middle;
    }
    img{
      width: 16px;
      height: auto;
      margin-left: 10px;
      vertical-align: middle;
    }
    .us-id{
      margin-top: 8px;
      font-size: 12px;
    }
  }
  .sign-tag{
    position: absolute;
    right: 0;
    top: 10px;
    padding: 11px 12px 11px 16px;
    color: #fff;
    background: RGBA(69, 87, 189, 0.6);
    border-radius: 20px 0 0 20px;

    img{
      position: relative;
      top: -2px;
      width: 13px;
      height: auto;
      margin-right: 7px;
      vertical-align: middle;
    }
    span{
      font-size: 13px;
    }
  }
  .usr-card-out{
    position: relative;
    z-index: 1;
    margin-top: -52px;
    padding: 0 12px;

    .card-row{
      display: flex;
      padding: 20px 0;
      box-shadow: 1px 0 9px 1px rgba(102, 102, 102, 0.3);
      background: #fff;
      border-radius: 3px;

      .usr-card-item{
        flex: 1px;
        text-align: center;
        border-right: 1px solid #C9C7C7;
        &:last-child{
          border-right: none;
        }
        p{
          color: #999;
          font-size: 12px;
        }
        strong{
          margin-top: 12px;
          font-size: 23px;
        }
      }
    }
  }
  .link-wrp{
    margin-top: 10px;
    background: #ffff;
  }
  .cell-tt{
    img{
      width: 19px;
      height: auto;
      margin-right: 15px;
      vertical-align: middle;
    }
    span{
      font-size: 15px;
      vertical-align: middle;
    }
  }
  .posting-count{
    color: #FCA900;
    font-size: 15px;
    font-weight: bold;
  }

  /deep/ .weui-cell{
    padding: 20px 15px;
  }


  /*.user-head{*/
    /*padding: 30px 0;*/
    /*text-align: center;*/
    /*background: #dd6961;*/

    /*.avatar{*/
      /*span{*/
        /*display: inline-block;*/
        /*width: 50px;*/
        /*height: 50px;*/
        /*border-radius: 50%;*/
        /*border: 1px solid #fff;*/
        /*overflow: hidden;*/
      /*}*/
    /*}*/
    /*.nick-name{*/
      /*margin-top: 10px;*/
      /*color: #fff;*/
      /*font-size: 18px;*/
    /*}*/
  /*}*/
</style>
