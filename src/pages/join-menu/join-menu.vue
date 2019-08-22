<template>
  <div>
    <div class="border-box">
      <div class="edit-item" v-if="techPointData">
        <div class="edit-title">
          <h3 style="border-color: #477AF8;">教点编辑</h3>
        </div>
        <m-panel
          cover="/static/images/tech-point-switch.png"
          :title="techPointData.techPoint.name"
          @on-click="onLink2PointDetail(techPointData.techPoint.id)">
          <div class="slt-con" slot="content">
            <div style="flex: 7;">
              <img class="star-sm" v-for="n in 5" src="/static/images/icon-star-yellow.png">
            </div>
            <div style="flex: 3; text-align: right">
              <span class="edit-btn" @click="onToEdit(techPointData.techPoint.id, 'TeachingPointJoin', '教点编辑')">编辑</span>
            </div>
          </div>
        </m-panel>
      </div>

      <div class="edit-item" v-if="coachData">
        <div class="edit-title">
          <h3 style="border-color: #724AFE;">教练信息编辑</h3>
        </div>
        <m-panel
          cover="/static/images/coach-join-switch.png"
          :title="coachData.tech.name"
          @on-click="onLink2Detail(coachData.tech.id)">
          <div class="slt-con" slot="content">
            <div style="flex: 7;">
              <img class="star-sm" v-for="n in 5" src="/static/images/icon-star-yellow.png">
            </div>
            <div style="flex: 3; text-align: right">
              <span class="edit-btn" @click="onToEdit(coachData.tech.id, 'CoachJoin', '教练编辑')">编辑</span>
            </div>
          </div>
        </m-panel>
      </div>

      <div class="padding-15 grid-box" v-if="isCoachJoin == 0 || isPointJoin == 0">
        <div class="join-title">选择加盟对象</div>
        <router-link v-if="isPointJoin == 0" to="/join/point" class="block-card tech-card">教点加盟</router-link>
        <router-link v-if="isCoachJoin == 0" to="/join/coach" class="block-card coach-card">教练加盟</router-link>
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
        // techPointCover: '',
        coachData: null,
        isCoachJoin: 0,
        isPointJoin: 0,
      };
    },
    computed: {
      // 用户头像
      // headImgUrl(){
      //   return window.localStorage.getItem('head_img');
      // },
    },
    created(){
      this.getJoinData();
      this.checkUserJoinStatus();
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

      /** 校验用户是否有加盟记录 */
      checkUserJoinStatus(){
        this.$api.checkUserJoinStatus()
          .then(resp => {
            if(resp.success){
              this.isPointJoin = resp.result.isJoinAsTech;
              this.isCoachJoin = resp.result.isJoinInPoint;
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
    padding-top: 40px;
    padding-bottom: 20px;
    background: #fff;
  }
  .block-card{
    display: block;
    padding-top: 125px;
    margin-top: 30px;
    color: #323232;
    text-align: center;
    box-sizing: border-box;

    &.tech-card{
      background: url("/static/images/tech-point-switch.png") no-repeat center top;
      background-size: 118px auto;
    }
    &.coach-card{
      background: url("/static/images/coach-join-switch.png") no-repeat center top;
      background-size: 118px auto;
    }
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
      padding: 2px 15px;
      vertical-align: middle;
      border-radius: 3px;
      border: 1px solid #DCDCDC;
    }
  }
  .join-title{
    position: relative;
    color: #666;
    text-align: center;

    &::before, &::after{
      content: '';
      position: absolute;
      top: 50%;
      width: 67px;
      height: 1px;
      background: #C9C7C7;
    }
    &::before{
      left: 15%;
    }
    &::after{
      right: 15%;
    }
  }
  .star-sm{
    width: 10px;
    height: auto;
    vertical-align: middle;
  }
</style>
