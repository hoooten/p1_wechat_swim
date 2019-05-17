<template>
  <div>
    <div class="p-row" @click="onClick()">
      <div class="p-col-l">
        <img class="img-position-center" :src="cover">
      </div>
      <div class="p-col-r">
        <div class="main-con text-overflow">
          <slot name="title">{{title}}</slot>
        </div>
        <div class="sub-con">
          <slot name="content">
            <p class="con-p">{{content}}</p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'm-panel',
    props: {
      cover: {
        type: String,
        default: '/static/images/common/img-cover.png',
      },
      title: {
        type: String,
        default: '',
      },
      content: {
        type: String,
        default: '',
      },
      url: {
        type: Object,
        default(){
          return null;
        },
      },
    },
    methods: {
      onClick(){
        if(this.url){
          this.$router.push({name: this.url.name, query: this.url.q});
        }else{
          this.$emit('on-click');
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .p-row{
    display: flex;
    padding: 10px 15px;
    background: #fff;
  }
  .p-col-l{
    width: 70px;
    height: 60px;
    overflow: hidden;
    padding-right: 10px;

    img{
      width: 100%;
      height: auto;
    }
  }
  .p-col-r{
    flex: 1;

    .main-con{
      font-size: 17px;
    }
    .sub-con{
      height: 32px;
      margin-top: 5px;
      overflow: hidden;

      .con-p{
        line-height: 1.25;
        color: #777;
        font-size: 13px;
      }
    }
  }
</style>
