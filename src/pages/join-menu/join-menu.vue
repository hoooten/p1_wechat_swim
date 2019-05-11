<template>
  <div>
    <div class="padding-15 border-box grid-box">
      <router-link to="/community/index" class="block-card bg-blue">我是游泳爱好者</router-link>
      <router-link to="/join/coach" class="block-card bg-red">我是教练</router-link>
      <router-link to="/join/point" class="block-card bg-green">我要加盟</router-link>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'main-menu',
  }
</script>

<style lang="less" scoped>
  .grid-box{
    background: #fff;
  }
  .block-card{
    display: block;
    width: 80%;
    margin: 0 auto 10px;
    padding: 25px 15px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .bg-blue{
    background: @bg-blue;

    &:active{
      background: @color-blue;
    }
  }
  .bg-red{
    background: @bg-red;

    &:active{
      background: @color-red;
    }
  }
  .bg-green{
    background: @bg-green;

    &:active{
      background: @color-green;
    }
  }
</style>
