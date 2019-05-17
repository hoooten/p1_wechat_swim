<template>
  <div style="background: #fff;" v-if="postingData.community">
    <m-card :data="postingData"></m-card>
  </div>
</template>

<script>
  import MCard from '../index/components/MCard';

  export default {
    name: 'posting-detail',
    components: {
      MCard,
    },
    data(){
      return {
        id: '',
        postingData: {},
      };
    },
    created(){
      this.id = this.$route.params.id;
      this.getPostingDetail();
    },
    methods: {
      getPostingDetail(){
        this.$vux.loading.show();
        this.$api.getPostingDetail({id: this.id})
          .then(resp => {
            if(resp.success){
              this.postingData = Object.assign({}, resp.result, resp.result.getCommunityForEditOutputDto);
              delete this.postingData.getCommunityForEditOutputDto;
            }
            this.$vux.loading.hide();
          });
      },
    },
  }
</script>

<style scoped>

</style>
