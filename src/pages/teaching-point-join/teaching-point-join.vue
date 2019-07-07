<template>
  <div>
    <group title="必填项" label-width="5.2em" label-margin-right="1em" label-align="left">
      <x-input title="场所名称：" v-model="point.name" placeholder="必填" :show-clear="false"></x-input>
      <cell primary="content" title="场所位置：" value-align="left" align-items="flex-start">
        <div class="cell-con">
          <div class="mg-b-10">
            <div class="mg-b-5">浮潜：</div>
            <div>
              <m-checkbox :options="floatLocation" v-model="point.floatLocation"></m-checkbox>
            </div>
          </div>
          <div class="mg-b-10">
            <div class="mg-b-5">游泳：</div>
            <div class="mg-b-5">
              <m-checkbox :options="swimLocation" v-model="point.swimLocation"></m-checkbox>
            </div>
            <m-radio :options="constantTemperature" v-model="point.isConstantTemp"></m-radio>
          </div>
        </div>
      </cell>
      <cell primary="content" title="规模：" value-align="left" align-items="flex-start">
        <div class="cell-con">
          <div class="padding-tb-10 vux-1px-b" style="padding-top: 0;">
            <input class="half-w" type="number" v-model="point.scale" placeholder="请输入员工数量"/>员工数量
          </div>
          <div class="padding-tb-10 vux-1px-b">
            <input class="half-w" type="number" v-model="point.lifeguardQty" placeholder="请输入救生员数量"/>救生员数量
          </div>
          <div class="padding-tb-10">
            <input class="half-w" type="number" v-model="point.area" placeholder="请输入泳池面积"/>面积(㎡)
          </div>
        </div>
      </cell>
      <cell primary="content" title="换水周期：" value-align="left" align-items="flex-start">
        <div class="cell-con">
          <input class="half-w" type="number" v-model="point.waterChangePeroid" placeholder="请输换水周期"/>天/次
        </div>
      </cell>
      <popup-radio title="消毒方式：" :options="disinfectionMethod" v-model="point.disinfectionMethod" :columns="1" placeholder="请选择消毒方式" value-align="left"></popup-radio>
      <x-address title="地址" :list="addressList" @on-shadow-change="onGetAddress" v-model="point.address" placeholder="请选择地址" value-text-align="left"></x-address>
      <x-textarea title="详细地址" :height="50" v-model="point.addressDetail" placeholder="请输入详细地址"></x-textarea>

      <cell primary="content" title="场所实景：" align-items="flex-start">
        <div class="img-box">
          <ul class="img-row">
            <li v-for="(uri, imgIdx) of image.realSceneImageUris" :key="imgIdx">
              <div class="pt-box">
                <img class="img-position-center" :src="uri">
              </div>
              <i v-if="uri" class="del" @click="onDelImage('scene', imgIdx)"></i>
              <div class="progress" v-if="!uri">
                <spinner type="bubbles" size="40px"></spinner>
              </div>
            </li>
            <li class="upd-btn">
              <input type="file" class="file-ipt" accept="image/*" multiple="multiple" @change="onUploadImg($event, 'scene')"/>
            </li>
          </ul>
        </div>
      </cell>
    </group>

    <group title="选填项" label-width="5.2em" label-margin-right="1em" label-align="left">
      <cell primary="content" title="营业执照：" align-items="flex-start">
        <div class="img-box">
          <ul class="img-row">
            <li v-for="(uri, imgIdx) of image.licenseImageUris" :key="imgIdx">
              <div class="pt-box">
                <img class="img-position-center" :src="uri">
              </div>
              <i v-if="uri" class="del" @click="onDelImage('licence', imgIdx)"></i>
              <div class="progress" v-if="!uri">
                <spinner type="bubbles" size="40px"></spinner>
              </div>
            </li>
            <li class="upd-btn" v-if="image.licenseImageUris.length < 1">
              <input type="file" class="file-ipt" accept="image/*" @change="onUploadImg($event, 'licence')"/>
            </li>
          </ul>
        </div>
      </cell>
      <cell primary="content" title="冲凉房：" value-align="left" align-items="flex-start">
        <m-radio :options="isShowerRoom" v-model="point.isShowerRoom"></m-radio>
      </cell>
      <cell primary="content" title="储物柜：" value-align="left" align-items="flex-start">
        <m-radio :options="isStorageCabinet" v-model="point.isStorageCabinet"></m-radio>
      </cell>
      <x-input title="相关认证：" v-model="point.certificate" placeholder="请输入认证资质" :show-clear="false"></x-input>
      <cell primary="content" title="浅水区：" value-align="left" align-items="flex-start">
        <div class="cell-con">
          <div class="" style="padding-top: 0;">
            <input class="half-w" type="number" v-model="point.shallowArea" placeholder="请输入浅水区深度"/>米
          </div>
        </div>
      </cell>
      <cell primary="content" title="深水区：" value-align="left" align-items="flex-start">
        <div class="cell-con">
          <div class="" style="padding-top: 0;">
            <input class="half-w" type="number" v-model="point.deepArea" placeholder="请输入深水区深度"/>米
          </div>
        </div>
      </cell>
      <x-textarea title="场所简介" :height="50" v-model="point.description" placeholder="选填"></x-textarea>
    </group>

    <div class="padding-15">
      <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="onPointJoin">{{point.id ? '提交修改' : '加盟'}}</x-button>
    </div>
  </div>
