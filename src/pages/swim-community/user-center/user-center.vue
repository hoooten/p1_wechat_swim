<template>
  <div>
    <div class="wx-name" v-if="userInfo.user">
      <div class="user-cover">
        <img class="img-position-center" :src="userImg">
      </div>
      <div class="user-nick">
        <div>
          <strong>{{userInfo.user.userName}}</strong>
        </div>
      </div>
    </div>

    <div class="bg-color-white base-cell" v-if="userInfo.user">
      <group>
        <cell value-align="right" is-link :to="`/user/posting-history/${userInfo.user.id}`">
          <div class="cell-tt" slot="title">
            <img src="/static/images/user-center/icon-message.png">
            <span>我的发帖</span>
          </div>
          <div>
            <span>{{userInfo.topicCount}}</span>
          </div>
        </cell>
      </group>
    </div>
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
        userImg: '',
      };
    },
    created(){
      this.getUserData();
    },
    methods: {
      getUserData(){
        this.$vux.loading.show();
        this.$api.getUserInfo()
          .then(resp => {
            if(resp.success){
              this.userInfo = resp.result;
              this.userImg = resp.result.profilePictureId ? resp.result.profilePictureId : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554999782090&di=c4c31edac68aab4c36c28cf89d3f4361&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201807%2F08%2F030411wzuptoo5o97j8z4v.jpg';
            }
            this.$vux.loading.hide();
          });
      },
    },
  }
</script>

<style lang="less" scoped>
  .wx-name{
    display: flex;
    margin-top: 10px;
    padding: 5px 15px;
    background: #fff;

    .user-cover{
      width: 48px;
      height: 48px;
      overflow: hidden;
      border-radius: 5px;

      img{
        width: 100%;
        height: auto;
        vertical-align: middle;
        border-radius: 5px;
      }
    }
    .user-nick{
      flex: 1;
      margin-left: 10px;

      strong{
        font-size: 15px;
      }
    }
  }
  .cell-tt{
    img{
      width: 24px;
      height: auto;
      vertical-align: middle;
    }
  }
</style>
