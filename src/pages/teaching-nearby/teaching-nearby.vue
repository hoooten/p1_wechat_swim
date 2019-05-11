<template>
  <div>
    <div class="margin-bottom-10" v-for="(itm, idx) of teachPoints" :key="idx">
      <m-panel
        class="margin-bottom-10"
        cover="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555756801097&di=13624bb4d756d9404649ddee77af2a60&imgtype=0&src=http%3A%2F%2Fimg.redocn.com%2Fsheying%2F20150408%2Fjiudianyouyongchi_4098011.jpg"
        :title="itm.techPoint.name"
        @on-click="onLink2Deatil(itm.techPoint.id)">
        <div class="point-addr" slot="content">
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

  export default {
    name: 'teaching-nearby',
    components: {
      MPanel,
      LoadMore,
    },
    data(){
      return {
        q: {
          Filter: '',
          UserNameFilter: '',
          Sorting: '',
          SkipCount: 1,
          MaxResultCount: 20,
        },
        teachPoints: [],
        loadingAll: false,
        loadingMoreFlag: true,
      };
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

              this.teachPoints = resp.result.items;
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
