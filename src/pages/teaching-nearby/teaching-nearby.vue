<template>
  <div>
    <div class="margin-bottom-10" v-for="(itm, idx) of teachPoints" :key="idx">
      <m-panel
        class="margin-bottom-10"
        :cover="pointAvatars[idx]"
        :title="itm.techPoint.name"
        @on-click="onLink2Deatil(itm.techPoint.id)">
        <div class="point-addr" slot="content" @click="onShowMap(itm.techPoint.lat, itm.techPoint.lon, itm.techPoint.address)">
          <p>{{itm.techPoint.address}}</p>
        </div>
      </m-panel>
    </div>
    <div class="load-more">
      <load-more v-if="!loadingAll" tip="正在加载"></load-more>
      <load-more v-if="loadingAll" tip="暂无更多数据" :show-loading="false"></load-more>
    </div>
  </div>
</template>

<script>
  import {MPanel} from '@/components';
  import {LoadMore} from 'vux';
  import {WxUtil} from "@/utils/wx-util";

  export default {
    name: 'teaching-nearby',
    components: {
      MPanel,
      LoadMore,
    },
    data(){
      return {
        q: {
          Lat: '',
          Lon: '',
          SkipCount: 0,
          MaxResultCount: 20,
        },
        teachPoints: [],
        pointAvatars: [],
        loadingAll: false,
        loadingMoreFlag: true,
      };
    },
    created(){
      WxUtil.getUserLocation(resp => {
        if(resp){
          this.q.Lat = resp.lat;
          this.q.Lon = resp.lon;
          this.teachPoints = [];
          this.getTeachingList();
        }else{
          this.$vux.alert.show({
            content: '您拒绝了授权获取地理位置',
          });
        }
      });
    },
    mounted(){
      this.getTeachingList();
      this.pullUpLoadingMore();
    },
    destroyed(){
      window.removeEventListener('scroll', function () {});
    },
    methods: {
      getTeachingList(){
        this.$api.getTeachingWithNearby(this.q)
          .then(resp => {
            if(resp.success){
              if(resp.result.items.length < 20){
                this.loadingAll = true;
              }else{
                this.loadingAll = false;
              }

              this.teachPoints.push(...resp.result.items);
              this.downloadPointAvatar(resp.result.items);
            }
            this.loadingMoreFlag = true;
          });
      },

      onLink2Deatil(pointId){
        this.$router.push({name: 'TeachingPointDetail', params: {id: pointId}});
      },

      /** 上拉加载更多 */
      pullUpLoadingMore(){
        const _this = this;

        window.addEventListener('scroll', function (e) {
          const clientHeight  = document.documentElement.clientHeight;
          const scrollHeight = document.body.scrollHeight;
          const scrollTop = document.documentElement.scrollTop;
          const distance = 30;

          if(scrollTop + clientHeight >= scrollHeight - distance){
            if(_this.loadingMoreFlag && !_this.loadingAll){
              _this.q.SkipCount++;
              _this.getTeachingList();
            }
            _this.loadingMoreFlag = false;
          }
        }, false);
      },

      downloadPointAvatar(points){
        points.forEach((it, idx) => {
          if(it.photos.length > 0){
            this.$api.downloadImage({id: it.photos[0].sitePhototId})
              .then(resp => {
                if(resp.result){
                  const base64 = `data:image/png;base64,${resp.result}`;

                  this.$set(this.pointAvatars, idx, base64);
                }
              });
          }
        });
      },

      /** 显示地图 */
      onShowMap(lat, lon, addr){
        WxUtil.openMap(lat, lon, addr);
      },
    },
  }
</script>

<style lang="less" scoped>
  .point-addr{
    p{
      color: #1296db;
      padding-left: 20px;
      background: url("/static/images/common/icon-location-sm.png") no-repeat left center;
      background-size: 16px 16px;
    }
  }
</style>
