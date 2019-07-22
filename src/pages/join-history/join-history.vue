<template>
  <div>
    <div v-if="techPointData || !coachData">

    </div>
  </div>
</template>

<script>
  import {LoadMore} from 'vux';
  import {MPanel} from '@/components';

  export default {
    name: 'join-history',
    components: {
      MPanel,
      LoadMore,
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

</style>