</template>

<script>
  import {Group, XInput, Cell, PopupRadio, Datetime, XAddress, XTextarea, ChinaAddressV4Data, XButton, Spinner} from 'vux';
  import {MRadio, MCheckbox} from '@/components';
  import {Utils} from '@/utils/utils';
  import {WxUtil} from '@/utils/wx-util';

  export default {
    name: 'teaching-point-join',
    components: {
      XTextarea,
      Group,
      XInput,
      Cell,
      PopupRadio,
      Datetime,
      XAddress,
      XButton,
      MRadio,
      MCheckbox,
      Spinner,
    },
    data(){
      return {
        floatLocation: [
          {
            value: 0,
            name: '江',
          }, {
            value: 1,
            name: '河',
          }, {
            value: 2,
            name: '湖'
          }, {
            value: 3,
            name: '海'
          }
        ],
        swimLocation: [
          {
            value: 0,
            name: '室内游泳池',
          }, {
            value: 1,
            name: '露天游泳池',
          }
        ],
        constantTemperature: [{
          value: 1,
          name: '是否恒温',
        }],
        disinfectionMethod: [
          {
            value: '一级',
            key: 1,
          }, {
            value: '二级',
            key: 2,
          }, {
            value: '三级',
            key: 3,
          }
        ],
        isShowerRoom: [{value: 1, name: '是'}],
        isStorageCabinet: [{value: 1, name: '是'}],
        addressList: ChinaAddressV4Data,
        addressNames: '',
        point: {
          id: '',
          name: '',
          floatLocation: [],
          swimLocation: [],
          isConstantTemp: '',
          scale: '',
          lifeguardQty: '',
          area: '',
          waterChangePeroid: '',
          disinfectionMethod: '',
          address: [],
          addressDetail: '',
          isShowerRoom: 0,
          isStorageCabinet: 0,
          certificate: '',
          shallowArea: '',
          deepArea: '',
          description: '',
          licenseId: '',
          lat: 23.28693,
          lon: 113.9139
        },
        image: {
          realSceneImageTokens: [],
          realSceneImageUris: [],
          licenseImageTokens: [],
          licenseImageUris: [],
        },
      };
    },
    created(){
      this.point.id = this.$route.query.id;
      WxUtil.getUserLocation((resp) => {
        if(resp){
          this.point.lat = resp.lat;
          this.point.lon = resp.lon;
        }
      });
    },
    mounted(){
      if(this.point.id){
        this.getPointData();
      }
    },
    methods: {
      /** 获取教点数据 */
      getPointData(){
        this.$vux.loading.show();
        this.$api.getPointDetail({id: this.point.id})
          .then(resp => {
            if(resp.success){
              this.resolvePointData(resp.result);
            }
            this.$vux.loading.hide();
          });
      },

      /** 处理编辑教点数据 */
      resolvePointData(sourceData){
        const source = sourceData.getTechPointForEditDto.techPoint;
        const photosToken = sourceData.photos;
        const targetHash = {
          floatLocation: [],
          swimLocation: [],
        };

        targetHash['name'] = source.name;
        source.floatLocation.split('').forEach((it, idx) => {
          if(+it === 1){
            targetHash['floatLocation'].push(this.floatLocation[idx].value + '');
          }
        });
        source.swimLocation.split('').forEach((it2, idx2) => {
          if(+it2 === 1){
            if(idx2 < 2){
              targetHash['swimLocation'].push(this.swimLocation[idx2].value + '');
            }else{
              targetHash['isConstantTemp'] = it2;
            }
          }
        });
        targetHash['scale'] = source.scale;
        targetHash['lifeguardQty'] = source.lifeguardQty;
        targetHash['area'] = source.area;
        targetHash['waterChangePeroid'] = source.waterChangePeroid;
        targetHash['disinfectionMethod'] = source.disinfectionMethod;
        targetHash['address'] = source.address.split('$')[0].split(' ');
        targetHash['addressDetail'] = source.address.split('$')[1];
        targetHash['isShowerRoom'] = source.isShowerRoom ? 1 : 0;
        targetHash['isStorageCabinet'] = source.isStorageCabinet ? 1 : 0;
        targetHash['certificate'] = source.certificate;
        targetHash['shallowArea'] = source.shallowArea;
        targetHash['deepArea'] = source.deepArea;
        targetHash['description'] = source.description;
        targetHash['licenseId'] = source.licenseId;

        // 下载营业执照图片
        this.image.licenseImageTokens.push(targetHash['licenseId']);
        this.$api.downloadImage({id: targetHash['licenseId']})
          .then(resp => {
            if(resp.success){
              const uriPrefix = `data:image/png;base64,${resp.result}`;

              this.$set(this.image.licenseImageUris, 0, uriPrefix);
            }
          });

        // 下载教点实景图片
        photosToken.forEach((photo, idx) => {
          // 教点实景图片ID
          this.image.realSceneImageTokens.push(photo.sitePhototId);
          this.$api.downloadImage({id: photo.sitePhototId})
            .then(resp => {
              if(resp.success){
                const uriPrefix = `data:image/png;base64,${resp.result}`;

                this.image.realSceneImageUris.push(uriPrefix);
              }
            });
        });

        this.point = Object.assign({}, this.point, targetHash);
      },

      /** 教点加盟 */
      onPointJoin(){
        if(this.validForm()){
          const params = this.mixParams();

          this.$api.teachingPointJoin(params)
            .then(resp => {
              if(resp.success){
                if(resp.result != 0){
                  // 绑定实景图片
                  this.$api.connectedSitePhotos({techPointId: resp.result, photoIds: this.image.realSceneImageTokens})
                    .then(resp => {
                      if(resp.success){
                        const _this = this;

                        _this.$vux.toast.show({
                          type: 'success',
                          text: this.point.id ? '修改成功！' : '加盟成功！',
                          onHide(){
                            _this.$router.push({name: 'Index'});
                          }
                        });
                      }
                    });
                }else{
                  _this.$vux.toast.show({
                    type: 'error',
                    text: '您已加盟过教点，请勿重复加盟！',
                  });
                }
              }
            });
        }
      },

      /** 字段处理 */
      mixParams(){
        let floatTemp = [0, 0, 0, 0];
        let swimTemp = [0, 0, 0];
        const query = Object.assign({}, this.point);

        this.point['floatLocation'].forEach((it1, idx1) => {
          floatTemp[it1] = 1;
        });

        this.point['swimLocation'].forEach((it2, idx2) => {
          swimTemp[it2] = 1;
        });

        if(this.point['isConstantTemp']){
          swimTemp[2] = 1;
        }
        query['floatLocation'] = floatTemp.join('');
        query['swimLocation'] = swimTemp.join('');
        query['address'] = this.addressNames.join(' ') + '$' + query.addressDetail;
        query['isShowerRoom'] = Number(this.point['isShowerRoom']) === 1 ? true : false;
        query['isStorageCabinet'] = Number(this.point['isStorageCabinet']) === 1 ? true : false;
        query['licenseId'] = this.image.licenseImageTokens[0];

        return query;
      },

      onGetAddress(ids, names){
        this.addressNames = names;
      },

      /** 必填项校验 */
      validForm(){
        let unError = true;
        let errMsg = '';
        const data = this.point;

        for(const k in data){
          switch (k){
            case 'name':
              if(data[k].length <= 0){
                errMsg = '请输入场所名称';
                unError = false;
              }
              break;
            case 'swimLocation':
              if(data['floatLocation'].length <= 0 && data['swimLocation'].length <= 0){
                errMsg = '浮潜和游泳至少选择一项';
                unError = false;
              }
              break;
            case 'scale':
              if(!data[k]){
                errMsg = '请输入员工数';
                unError = false;
              }
              break;
            case 'lifeguardQty':
              if(!data[k]){
                errMsg = '请输入救生员数量';
                unError = false;
              }
              break;
            case 'area':
              if(!data[k]){
                errMsg = '请输入泳池面积';
                unError = false;
              }
              break;
            case 'waterChangePeroid':
              if(!data[k]){
                errMsg = '请输入换水周期';
                unError = false;
              }
              break;
            case 'disinfectionMethod':
              if(!data[k]){
                errMsg = '请选择消毒方式';
                unError = false;
              }
              break;
            case 'address':
              if(data[k].length <= 0){
                errMsg = '请选择地址';
                unError = false;
              }
              break;
            case 'addressDetail':
              if(!data[k]){
                errMsg = '请输入详细地址';
                unError = false;
              }
              break;
            default: break;
          }
          if(!unError) break;
        }

        if(!unError){
          this.$vux.toast.show({text: errMsg});
        }

        return unError;
      },

      /** 图片上传 */
      onUploadImg(e, imgType){
        const files = Array.from(e.target.files);
        const formData = new FormData();
        let count = 0;

        files.forEach((itm, idx) => {
          Utils.renderFile(itm, (blod) => {
            formData.append(`file${idx}`, blod, itm.name);
            count += 1;
          });

          if(imgType === 'scene'){
            this.image.realSceneImageUris.push('');
          }else{
            this.image.licenseImageUris.push('');
          }
        });

        // 清空file表单
        e.target.value = '';

        const timer = setInterval(() => {
          if(files.length === count){
            clearInterval(timer);
            if(imgType === 'scene'){
              this._uploadSceneImages(formData);
            }else{
              this._uploadLicenceImages(formData);
            }
          }
        }, 100);
      },

      /** 教点实景图上传 */
      _uploadSceneImages(formData){
        this.$api.uploadImage(formData)
          .then(resp => {
            if(resp.success){
              const originLen = this.image.realSceneImageTokens.length;

              resp.result.forEach((itm, idx) => {
                this.image.realSceneImageTokens.push(itm.fileToken);

                this.$api.downloadImage({id: itm.fileToken})
                  .then(resp => {
                    if(resp.success){
                      const uriPrefix = `data:image/png;base64,${resp.result}`;
                      const curIdx = originLen + idx;

                      this.$set(this.image.realSceneImageUris, curIdx, uriPrefix);
                    }
                  });
              });
            }
          });
      },

      /** 上传营业执照 */
      _uploadLicenceImages(formData){
        this.$api.uploadImage(formData)
          .then(resp => {
            if(resp.success){
              const originLen = this.image.licenseImageTokens.length;

              resp.result.forEach((itm, idx) => {
                this.image.licenseImageTokens.push(itm.fileToken);

                this.$api.downloadImage({id: itm.fileToken})
                  .then(resp => {
                    if(resp.success){
                      const uriPrefix = `data:image/png;base64,${resp.result}`;
                      const curIdx = originLen + idx;

                      this.$set(this.image.licenseImageUris, curIdx, uriPrefix);
                    }
                  });
              });
            }
          });
      },

      /** 删除图片 */
      onDelImage(imgType, imgIdx){
        const id = imgType === 'scene' ? this.image.realSceneImageTokens[imgIdx] : this.image.licenseImageTokens[imgIdx];

        this.$vux.loading.show();
        this.$api.deleteImage({id: id})
          .then(resp => {
            if(resp.success){
              this.$vux.toast.show('图片删除成功');

              if(imgType === 'scene'){
                this.image.realSceneImageTokens.splice(imgIdx, 1);
                this.image.realSceneImageUris.splice(imgIdx, 1);
              }else{
                this.image.licenseImageTokens.splice(imgIdx, 1);
                this.image.licenseImageUris.splice(imgIdx, 1);
              }
            }
            this.$vux.loading.hide();
          });
      },
    },
  }
</script>

<style lang="less" scoped>
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
    text-align: left;

    .img-row{
      display: flex;
      flex-wrap: wrap;

      li{
        position: relative;
        width: 90px;
        height: 90px;
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
          z-index: 100;
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
        line-height: 75px;
        left: 0;
        top: 0;
        text-align: center;
        z-index: 5;
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
