<template>
  <div class="points-row">
    <div class="stars-inner">
      <div class="stars grey">
        <img src="/static/images/icon-star-grey@2x.png" v-for="n in 5">
      </div>
      <div class="stars stars-green" :style="{width: starsWidth + '%',}">
        <img src="/static/images/icon-star-yellow.png" v-for="n in 5">
      </div>
    </div>
    <!-- 评分插槽 -->
    <div class="score">
      <slot name="score"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Stars',
    props: {
      score: {
        type: Number | String,
        default: 0,
      },
    },
    data(){
      return {
        starsWidth: 0,
      };
    },
    mounted(){
      this.setStarsWidth();
    },
    methods: {
      setStarsWidth(){
        const score = Number(this.score);

        this.starsWidth = ((score / 5) * 100).toFixed(2);
      },
    },
    watch: {
      score(cur){
        this.setStarsWidth()
      }
    },
  }
</script>

<style lang="less" scoped>
  .points-row{
    display: inline-block;
    margin: 5px 0;
    vertical-align: middle;
  }
  .stars-inner{
    position: relative;
    font-size: 0;

    .stars img {
      width: 9px;
      height: 9px;
      margin-right: 2px;
      vertical-align: middle;
    }
    .stars img:last-child{
      margin-right: 0;
    }
    .stars-green{
      width: 0;
      position: absolute;
      left: 0;
      top: 0;
      overflow: hidden;
      white-space: nowrap;
      z-index: 2;
    }
  }
  /*.score{
    margin-left: 10px;
    line-height: 17px;
    color: @color-green;
  }*/
</style>
