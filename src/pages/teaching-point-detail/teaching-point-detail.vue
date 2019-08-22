<template>
  <div>
    <div class="head-banner">
      <div class="head-cover">
        <img
          class="img-position-center post-img"
          :src="`data:image/png;base64,${sceneImages[0]}`"
          data-img="scene"
          @click="onViewImage(0, 'scene')">
        <span class="cover-count">{{sceneImages.length}}张</span>
      </div>
      <div class="point-title-bar">
        <strong>{{point.name}}</strong>
        <span>
          <stars :score="averageScores"></stars>
        </span>
      </div>
      <div class="point-addr-bar">
        <template v-if="point.distance">
          <span>{{point.distance}}m</span>
          <span>|</span>
        </template>
        <span>{{point.address}}</span>
      </div>
      <div class="feat-sp-wrp">
        <span class="feature-it on" v-for="(f, fIdx) of features" :key="fIdx">{{f.name}}<i></i></span>
      </div>

      <div class="point-oper-row">
        <div class="oper-item" @click="onCollectPoint">
          <img v-if="isCollect" src="/static/images/collection-flag.png">
          <img v-if="!isCollect" src="/static/images/collection-empty.png">
          <span>收藏</span>
        </div>
        <div class="oper-item">
          <img src="/static/images/guide-flag.png">
          <span>导航</span>
        </div>
        <div class="oper-item">
          <img src="/static/images/shared-flag.png">
          <span>分享</span>
        </div>
        <div class="oper-item">
          <img src="/static/images/phone-flag.png">
          <span>电话</span>
        </div>
      </div>
    </div>

    <div class="bg-color-white mg-wrp">
      <div class="pop-title">收费方式</div>
      <div class="pop-content">
        <span class="fee-sp" v-for="(mode, mIdx) of ticketModes" :key="mIdx">{{mode.name}}</span>
        <p class="fee-tips">任何场地不受限制，教练一对一教学，无任何隐形消费。</p>
      </div>
    </div>

    <div class="bg-color-white mg-wrp">
      <div class="pop-title">商家规模</div>
      <div class="pop-content">
        <span class="staff-count">员工数量-{{point.scale}}</span>
        <span class="staff-count">救生员数量-{{point.lifeguardQty}}</span>
        <span class="staff-count">面积平方米-{{point.area}}</span>
      </div>
      <div class="pop-title">配套设施</div>
      <div class="pop-content">
        <span class="staff-count" v-if="point.isShowerRoom">· 冲凉房</span>
        <span class="staff-count" v-if="point.isStorageCabinet">· 储物柜</span>
      </div>
      <div class="pop-title">营业执照</div>
      <div class="pop-content">
        <div class="licence-img">
          <img class="img-position-center post-img" @click="onViewImage(0, 'licence')" data-img="license" :src="`data:image/png;base64,${licenseBase64}`">
        </div>
      </div>
      <div class="pop-title">基本介绍</div>
      <div class="pop-content">
        <p class="point-intro">{{point.description}}</p>
      </div>
    </div>

    <div v-if="!isScored.id" class="padding-15">
      <x-button :gradients="['#597AEE', '#596BEE']" @click.native="isShowComment = true">去评价</x-button>
    </div>
    <!--<group label-width="5.5em" v-if="point">
      <cell primary="content" title="场所名称：">
        <div class="content">{{point.name}}</div>
      </cell>
      <cell primary="content" title="场所位置：" value-align="left" align-items="flex-start">
        <div class="cell-con">
          <div class="mg-b-10 vux-1px-b" style="padding-bottom: 10px;">
            <div class="mg-b-5">浮潜：</div>
            <div>
              {{floatLocation}}
            </div>
          </div>
          <div class="mg-b-10">
            <div class="mg-b-5">游泳：</div>
            <div class="mg-b-5">
              {{poolType}}
            </div>
            <span>{{constantTemperature ? '恒温' : '不恒温'}}</span>
          </div>
        </div>
      </cell>
      <cell primary="content" title="规模：" align-items="flex-start">
        <div class="cell-con">
          <div class="padding-tb-10 vux-1px-b" style="padding-top: 0;">{{point.scale}}名员工</div>
          <div class="padding-tb-10 vux-1px-b">{{point.lifeguardQty}}名救生员</div>
          <div class="padding-tb-10">面积{{point.area}}㎡</div>
        </div>
      </cell>
      <cell primary="content" title="换水周期：" align-items="flex-start">
        <div class="content">{{point.waterChangePeroid}}天/次</div>
      </cell>
      <cell primary="content" title="消毒方式：">
        <div class="content">{{disinfection[point.disinfectionMethod - 1]}}</div>
      </cell>
      <cell primary="content" title="地址：">
        <div class="content">{{point.address.replace('$', ' ')}}</div>
      </cell>
      <cell primary="content" title="场所实景：" align-items="flex-start">
        <div class="img-box">
          <img class="preview-img post-img" data-img="scene" v-for="(imgUrl, idx) of sceneImages" @click="onViewImage(idx, 'scene')" :src="`data:image/png;base64,${imgUrl}`">
        </div>
      </cell>
      <cell primary="content" title="营业执照：" align-items="flex-start">
        <div class="img-box">
          <img class="preview-img" @click="onViewImage(0, 'licence')" data-img="license" :src="`data:image/png;base64,${licenseBase64}`">
        </div>
      </cell>
      <cell primary="content" title="冲凉房：">
        <div class="content">{{point.isShowerRoom ? '有' : '无'}}</div>
      </cell>
      <cell primary="content" title="储物柜：">
        <div class="content">{{point.isStorageCabinet ? '有' : '无'}}</div>
      </cell>
      <cell primary="content" title="相关认证：">
        <div class="content">{{point.certificate}}</div>
      </cell>
      <cell primary="content" title="浅水区：">
        <div class="content">{{point.shallowArea}}m</div>
      </cell>
      <cell primary="content" title="深水区：">
        <div class="content">{{point.deepArea}}m</div>
      </cell>
      <cell primary="content" title="场所简介：">
        <div class="content">{{point.description}}</div>
      </cell>
    </group>-->

    <!-- 实景图片预览 -->
    <div v-transfer-dom>
      <previewer
        ref="previewer"
        :list="imgList"
        :options="imgPreviewOptions"></previewer>
    </div>

    <!-- 营业执照图片预览 -->
    <div v-transfer-dom>
      <previewer
        ref="licencePreviewer"
        :list="licenceImgList"
        :options="imgPreviewOptions"></previewer>
    </div>

    <!-- 教点评论 -->
    <star-comment
      title="您觉得这家店怎么样？"
      v-model="isShowComment"
      @on-comment="onCommentPoint"></star-comment>
  </div>
