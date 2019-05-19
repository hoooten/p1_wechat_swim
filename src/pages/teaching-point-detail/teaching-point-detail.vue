<template>
  <div>
    <group label-width="5.5em" v-if="point">
      <cell primary="content" title="场所名称：">
        <div class="content">{{point.name}}</div>
      </cell>
      <cell primary="content" title="场所位置：" value-align="left" align-items="flex-start">
        <div class="cell-con">
          <div class="mg-b-10 vux-1px-b" style="padding-bottom: 10px;">
            <div class="mg-b-5">浮潜：</div>
            <div>
              {{floatLocation}}
              <!--<m-checkbox :options="floatLocation" v-model="point.floatLocation"></m-checkbox>-->
            </div>
          </div>
          <div class="mg-b-10">
            <div class="mg-b-5">游泳：</div>
            <div class="mg-b-5">
              {{poolType}}
              <!--<m-checkbox :options="swimLocation" v-model="point.swimLocation"></m-checkbox>-->
            </div>
            <span>{{constantTemperature ? '恒温' : '不恒温'}}</span>
            <!--<m-radio :options="constantTemperature" v-model="point.isConstantTemp"></m-radio>-->
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
      <cell primary="content" title="场所实景：" align-items="flex-start">
        <div class="img-box">
          <img class="preview-img" data-img="scene" v-for="(imgUrl, idx) of sceneImages" @click="onViewImage(idx)" :src="`data:image/png;base64,${imgUrl}`">
        </div>
      </cell>
      <cell primary="content" title="营业执照：" align-items="flex-start">
        <div class="img-box">
          <img class="preview-img" @click="onViewImage(0)" data-img="license" :src="`data:image/png;base64,${licenseBase64}`">
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
    </group>

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
  import {Cell, Group, Previewer, TransferDom} from 'vux';

  const FLOAT_TEMPLATE = ['江', '河', '湖', '海'];
  const POOL_TYPE = ['室内泳池', '露天游泳池'];
  const DISINFECTION = ['一级消毒', '二级消毒', '三级消毒'];

  export default {
    name: 'teaching-point-detail',
    components: {
      Cell,
      Group,
    },
    data(){
      return {
        point: null,
        floatLocation: '',
        poolType: '',
        constantTemperature: true,
        disinfection: DISINFECTION,
        licenseBase64: '',
        sceneImages: [],
        imgList: [],
        imgPreviewOptions: {
          getThumbBoundsFn: function (index) {
            const thumbnail = document.querySelectorAll('.post-img')[index];
            const imgType = thumbnail.dataset.img;
            const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
            const rect = thumbnail.getBoundingClientRect();

            if (imgType === 'scene') {
              this.sceneImages.forEach((uri, idx) => {
                const imgHash = {
                  src: uri,
                  w: 600,
                  h: 500
                };

                this.imgList = [];
                this.imgList.push(imgHash);
              });
            }else{
              const imgHash = {
                src: this.licenseBase64,
                w: 600,
                h: 500
              };

              this.imgList = [];
              this.imgList.push(imgHash);
            }

            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
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
        this.$vux.loading.show();
        this.$api.getPointDetail({id: this.id})
          .then(resp => {
            if(resp.success){
              this.point = resp.result.getTechPointForEditDto.techPoint;
              this._dealFloatLocation(resp.result.getTechPointForEditDto.techPoint.floatLocation.split(''));
              this._dealPoolType(resp.result.getTechPointForEditDto.techPoint.swimLocation.split(''));

              this.downloadSceneImgs(resp.result.photos);
              this.$api.downloadImage({id: resp.result.getTechPointForEditDto.techPoint.licenseId})
                .then(resp => {
                  this.licenseBase64 = resp.result;
                });
            }
            this.$vux.loading.hide();
          });
      },

      _dealFloatLocation(flagArr){
        let str = '';

        flagArr.forEach((itm, idx) => {
          if(+itm === 1){
            str += FLOAT_TEMPLATE[idx] + ' ';
          }
        });

        this.floatLocation = str;
      },

      _dealPoolType(poolTypeFalgArr){
        let poolType = '';

        poolTypeFalgArr.forEach((itm, idx) => {
          if(+itm === 1 && POOL_TYPE[idx]){
            poolType += POOL_TYPE[idx] + ' ';
          }

          if(idx === 2){
            +itm === 1 ? this.constantTemperature = true : this.constantTemperature = false;
          }
        });

        this.poolType = poolType;
      },

      /** 下载教点场景图 */
      downloadSceneImgs(imgTokens){
        imgTokens.forEach((it, idx) => {
          this.$api.downloadImage({id: it.sitePhototId})
            .then(resp => {
              this.sceneImages.push(resp.result);
            });
        });
      },

      /** 预览图片 */
      onViewImage(idx){
        this.$refs.previewer.show(idx);
      },
    },
  }
</script>

<style lang="less" scoped>
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
