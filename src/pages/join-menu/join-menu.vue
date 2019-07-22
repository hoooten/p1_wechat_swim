<template>
  <div>
    <div class="border-box">
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

      <div class="padding-15 grid-box" v-if="(coachData && !coachData.tech) || (techPointData && !techPointData.techPoint)">
        <router-link v-if="coachData && !coachData.tech" to="/join/coach" class="block-card bg-red">教练加盟</router-link>
        <router-link v-if="techPointData && !techPointData.techPoint" to="/join/point" class="block-card bg-green">教点加盟</router-link>
      </div>
    </div>
  </div>
</template>

<script>

  import {MPanel} from '@/components';

  export default {
    name: 'main-menu',
    components: {
      MPanel,
    },
    data(){
      return {
        techPointData: null,
        techPointCover: '',
        coachData: null,
      };
    },
    computed: {
      // 用户头像
      headImgUrl(){
        return window.localStorage.getItem('head_img');
      },
    },
    created(){
      this.getJoinData();
    },
    methods: {
      getJoinData(){
        // 获取教点数据
        this.$vux.loading.show('加载中...');
        this.$api.getTeachingWithNearby({CurrentUser: true})
          .then(resp => {
            if(resp.success){
              const item = resp.result.items[0];

              this.techPointData = item;

              if(item.photos[0]){
                this.downloadPointCover(item.photos[0].sitePhototId);
              }
              this.$vux.loading.hide();
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
  .grid-box{
    margin-top: 10px;
    background: #fff;
  }
  .block-card{
    display: block;
    width: 80%;
    margin: 0 auto 10px;
    padding: 25px 15px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .bg-blue{
    background: @bg-blue;

    &:active{
      background: @color-blue;
    }
  }
  .bg-red{
    background: @bg-red;

    &:active{
      background: @color-red;
    }
  }
  .bg-green{
    background: @bg-green;

    &:active{
      background: @color-green;
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
