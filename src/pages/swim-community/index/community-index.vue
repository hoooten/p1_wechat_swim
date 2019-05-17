<template>
  <div>
    <div class="bg-color-white">
      <div class="head-cover">
        <img src="http://m.tuniucdn.com/fb2/t1/G4/M00/AF/9C/Cii_J1xRUGaII7WCAAOoAmngE7EAADokgNXLDYAA6ga361_w450_h300_c1_t0.jpg">
      </div>
      <div class="head-sub padding-lr-15">
        <div class="comu-flag">
          <img src="http://img2.3lian.com/2014/c6/8/d/68.jpg">
        </div>
        <div class="ext-con">
          <span>话题 {{headData.totaltopicCount}}</span>
          <span> · </span>
          <span>访问 {{headData.totalPV}}</span>
        </div>
      </div>
      <div class="padding-lr-15 marquee">
        <marquee>
          <marquee-item v-for="i in 5" :key="i" class="align-middle">
            <img class="info-horn" src="/static/images/common/horn-blue.png">hello world {{i}}
          </marquee-item>
        </marquee>
      </div>
    </div>

    <div class="container bg-color-white">
      <div class="h-nav-out">
        <ul class="nav-ul">
          <li
            v-for="(itm, idx) of sections"
            :key="idx"
            :class="{on: currentSectionId === itm.communitySection.id}"
            @click="onSelectSection(itm.communitySection.id, itm.communitySection.name)">{{itm.communitySection.name}}</li>
        </ul>
      </div>
    </div>

    <div class="post-card" v-for="(post, idx) of result">
      <m-card :data="post"></m-card>
    </div>

    <div class="load-more">
        <load-more v-if="!loadingAll" tip="正在加载"></load-more>
        <load-more v-if="loadingAll" tip="暂无更多数据" :show-loading="false"></load-more>
    </div>

    <!-- 图片预览 -->
    <div v-transfer-dom>
      <!--<previewer
        :list="imgList"
        ref="previewer"
        :options="options"
        @on-index-change="logIndexChange"></previewer>-->
      <previewer></previewer>
    </div>
  </div>
</template>

<script>
  import {Marquee, MarqueeItem, LoadMore, Previewer, TransferDom} from 'vux';
  import MCard from './components/MCard.vue';

  export default {
    name: 'community-index',
    components: {
      Marquee,
      MarqueeItem,
      MCard,
      LoadMore,
      Previewer,
      TransferDom,
    },
    data(){
      return {
        q: {
          Filter: '',
          UserNameFilter: '',
          CommunitySectionNameFilter: '',
          Sorting: '',
          SkipCount: 1,
          MaxResultCount: 20,
        },
        headData: {},
        result: [],
        sections: [],
        currentSectionId: '',
        loadingAll: false,
        loadingMoreFlag: true,
        imgList: [],
        imgPreviewOptions: {
          getThumbBoundsFn(index){

          }
        },
      };
    },
    created(){
      this.getHomeData();
      this.getPostingWithPage();
      this.getPostSections();
    },
    mounted(){
      this.pullUpLoadingMore();
    },
    destroyed(){
      window.removeEventListener('scroll', function () {});
    },
    methods: {
      getHomeData(){
        this.$api.getCommunityHomeData()
          .then(resp => {
            if(resp.success){
              this.headData = resp.result;
            }
          });
      },

      getPostingWithPage(){
        this.$api.getPosting(this.q)
          .then(resp => {
            if(resp && resp.success){
              if(resp.result.items.length < 20){
                this.loadingAll = true;
              }else{
                this.loadingAll = false;
              }

              this.result.push(...resp.result.items);
            }
            this.loadingMoreFlag = true;
          });
      },

      getPostSections(){
        this.$api.getPostingSections()
          .then(resp => {
            if(resp.success){
              const hash = {
                communitySection: {
                  id: '',
                  name: '全部',
                },
              };

              this.sections = resp.result.items;
              this.sections.unshift(hash);
            }
          });
      },

      onSelectSection(sectionId, sectionName){
        this.currentSectionId = sectionId;

        if(!sectionId){
          this.q.CommunitySectionNameFilter = '';
        }else{
          this.q.CommunitySectionNameFilter = sectionName;
        }

        this.q.SkipCount = 1;
        this.result = [];
        this.getPostingWithPage();
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
              _this.getPostingWithPage();
            }
            _this.loadingMoreFlag = false;
          }
        }, false);
      },
    },
  }
</script>

<style lang="less" scoped>
  @import "./index";

</style>
