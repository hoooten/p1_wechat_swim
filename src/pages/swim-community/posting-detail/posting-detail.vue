<template>
  <div v-if="postingData">
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
        postingData: null,
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
              this.postingData = resp.result;
            }
            this.$vux.loading.hide();
          });
      },
    },
  }
</script>

<style scoped>

</style>
