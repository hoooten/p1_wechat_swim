<template>
  <div>
    <div class="search-module">
      <div class="search-bar">
        <x-input
          v-model="q.Filter"
          :debounce="200"
          :show-clear="false"
          placeholder="搜一搜附近教点名称"></x-input>
      </div>
      <div class="map-wrp" id="gaodeMap"></div>
    </div>

    <div class="tech-list">
      <m-panel
        v-for="(itm, idx) of teachPoints"
        :key="idx"
        class="margin-bottom-10"
        is-set-border
        @on-click="onLink2Deatil(itm.techPoint.id)">
        <div class="coach-avatar" slot="left-flex">
          <img class="img-position-center" :src="pointAvatars[idx]">
        </div>

        <div class="base-dt" slot="title">
          <div class="left-sp">
            <strong>{{itm.techPoint.name}}</strong>
            <span>
              <stars :score="itm.averageScore"></stars>
            </span>
          </div>
          <div class="right-sp" v-if="itm.distance">{{itm.distance}}km</div>
        </div>

        <div class="point-addr" slot="content">
          <div class="tech-cate">
            <template v-for="(feature, fId) of itm.features">
              <span :key="fId">{{feature.name}}</span>
              <i>|</i>
            </template>
          </div>
          <p @click="onShowMap(itm.techPoint.lat, itm.techPoint.lon, itm.techPoint.address)">{{itm.techPoint.address.replace('$', ' ')}}</p>
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
  import {MPanel, Stars} from '@/components';
  import {LoadMore, XInput} from 'vux';
  import {WxUtil} from "@/utils/wx-util";

  export default {
    name: 'teaching-nearby',
    components: {
      MPanel,
      LoadMore,
      Stars,
      XInput,
    },
    data(){
      return {
        q: {
          Filter: '',
          Lat: '',
          Lon: '',
          SkipCount: 0,
          MaxResultCount: 20,
        },
        teachPoints: [],
        photos: [],       // 教点封面图片对象
        pointAvatars: [], // 教点封面图地址
        loadingAll: false,
        loadingMoreFlag: true,
        latAndLons: [],
      };
    },
    watch: {
      'q.Filter': {
        handler(cur){
          this.teachPoints = [];
          this.pointAvatars = [];
          this.q.SkipCount = 0;
          this.getTeachingList();
        },
      }
    },
    created(){
      WxUtil.getUserLocation(resp => {
        if(resp){
          this.q.Lat = resp.lat;
          this.q.Lon = resp.lon;
          this.teachPoints = [];
          this.getTeachingList();
          window.localStorage.setItem('lat', resp.lat);
          window.localStorage.setItem('lon', resp.lon);
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
      // this.initGaodeMap();
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
              this.photos = [];
              resp.result.items.forEach((it) => {
                this.photos.push(it.photos);  // 保存图片ID
                if(this.q.SkipCount === 0){   // 保存第一页的数据的经纬度
                  const localHash = {
                    lat: it.techPoint.lat,
                    lon: it.techPoint.lon,
                  };

                  this.latAndLons.push(localHash);
                }
              });

              this.pointAvatars = new Array(this.photos.length);
              this.downloadPointAvatar();
              if(this.q.SkipCount === 0){
                this.initGaodeMap();
              }
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

      /** 下载教点封面图 */
      downloadPointAvatar(){
        this.photos.forEach((it, idx) => {
          if(it.length > 0){
            this.$api.downloadImage({id: it[0].sitePhototId})
              .then(resp => {
                if(resp.result){
                  const base64 = `data:image/png;base64,${resp.result}`;

                  // this.pointAvatars.push(base64);
                  this.$set(this.pointAvatars, idx, base64);
                }
              });
          }else{
            this.pointAvatars.push('');
          }
        });
      },

      /** 显示地图 */
      onShowMap(lat, lon, addr){
        WxUtil.openMap(lat, lon, addr);
      },

      /** 初始化高德地图 */
      initGaodeMap(){
        const map = new AMap.Map('gaodeMap', {
          center: [this.latAndLons[0].lon, this.latAndLons[0].lat],
          zoom: 10,
        });

        this.latAndLons.forEach((it) => {
          const marker = new AMap.Marker({
            icon: new AMap.Icon({
              image: '/static/images/map-marker.png',
              size: new AMap.Size(61, 71),
              imageSize: new AMap.Size(31, 36),
            }),
            position: [it.lon, it.lat],
          });

          map.add(marker);
        });
      },
    },
  }
</script>

<style lang="less" scoped>
  .search-module{
    margin-top: 10px;
    padding: 12px;
    background: #fff;

    .search-bar{
      /*padding: 9px 13px 9px 34px;*/
      padding-left: 24px;
      border: 1px solid #E5E5E5;
      border-radius: 20px;
      background: url("/static/images/icon-search-grey@2x.png") no-repeat 13px center;
      background-size: 13px auto;

      input{
        width: 100%;
        margin: 0;
        padding: 0;
        display: block;
        border: none;
      }
    }
    .map-wrp{
      width: 100%;
      height: 173px;
      margin-top: 10px;
    }
  }
  .tech-list{
    margin-top: 10px;
    background: #fff;
  }
  .coach-avatar{
    width: 85px;
    height: 60px;
    overflow: hidden;

    img{
      width: 100%;
      min-height: 60px;
    }
  }
  .base-dt{
    display: flex;

    .left-sp{
      flex: 2;

      span{
        margin-left: 10px;
      }
      img{
        width: 10px;
        height: auto;
        vertical-align: middle;
      }
    }
    .right-sp{
      flex: 1;
      color: #999;
      font-size: 11px;
      text-align: right;
    }
  }
  .point-addr{
    p{
      padding-left: 20px;
      font-size: 11px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      background: url("/static/images/common/icon-location-sm.png") no-repeat left center;
      background-size: 10px auto;
    }
    .tech-cate{
      font-size: 0;

      span{
        color: #999;
        font-size: 11px;
      }
      i{
        margin: 0 10px;
        color: #999;
        font-size: 11px;
      }
    }
  }
</style>
