<template>
  <div>
    <div class="bg-color-white head-wrp">
      <x-input v-model="article.title" placeholder="标题，可以不填…"></x-input>
      <x-textarea v-model="article.topic" placeholder="亲，记录您此刻的想法吧…"></x-textarea>
    </div>

    <div class="bg-color-white padding-15">
      <div class="local-btn" @click="onGetLocation">正在定位...</div>
    </div>

    <div class="padding-lr-15 menu-bar">
      <div class="menu-it">
        <img src="/static/images/common/icon-picture-blue.png">
        <span>图片</span>
        <input type="file" class="file-ipt" accept="image/png,image/gif,image/jpeg" multiple="multiple" @change="onUploadImg"/>
      </div>
    </div>

    <div class="img-upd-wrp">
      <ul class="img-row">
        <li v-for="(uri, imgIdx) of imageUris" :key="imgIdx">
          <div class="pt-box">
            <img class="img-position-center" :src="uri">
          </div>
          <i v-if="uri" class="del" @click="onDelImage(imgIdx)"></i>
          <div class="progress" v-if="!uri">
            <spinner type="bubbles" size="40px"></spinner>
          </div>
        </li>
        <li class="upd-btn" v-if="imageUris.length > 0">
          <input type="file" class="file-ipt" accept="image/png,image/gif,image/jpeg" multiple="multiple" @change="onUploadImg"/>
        </li>
      </ul>
    </div>

    <div class="bg-color-white section-wrp">
      <span
        v-for="(itm, idx) of sections"
        :key="idx"
        class="sect-itm"
        :class="{on: sectionIdx == idx}"
        @click="onSelectSection(idx, itm.communitySection.id)">{{itm.communitySection.name}}</span>
    </div>

    <div class="padding-15">
      <x-button type="primary" @click.native="onPublish">发表</x-button>
    </div>
  </div>
</template>

<script>
  import {XTextarea, XInput, XButton, Spinner} from 'vux';

  //   "topic": "string",
  //   "pv": 0, 浏览量
  //   "title": "string",
  //   "communitySectionId": 0,

  export default {
    name: 'posting',
    components: {
      XTextarea,
      XInput,
      XButton,
      Spinner,
    },
    data(){
      return {
        article: {
          title: '',
          topic: '',
          pv: 0,
          communitySectionId: '',
        },
        sections: [],
        sectionIdx: 0,
        imageTokens: [],
        imageUris: [],
      };
    },
    created(){
      this.getSections();
    },
    methods: {
      /** 获取帖子类别 */
      getSections(){
        this.$vux.loading.show();
        this.$api.getPostingSections()
          .then(resp => {
            if(resp.success && resp.result.items.length > 0){
              this.sections = resp.result.items;
              this.article.communitySectionId = resp.result.items[0].communitySection.id;
            }
            this.$vux.loading.hide();
          });
      },

      /** 选择帖子类型 */
      onSelectSection(idx, id){
        this.sectionIdx = idx;
        this.article.communitySectionId = id;
      },

      /** 表单校验 */
      validateForm(){
        const query = this.article;

        if(!query.topic){
          this.$vux.toast.show('帖子内容不能为空');
          return false;
        }else if(query.topic.length < 10){
          this.$vux.toast.show('帖子内容不少于10个字符');
          return false;
        }

        return true;
      },

      /** 定位，获取用户当前位置 */
      onGetLocation(){

      },

      onUploadImg(e){
        const files = Array.from(e.target.files);
        const formData = new FormData();
        const head = {
          'Content-Type': 'multipart/form-data',
        };
        const originLen = this.imageUris.length;

        files.forEach((itm, idx) => {
          formData.append(`file${idx}`, itm, itm.name);
          this.imageUris.push('');
        });

        this.$api.uploadImage(formData)
          .then(resp => {
            if(resp.success){
              resp.result.forEach((itm, idx) => {
                this.imageTokens.push(itm.fileToken);

                this.downloadImg({id: itm.fileToken})
                  .then(resp => {
                    if(resp.success){
                      const uriPrefix = `data:image/png;base64,${resp.result}`;
                      const curIdx = originLen + idx;

                      this.$set(this.imageUris, curIdx, uriPrefix);
                    }
                  });
              });
            }
          });
      },

      downloadImg(params){
        return this.$api.downloadImage(params);
      },

      onDelImage(imgIdx){
        this.$vux.loading.show();
        this.$api.deleteImage({id: this.imageTokens[imgIdx]})
          .then(resp => {
            if(resp.success){
              this.$vux.toast.show('图片删除成功');
              this.imageTokens.splice(imgIdx, 1);
              this.imageUris.splice(imgIdx, 1);
            }
            this.$vux.loading.hide();
          });
      },

      onPublish(){
        if(this.validateForm()){
          this.$vux.loading.show();
          this.$api.createPosting(this.article)
            .then(resp => {
              if(resp.success){
                const params = {
                  communityId: resp.result,
                  photoIds: this.imageTokens,
                };

                this.$api.connectPhotoForPosting(params)
                  .then(resp => {
                    if(resp.success){
                      const _this = this;

                      this.$vux.toast.show({
                        text: '发布成功',
                        onHide(){
                          _this.$router.push({name: 'CommunityIndex'});
                        },
                      });
                    }
                    this.$vux.loading.hide();
                  });
              }
            });
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .head-wrp{
    padding-left: 0;
  }
  .menu-bar{
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;

    .menu-it{
      position: relative;
      width: 30px;
      height: 42px;
      text-align: center;

      span{
        display: block;
        color: #666;
        font-size: 13px;
      }
      img{
        width: 24px;
        height: auto;
        vertical-align: top;
      }
    }
  }

  .img-upd-wrp{
    padding: 10px 15px;
    background: #fff;

    .img-row{
      display: flex;
      flex-wrap: wrap;

      li{
        position: relative;
        width: 70px;
        height: 70px;
        margin-right: 15px;
        margin-bottom: 10px;
        border: 1px solid #dedede;
        border-radius: 4px;

        &:nth-of-type(4n){
          margin-right: 0;
        }
        .pt-box{
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        img{
          width: 100%;
          height: auto;
        }
        .del{
          position: absolute;
          right: -15px;
          top: -15px;
          width: 30px;
          height: 30px;
          background: url("/static/images/common/icon-del-grey.png") no-repeat center center;
          background-size: 30px auto;
        }
      }
      .upd-btn{
        position: relative;
        background: url("/static/images/common/icon-plus-lg.png") no-repeat center center;
        background-size: 50px auto;
      }
      .progress{
        position: absolute;
        width: 100%;
        height: 100%;
        line-height: 70px;
        left: 0;
        top: 0;
        text-align: center;
        z-index: 5;
      }
    }
  }
  .local-btn{
    padding-left: 20px;
    color: @color-blue;
    font-size: 13px;
    background: url("/static/images/common/icon-location-sm.png") no-repeat left center;
    background-size: 16px 16px;
  }
  .section-wrp{
    padding: 10px 15px 0 15px;
    margin-top: 10px;
    font-size: 0;

    .sect-itm{
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 4px 15px;
      font-size: 13px;
      color: #555;
      border: 1px solid #ddd;
      border-radius: 15px;
      background: @color-grey;

      &.on{
        color: @color-blue;
        border-color: @color-blue;
      }
    }
  }

  .file-ipt{
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
</style>
