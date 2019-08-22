<template>
  <div>
    <div class="coach-list">
      <m-panel
        v-for="(itm, idx) of coachList"
        :key="idx"
        is-set-border
        @on-click="onLink2Detail(itm.tech.id)">
        <div class="coach-avatar" slot="left-flex">
          <img class="img-position-center" :src="itm.userPhoto">
        </div>

        <div class="base-dt" slot="title">
          <div class="left-sp">
            <strong>{{itm.tech.name}}</strong>
            <span>{{itm.tech.certificateLevel}}教练</span>
          </div>
          <div class="right-sp">
            <stars :score="itm.averageScore"></stars>
          </div>
        </div>

        <div class="slt-con" slot="content">性别：{{itm.tech.gender ? '男' : '女'}}，{{itm.tech.profile}}</div>
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
  import {LoadMore} from 'vux';

  export default {
    name: 'coach-qualify',
    components: {
      MPanel,
      LoadMore,
      Stars,
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
  .coach-list{
    margin-top: 10px;
    background: #fff;
  }
  .star-group{
    margin-right: 10px;

    img{
      width: 18px;
      height: 18px;
      vertical-align: top;
    }
  }
  .coach-avatar{
    width: 50px;
    height: 50px;
    overflow: hidden;

    img{
      width: 100%;
      min-height: 50px;
      border-radius: 50%;
    }
  }
  .base-dt{
    display: flex;

    .left-sp{
      flex: 2;

      span{
        margin-left: 10px;
        color: #999;
        font-size: 12px;
      }
    }
    .right-sp{
      flex: 1;
      text-align: right;

      img{
        width: 10px;
        height: auto;
        vertical-align: middle;
      }
    }
  }
  .slt-con{
    max-height: 36px;
    color: #666;
    font-size: 12px;
    overflow: hidden;
  }
</style>
