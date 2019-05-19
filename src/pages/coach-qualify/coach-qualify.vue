<template>
  <div>
    <div class="margin-bottom-10" v-for="(itm, idx) of coachList" :key="idx">
      <m-panel
        cover="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555756856972&di=1f518038bd435d8a5d1a4dde33290d9e&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170515%2Fc9bafe1fc7fa440183d8ddef6b24a55a_th.png"
        :title="itm.tech.name"
        @on-click="onLink2Detail(itm.tech.id)">
        <div class="slt-con" slot="content">
          <span class="star-group">
            <img v-for="i in 3" src="/static/images/common/icon-star-yellow.png">
          </span>
          <span>{{itm.tech.certificateLevel}}</span>
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
    name: 'coach-qualify',
    components: {
      MPanel,
      LoadMore,
    },
    data(){
      return {
        coachList: [],
        q: {
          Filter: '',
          UserNameFilter: '',
          Sorting: '',
          SkipCount: 0,
          MaxResultCount: 20,
        },
        loadingAll: false,
        loadingMoreFlag: true,
      };
    },
    created(){
      this.init();
    },
    methods: {
      init(){
        this.$api.getCoachList(this.q)
          .then(resp => {
            if(resp.success){
              if(resp.result.items.length < 20){
                this.loadingAll = true;
              }else{
                this.loadingAll = false;
              }

              this.coachList = resp.result.items;
            }
            this.loadingMoreFlag = true;
          });
      },

      onLink2Detail(coachId){
        this.$router.push({name: 'CoachDetail', params: {id: coachId}});
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
  .star-group{
    margin-right: 10px;

    img{
      width: 18px;
      height: 18px;
      vertical-align: top;
    }
  }
</style>