</template>

<script>
  import {Cell, Group, Previewer, TransferDom, XButton} from 'vux';
  import {StarComment, Stars} from '@/components';

  // const FLOAT_TEMPLATE = ['江', '河', '湖', '海'];
  // const POOL_TYPE = ['室内泳池', '露天游泳池'];
  const DISINFECTION = ['一级消毒', '二级消毒', '三级消毒'];

  export default {
    name: 'teaching-point-detail',
    components: {
      Cell,
      Group,
      Previewer,
      XButton,
      StarComment,
      Stars,
    },
    directives: {
      TransferDom,
    },
    data(){
      return {
        isShowComment: false,
        point: {},
        averageScores: 0,   // 平均评分
        isScored: {},       // 是否已评分
        isCollect: false,   // 是否收藏当前教点
        favorite: {},       // 是否收藏当前教点
        features: [],       // 教点特色
        ticketModes: [],    // 收费方式
        floatLocation: '',
        poolType: '',
        constantTemperature: true,
        disinfection: DISINFECTION,
        licenseBase64: '',
        sceneImages: [],
        imgList: [],
        licenceImgList: [],
        imgPreviewOptions: {
          getThumbBoundsFn: function (index) {
            const thumbnail = document.querySelectorAll('.post-img')[index];
            const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
            const rect = thumbnail.getBoundingClientRect();

            return {x: rect.left, y: rect.top + pageYScroll};
          },
        },
      };
    },
    computed: {
      id(){
        return this.$route.params.id;
      }
    },
    created(){
      this.getPointData();
    },
    methods: {
      getPointData(){
        const params = {
          id: this.id,
          lat: window.localStorage.getItem('lat') || '',
          lon: window.localStorage.getItem('lon') || '',
        };

        this.$vux.loading.show();
        this.$api.getPointDetail(params)
          .then(resp => {
            if(resp.success){
              this.point = resp.result.getTechPointForEditDto.techPoint;
              this.averageScores = resp.result.averageScore;
              this.favorite = resp.result.favorite || {};
              this.isScored = resp.result.score || {};
              if(resp.result.favorite){
                this.isCollect = true;
              }else{
                this.isCollect = false;
              }
              this.features = resp.result.features || [];
              this.ticketModes = resp.result.ticketModes || [];
              // this._dealFloatLocation(resp.result.getTechPointForEditDto.techPoint.floatLocation.split(''));
              // this._dealPoolType(resp.result.getTechPointForEditDto.techPoint.swimLocation.split(''));

              this.downloadSceneImgs(resp.result.photos);
              this.$api.downloadImage({id: resp.result.getTechPointForEditDto.techPoint.licenseId})
                .then(resp => {
                  this.licenseBase64 = resp.result;
                  this.licenceImgList.push({src: `data:image/png;base64,${resp.result}`})
                });
            }
            this.$vux.loading.hide();
          });
      },

      // _dealFloatLocation(flagArr){
      //   let str = '';
      //
      //   flagArr.forEach((itm, idx) => {
      //     if(+itm === 1){
      //       str += FLOAT_TEMPLATE[idx] + ' ';
      //     }
      //   });
      //
      //   this.floatLocation = str;
      // },

      // _dealPoolType(poolTypeFalgArr){
      //   let poolType = '';
      //
      //   poolTypeFalgArr.forEach((itm, idx) => {
      //     if(+itm === 1 && POOL_TYPE[idx]){
      //       poolType += POOL_TYPE[idx] + ' ';
      //     }
      //
      //     if(idx === 2){
      //       +itm === 1 ? this.constantTemperature = true : this.constantTemperature = false;
      //     }
      //   });
      //
      //   this.poolType = poolType;
      // },

      /** 评论教点 */
      onCommentPoint(scores){
        if(!this.isScored.id){
          this.$vux.loading.show();
          this.$api.commitPointComment({techpointId: this.point.id, score: scores})
            .then(resp => {
              if(resp.success){
                this.$vux.toast.show('感谢您的支持！');
                this.getPointData();
              }
              this.$vux.loading.hide();
            });
        }
      },

      /** 收藏/取消收藏教点 */
      onCollectPoint(){
        if(!this.isCollect){
          this.$vux.loading.show();
          this.$api.collectTeachPoint({techPointId: this.point.id})
            .then(resp => {
              if(resp.success){
                // this.isCollect = true;
                this.getPointData();
                this.$vux.toast.show('收藏教点成功！');
              }
              this.$vux.loading.hide();
            });
        }else{
          this.$vux.loading.show();
          this.$api.cancelCollectPoint({id: this.favorite.id})
            .then(resp => {
              if(resp.success){
                // this.isCollect = false;
                this.getPointData();
                this.$vux.toast.show('已取消收藏');
              }
              this.$vux.loading.hide();
            });
        }
      },

      /** 下载教点场景图 */
      downloadSceneImgs(imgTokens){
        imgTokens.forEach((it, idx) => {
          this.$api.downloadImage({id: it.sitePhototId})
            .then(resp => {
              this.sceneImages.push(resp.result);
              this.imgList.push({src: `data:image/png;base64,${resp.result}`});
            });
        });
      },

      /** 预览图片 */
      onViewImage(idx, imgType){
        if(imgType === 'scene'){
          this.$refs.previewer.show(idx);
        }else{
          this.$refs.licencePreviewer.show(idx);
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  @import './teaching-point-detail';

  .content,
  .cell-con{
    color: #323232;
    font-size: 15px;
  }
  .mg-b-5{
    margin-bottom: 5px;
  }
  .mg-b-10{
    margin-bottom: 10px;
  }
  .half-w{
    width: 60%;
  }
  .img-box{
    img{
      margin-right: 15px;
      margin-bottom: 10px;
      width: 100px;
      height: 100px;
      vertical-align: top;
    }
  }
</style>
