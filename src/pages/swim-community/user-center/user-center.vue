<template>
  <div>
    <div class="wx-name" v-if="userInfo.user">
      <div class="user-cover">
        <img class="img-position-center" :src="headImgUrl">
      </div>
      <div class="user-nick">
        <div>
          <strong>{{nickName}}</strong>
        </div>
      </div>
    </div>

    <div class="bg-color-white base-cell" v-if="userInfo.user">
      <group>
        <cell value-align="right" is-link :link="`/user/posting-history/${userInfo.user.id}`">
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

    <div class="edit-item" v-if="techPointData">
      <div class="edit-title">
        <h3 style="border-color: #6ebb27;">教点编辑</h3>
      </div>
      <m-panel
        :cover="techPointCover"
        :title="techPointData.techPoint.name"
        @on-click="onLink2PointDetail(techPointData.techPoint.id)">
        <div class="slt-con" slot="content">
          <div style="flex: 8;">
            <span>{{techPointData.techPoint.address}}</span>
          </div>
          <div style="flex: 2; text-align: right">
            <span class="edit-btn" style="background: #6ebb27;" @click="onToEdit(techPointData.techPoint.id, 'TeachingPointJoin', '教点编辑')">编辑</span>
          </div>
        </div>
      </m-panel>
    </div>

    <div class="edit-item" v-if="coachData">
      <div class="edit-title">
        <h3 style="border-color: #0097FF;">教练信息编辑</h3>
      </div>
      <m-panel
        :cover="headImgUrl"
        :title="coachData.tech.name"
        @on-click="onLink2Detail(coachData.tech.id)">
        <div class="slt-con" slot="content">
          <div style="flex: 8;">
            <span class="star-group">
              <img v-for="i in 3" src="/static/images/common/icon-star-yellow.png">
            </span>
            <span>{{coachData.tech.certificateLevel}}</span>
          </div>
          <div style="flex: 2; text-align: right">
            <span class="edit-btn" style="background: #0097FF;" @click="onToEdit(coachData.tech.id, 'CoachJoin', '教练编辑')">编辑</span>
          </div>
        </div>
      </m-panel>
    </div>
  </div>
</template>

<script>
  import {Cell, Group} from 'vux';
  import {MPanel} from '@/components';

  export default {
    name: 'user-center',
    components: {
      Cell,
      Group,
      MPanel,
    },
    data(){
      return {
        userInfo: {},
        userImg: '',
        techPointData: null,
        techPointCover: '',
        coachData: null,
        coachCover: '',
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
              this.userImg = resp.result.user.photoURL ? resp.result.user.photoURL : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554999782090&di=c4c31edac68aab4c36c28cf89d3f4361&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201807%2F08%2F030411wzuptoo5o97j8z4v.jpg';
            }
            this.$vux.loading.hide();
          });

        // 获取教点数据
        this.$api.getTeachingWithNearby({CurrentUser: true})
          .then(resp => {
            if(resp.success){
              const item = resp.result.items[0];

              this.techPointData = item;

              if(item.photos[0]){
                this.downloadPointCover(item.photos[0].sitePhototId);
              }
            }
          });

        // 获取加盟的教练信息
        this.$api.getCoachList({CurrentUser: true})
          .then(resp => {
            if(resp.success){
              this.coachData = resp.result.items[0];
            }
          });
      },

      /** 查看教练详情 */
      onLink2Detail(coachId){
        this.$router.push({name: 'CoachDetail', params: {id: coachId}});
      },

      /** 查看教点详情 */
      onLink2PointDetail(pointId){
        this.$router.push({name: 'TeachingPointDetail', params: {id: pointId}});
      },

      /** 路由到编辑页面 */
      onToEdit(id, routeName, title){
        this.$router.push({name: routeName, query: {title: title, id: id}});
      },

      /** 下载教点封面图 */
      downloadPointCover(sitePhotoId){
        this.$api.downloadImage({id: sitePhotoId})
          .then(resp => {
            if(resp.result){
              const base64 = `data:image/png;base64,${resp.result}`;

              this.techPointCover = base64;
            }
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
  .edit-item{
    padding-top: 10px;
    margin-top: 10px;
    background: #fff;

    .edit-title{
      padding-left: 15px;

      h3{
        height: 18px;
        line-height: 18px;
        padding-left: 10px;
        font-size: 16px;
        border-left: 3px solid @bg-green;
      }
    }
  }
  .star-group{
    margin-right: 10px;

    img{
      width: 18px;
      height: 18px;
      vertical-align: top;
    }
  }
  .slt-con{
    display: flex;

    .edit-btn{
      display: inline-block;
      padding: 2px 10px;
      font-size: 16px;
      color: #fff;
      vertical-align: middle;
      border-radius: 2px;
    }
  }
</style>
