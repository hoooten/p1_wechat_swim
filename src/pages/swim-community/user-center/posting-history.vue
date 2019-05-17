<template>
  <div>
    <div class="post-card" v-for="(posting, idx) of postingData">
      <m-card :data="posting"></m-card>
    </div>
  </div>
</template>

<script>
  import MCard from '../index/components/MCard';

  export default {
    name: 'posting-history',
    components: {
      MCard,
    },
    data(){
      return {
        postingData: [],
      };
    },
    created(){
      this.getPostingData();
    },
    methods: {
      getPostingData(){
        this.$vux.loading.show('载入中');
        this.$api.getPosting({CurrentUser: true})
          .then(resp => {
            if(resp && resp.success){
              this.postingData = resp.result.items;
            }
            this.$vux.loading.hide();
          });
      },
    },
  }
</script>

<style lang="less" scoped>
  .post-card{
    margin-top: 10px;
    background: #fff;
  }
</style>
