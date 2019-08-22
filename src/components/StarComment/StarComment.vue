<template>
  <div v-show="isShowComment">
    <div class="mask" @click="closeCommentModal"></div>
    <div class="com-wrp">
      <div class="com-title">{{title}}</div>
      <div class="com-content">
        <template v-for="(flag, idx) of starsFlag">
          <img v-if="+flag === 1" :key="idx" class="star" @click="onComment(idx)" src="/static/images/star-yellow-lg@2x.png">
          <img v-if="+flag === 0" :key="idx" class="star" @click="onComment(idx)" src="/static/images/star-grey-lg@2x.png">
        </template>
      </div>
      <div class="vux-1px-t com-btn" @click="onSubmitComment">提交</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'star-comment',
    props: {
      title: String,
      value: {
        type: Boolean,
        default: false,
      },
    },
    data(){
      return {
        scores: 1,
        starsFlag: [1, 0, 0, 0, 0],
        isShowComment: false,
      };
    },
    watch: {
      value(cur){
        this.isShowComment = cur;
      },
    },
    methods: {
      /** 评价 */
      onComment(idx){
        this.scores = idx + 1;
        this.renderStars();
      },

      /** 星级评价 */
      renderStars(){
        let temp = [1, 0, 0, 0, 0];
        let count = 0;

        while(count < this.scores){
          temp[count] = 1;
          count++;
        }

        this.starsFlag = temp;
      },

      /** 提交评价 */
      onSubmitComment(){
        this.closeCommentModal();
        this.$emit('on-comment', this.scores);
      },

      closeCommentModal(){
        this.isShowComment = false;
        this.$emit('input', false);
      },
    },
  }
</script>

<style lang="less" scoped>
  .mask{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9999;
  }
  .com-wrp{
    position: fixed;
    top: 50%;
    left: 45px;
    right: 45px;
    transform: translateY(-50%);
    width: auto;
    background: #fff;
    border-radius: 5px;
    z-index: 10000;
  }
  .com-title{
    position: relative;
    padding: 23px 0;
    text-align: center;

    &::before, &::after{
      content: '';
      position: absolute;
      top: 50%;
      width: 40px;
      height: 1px;
      background: rgba(153, 153, 153, 0.5);
    }
    &::before{
      left: 10%;
    }
    &::after{
      right: 10%;
    }
  }
  .com-content{
    padding-bottom: 25px;
    text-align: center;

    .star{
      width: 26px;
      height: 26px;
      vertical-align: middle;
    }
  }
  .com-btn{
    padding: 16px 0;
    text-align: center;
  }
</style>
