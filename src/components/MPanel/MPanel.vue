<template>
  <div>
    <div class="p-row-out">
      <div class="p-row" :class="{border: isSetBorder}">
        <slot name="left-flex">
          <div class="p-col-l" @click="onClick()">
            <img class="img-position-center" :src="cover">
          </div>
        </slot>

        <div class="p-col-r">
          <div class="main-con text-overflow" @click="onClick()">
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
      isSetBorder: {
        type: Boolean,
        default: false,
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
  .p-row-out{
    padding: 0 10px;
    background: #fff;
  }
  .p-row{
    padding: 15px 0;
    display: flex;
  }
  .p-row-inner{
    width: 100%;
  }
  .p-col-l{
    width: 70px;
    height: 60px;
    overflow: hidden;
    /*padding-right: 10px;*/

    img{
      width: 100%;
      height: auto;
    }
  }
  .p-col-r{
    flex: 1;
    margin-left: 10px;

    .main-con{
      font-size: 17px;
    }
    .sub-con{
      /*height: 32px;*/
      /*margin-top: 5px;*/
      /*overflow: hidden;*/

      .con-p{
        line-height: 1.25;
        color: #777;
        font-size: 13px;
      }
    }
  }
  .border{
    border-bottom: 1px solid #E5E5E5;
  }
</style>
