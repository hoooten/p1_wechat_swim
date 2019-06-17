<template>
  <div>
    <div class="title-bar">
      <div class="h-portrait">
        <img src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM6nfPv9qruWgXQKH08WlwzbO0hbbRLJUXy6VZOFHketo60Cib6bAicdVx8GdTl6IEnpD7rcqjtkEqtH55s5dVp5XLoaDCYC5WqzA/132">
      </div>
      <div class="tt-con">
        <div class="top-rw">
          <span class="nk-name">{{data.userName}}</span>
        </div>
        <div class="bt-rw">
          <span>{{data.community.createDate | formatDate}}</span>
          <span>|</span>
          <span>浏览{{data.community.pv}}</span>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="margin-bottom-10 text" @click="onToDetail(data.community.id)">
        <h3 class="title">{{data.community.title}}</h3>
        <p><span class="section-name">{{data.communitySectionName}}</span>{{data.community.topic}}</p>
      </div>

      <!-- 图片列表 -->
      <div class="images">
        <ul class="img-ul">
          <li v-for="(imgUri, idx) of posting.imagesList" :key="idx">
            <img @click="onViewImage(idx)" class="post-img" :src="imgUri">
          </li>
        </ul>
      </div>

      <div class="margin-bottom-10 comments">
        <div class="operation">
          <!--<span><img src="/static/images/components/transmit.png">转</span>-->
          <span @click="isShowTextArea = true"><img src="/static/images/components/comment.png">评<b>{{posting.commentList.length > 0 ? posting.commentList.length : ''}}</b></span>
          <span @click="onSupport(data.community.id, data.currentStartId)">
            <img v-if="posting.isSuport" src="/static/images/components/support_on.png">
            <img v-else src="/static/images/components/support.png">赞<b>{{posting.supports.length > 0 ? posting.supports.length : ''}}</b>
          </span>
        </div>
      </div>
    </div>

    <!-- 评论帖子 -->
    <div class="padding-15 comment vux-1px-t" v-show="isShowTextArea">
      <div class="vux-1px txt-area-box">
        <!--<textarea rows="5" placeholder="回复帖子：" v-model="comments"></textarea>-->
        <x-textarea ref="textArea" :max="200" :height="50" placeholder="回复帖子：" v-model="comments"></x-textarea>
      </div>
      <div class="com-oper-btn text-align-right">
        <x-button style="margin-right: 15px;" type="default" mini @click.native="isShowTextArea = false">取消</x-button>
        <x-button type="primary" mini @click.native="onComment(data.community.id)">确定</x-button>
      </div>
    </div>

    <div class="operation-log">
      <!-- 点赞列表 -->
      <div class="support">
        <span class="sup-sp" v-for="(support, idx) of posting.supports" :key="idx">
          <img v-if="support.userPhoto" class="img-position-center" src="">
          <img v-else class="img-position-center" src="http://i.vzan.cc/image/friend/headim/jpeg/2017/11/5/010214b40fd73d5bd14edea5f8e08fcec21a34.jpeg">
        </span>
      </div>

      <!-- 评论列表 -->
      <div class="comment" v-if="posting.commentList.length > 0">
        <div class="title-bar vux-1px-b" v-for="(comment, idx) of posting.commentList" :key="idx">
          <div class="h-portrait">
            <img src="http://wx.qlogo.cn/mmopen/Q3auHgzwzM6nfPv9qruWgXQKH08WlwzbO0hbbRLJUXy6VZOFHketo60Cib6bAicdVx8GdTl6IEnpD7rcqjtkEqtH55s5dVp5XLoaDCYC5WqzA/132">
          </div>
          <div class="tt-con">
            <div class="top-rw">
              <span class="nk-name">{{comment.userName}}</span>
            </div>
            <div class="cm-con">{{comment.comment.reply}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览 -->
    <div v-transfer-dom>
      <previewer
        :list="imgList"
        ref="previewer"
        :options="imgPreviewOptions"></previewer>
    </div>
  </div>
</template>

<script>
  import {XTextarea, XButton, Previewer, TransferDom} from 'vux';

  export default {
    name: 'm-card',
    directives: {
      TransferDom,
    },
    components: {
      XTextarea,
      XButton,
      Previewer,
    },
    props: {
      data: {
        type: Object,
        default(){
          return {};
        },
      }
    },
    data(){
      return {
        comments: '',
        isShowTextArea: false,
        posting: {
          commentList: this.data.comments,
          imagesList: [],
          supports: this.data.stars,
          isSuport: this.data.isStared,
        },
        imgList: [],
        imgPreviewOptions: {
          getThumbBoundsFn (index) {
            let thumbnail = document.querySelectorAll('.post-img')[index];
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
            let rect = thumbnail.getBoundingClientRect();

            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
          },
        },
      };
    },
    mounted(){
      this.downloadPostingImages();
    },
    methods: {
      /** 发表评论 */
      onComment(postingId){
        if(this.comments){
          const _this = this;
          const params = {
            reply: this.comments,
            communityId: postingId,
          };

          this.$vux.loading.show();
          this.$api.commentPosting(params)
            .then(resp => {
              if(resp.success){
                this.$vux.toast.show('评论成功');
                this.isShowTextArea = false;

                _this.$api.getCommentsForPosting({TopicId: postingId})
                  .then(resp => {
                    if(resp.success){
                      _this.posting.commentList = resp.result.items;
                    }
                  });
              }

              this.$vux.loading.hide();
            });
        }
      },

      /** 下载帖子图片 */
      downloadPostingImages(){
        const _this = this;

        _this.data.photos.forEach((itm, idx) => {
          _this.$api.downloadImage({id: itm.photoId})
            .then(resp => {
              if(resp.success){
                const uri = `data:image/png;base64,${resp.result}`;
                const imgHash = {
                  src: uri,
                  w: 600,
                  h: 500
                };

                _this.posting.imagesList.push(uri);
                this.imgList.push(imgHash);
              }
            });
        });
      },

      /** 点赞/取消点赞 */
      onSupport(communityId, supportId){
        const _this = this;

        if(this.posting.isSuport){
          this.$api.cancelSupport({id: supportId})
            .then(resp => {
              if(resp.success){
                this.posting.isSuport = false;
                this.getSupports(communityId);
              }
            })
        }else{
          this.$api.supportPosting({communityId: communityId})
            .then(resp => {
              if(resp.success){
                this.posting.isSuport = true;
                this.getSupports(communityId);
              }
            });
        }
      },

      /** 更新点赞数据 */
      getSupports(communityId){
        this.$api.getSupportsForPosting({TopicId: communityId})
          .then(resp => {
            if(resp.success){
              this.posting.supports = resp.result.items;
            }
          });
      },

      /** 查看帖子详情 */
      onToDetail(communityId){
        this.$router.push({name: 'PostingDetail', params: {id: communityId}});
      },

      /** 预览图片 */
      onViewImage(idx){
        this.$refs.previewer.show(idx);
      },
    },
  }
</script>

<style lang="less" scoped>
  @import "./MCard";
</style>
