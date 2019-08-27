<template>
  <div>
    <div class="group-wrp" style="margin-top: 10px;">
      <group label-width="5.2em" label-margin-right="1em" label-align="left">
        <cell title="商家相册">
          <div class="img-list img-box">
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
        <x-input title="教点名称" v-model="point.name" text-align="right" placeholder="请输入" :show-clear="false"></x-input>
        <cell primary="content" title="地址：" align-items="flex-start" value-align="right" is-link>
          <div @click="isShowMap = true">{{point.address ? point.address : '请选择地址'}}</div>
        </cell>
        <x-input title="电话" v-model="point.tel" text-align="right" placeholder="请输入" :show-clear="false"></x-input>
      </group>
    </div>

    <div class="oper-flex">
      <div class="left-sp">收费模式</div>
      <div class="right-sp">
        <span @click="isShowTicketModal = true">添加</span>
      </div>
    </div>
    <div class="group-wrp">
      <group>
        <template v-for="(ticket, tIdx) of ticketModes">
          <cell
            :title="ticket.name"
            text-align="right"
            :key="tIdx">
            <div class="del-btn-flex">
              <span @click="onDeleteTicketMode(ticket.id, tIdx)"></span>
            </div>
          </cell>
        </template>
        <!--<cell title="月票" text-align="right">-->
          <!--<div class="del-btn-flex">-->
            <!--<span></span>-->
          <!--</div>-->
        <!--</cell>-->
      </group>
    </div>

    <div class="oper-flex">
      <div class="left-sp">商家规模</div>
    </div>
    <div class="group-wrp">
      <group>
        <x-input title="员工人数" v-model="point.scale" text-align="right" placeholder="请输入" :show-clear="false"></x-input>
        <x-input title="救生员数量" v-model="point.lifeguardQty" text-align="right" placeholder="请输入" :show-clear="false"></x-input>
        <x-input title="面积平方米" v-model="point.area" text-align="right" placeholder="请输入" :show-clear="false"></x-input>
      </group>
    </div>

    <div class="oper-flex">
      <div class="left-sp">配套设施</div>
    </div>
    <div class="group-wrp">
      <group label-width="130px">
        <x-input title="换水周期(天/次)" v-model="point.waterChangePeroid" text-align="right" placeholder="请输入" :show-clear="false"></x-input>
        <popup-radio title="消毒方式" :options="disinfectionMethod" v-model="point.disinfectionMethod" :columns="1" placeholder="请选择">
          <p slot="popup-header" class="vux-1px-b pop-radio-title">请选择消毒方式</p>
        </popup-radio>
        <cell primary="content" title="冲凉房" value-align="right" align-items="flex-start">
          <m-radio :options="isShowerRoom" v-model="point.isShowerRoom"></m-radio>
        </cell>
        <cell primary="content" title="储物柜" value-align="right" align-items="flex-start">
          <m-radio :options="isStorageCabinet" v-model="point.isStorageCabinet"></m-radio>
        </cell>
      </group>
    </div>

    <div class="casul-box">
      <div class="csl-title" style="padding-top: 12px;">营业执照</div>
      <div class="csl-inner">
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
      </div>
    </div>

    <div class="group-wrp txt-area ">
      <div class="txt-title">教点简介</div>
      <x-textarea :height="80" v-model="point.description" placeholder=""></x-textarea>
    </div>

    <div class="casul-box">
      <div class="oper-flex">
        <div class="left-sp" style="color: #323232">教点特色</div>
        <div class="right-sp">
          <span @click="isShowFeatureModal = true">添加</span>
        </div>
      </div>
      <div class="csl-inner">
        <div
          class="feature-it"
          v-for="(feature, idx) of features"
          :key="idx"
          :class="{on: selectedFeatures.indexOf(feature.techPointFeature.id) > -1}">
          <span @click="onSelectFeature(feature.techPointFeature.id)">{{feature.techPointFeature.name}}</span>
          <i v-show="selectedFeatures.indexOf(feature.techPointFeature.id) < 0" @click="onDelFeature(feature.techPointFeature.id)"></i>
        </div>
      </div>
    </div>

    <!--<div class="group-wrp">
      <group>
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
        &lt;!&ndash;<x-address title="地址" :list="addressList" @on-shadow-change="onGetAddress" v-model="point.address" placeholder="请选择地址" value-text-align="left"></x-address>&ndash;&gt;
        &lt;!&ndash;<x-textarea title="详细地址" :height="50" v-model="point.addressDetail" placeholder="请输入详细地址"></x-textarea>&ndash;&gt;

        &lt;!&ndash;<cell primary="content" title="地址：" align-items="flex-start" value-align="left" is-link>&ndash;&gt;
          &lt;!&ndash;<div @click="isShowMap = true">{{point.address ? point.address : '请选择地址'}}</div>&ndash;&gt;
        &lt;!&ndash;</cell>&ndash;&gt;
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
    </div>

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
    </group>-->

    <div class="padding-15">
      <x-button :gradients="['#597AEE', '#596BEE']" @click.native="onPointJoin">保存</x-button>
    </div>

    <!-- 添加特色项 -->
    <div class="feature-wrp" v-transfer-dom>
      <confirm
        v-model="isShowFeatureModal"
        title="添加特色"
        @on-confirm="onConfirmAddFeature">
        <x-input class="featureInput" v-model="feature" placeholder="请输入特色名称" :show-clear="false"></x-input>
      </confirm>
    </div>

    <!-- 添加收费模式 -->
    <div class="feature-wrp" v-transfer-dom>
      <confirm
        v-model="isShowTicketModal"
        title="添加收费模式"
        @on-confirm="onAddTicketMode">
        <x-input class="featureInput" v-model="ticketModeName" placeholder="请输入特色名称" :show-clear="false"></x-input>
      </confirm>
    </div>

    <gaode-map :show="isShowMap" @on-get-address="onGetAddressFromMap"></gaode-map>
  </div>
</template>

<script>
  import {TransferDomDirective as TransferDom, Confirm, Group, XInput, Cell, PopupRadio, Datetime, XAddress, XTextarea, ChinaAddressV4Data, XButton, Spinner} from 'vux';
  import {MRadio, MCheckbox} from '@/components';
  import {Utils} from '@/utils/utils';
  import {WxUtil} from '@/utils/wx-util';
  import GaodeMap from './components/GaodeMap';

  export default {
    name: 'teaching-point-join',
    directives: {
      TransferDom,
    },
    components: {
      Confirm,
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
      GaodeMap,
    },
    data(){
      return {
        isShowFeatureModal: false,
        isShowTicketModal: false,
        isShowMap: false,
        /*floatLocation: [
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
        }],*/
        feature: '',          // 新建特色名称
        features: [],         // 特色列表
        selectedFeatures: [], // 已选择的特色ID
        ticketModeName: '',       // 新建收费模式名称
        ticketModes: [],      // 已有收费模式
        disinfectionMethod: [ // 消毒方式级别
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
        isShowerRoom: [{value: 1, name: '是'}, {value: 0, name: '否'}],
        isStorageCabinet: [{value: 1, name: '是'}, {value: 0, name: '否'}],
        addressList: ChinaAddressV4Data,
        addressNames: '',
        point: {
          id: '',
          name: '',
          // floatLocation: [],
          // swimLocation: [],
          // isConstantTemp: '',
          scale: '',
          lifeguardQty: '',
          area: '',
          waterChangePeroid: '',
          disinfectionMethod: '',
          address: '',
          // addressDetail: '',
          isShowerRoom: 0,
          isStorageCabinet: 0,
          certificate: '',
          shallowArea: '',
          deepArea: '',
          description: '',
          licenseId: '',
          lat: 23.28693,
          lon: 113.9139,
          tel: '',
          ticket: 0,
          // ticketType: 0,
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
      this.getAllFeatures();
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

      /** 添加教点特色 */
      onConfirmAddFeature(){
        if(this.feature){
          this.$vux.loading.show('正在提交...');
          this.$api.addTeachPointFeatures({name: this.feature})
            .then(resp => {
              if(resp.success){
                this.$vux.toast.show('添加成功！');
                this.getAllFeatures();
              }
              this.$vux.loading.hide();
            });
        }else{
          this.$vux.toast.show('特色名称不能为空');
        }
      },

      /** 获取教点特色 */
      getAllFeatures(){
        this.$api.getAllFeatures()
          .then(resp => {
            if(resp.success){
              this.features = resp.result.items;
            }
          });
      },

      /** 删除教点特色 */
      onDelFeature(id){
        this.$vux.loading.show('正在删除...');
        this.$api.deleteFeatureWidthId({id: id})
          .then(resp => {
            if(resp.success){
              this.$vux.toast.show('删除成功!');
            }
            this.$vux.loading.hide();
          });
      },

      /** 选择教点特色 */
      onSelectFeature(id){
        const index = this.selectedFeatures.indexOf(id);

        if(index > -1){
          this.selectedFeatures.splice(index, 1);
        }else{
          this.selectedFeatures.push(id);
        }
      },

      /** 新增收费模式 */
      onAddTicketMode(){
        const hash = {
          techPointId: this.point.id,
          name: this.ticketModeName,
        };

        this.$vux.loading.show('正在提交...');
        this.$api.addTicketMode(hash)
          .then(resp => {
            if(resp.success){
              this.$vux.toast.show('添加成功！');
              this.ticketModes.push(resp.result);
            }
            this.$vux.loading.hide();
          });
      },

      /** 删除收费模式 */
      onDeleteTicketMode(id){
        this.$vux.loading.show();
        this.$api.deleteTicketMode({id: id})
          .then(resp => {
            if(resp.success){
              this.$vux.toast.show('删除成功！');
              this.ticketModes.forEach((mode, idx) => {
                if(mode.id === id){
                  this.ticketModes.splice(idx, 1);
                }
              });
            }
            this.$vux.loading.hide();
          });
      },

      /** 绑定教点特色 */
      bindFeaturesForPoint(){
        this.$api.bindFeaturesForPoint({techPointId: this.point.id, featureIds: this.selectedFeatures});
      },

      /** 处理编辑教点数据 */
      resolvePointData(sourceData){
        const source = sourceData.getTechPointForEditDto.techPoint;
        const photosToken = sourceData.photos;
        const targetHash = {
          // floatLocation: [],
          // swimLocation: [],
        };

        targetHash['name'] = source.name;
        // source.floatLocation.split('').forEach((it, idx) => {
        //   if(+it === 1){
        //     targetHash['floatLocation'].push(this.floatLocation[idx].value + '');
        //   }
        // });
        // source.swimLocation.split('').forEach((it2, idx2) => {
        //   if(+it2 === 1){
        //     if(idx2 < 2){
        //       targetHash['swimLocation'].push(this.swimLocation[idx2].value + '');
        //     }else{
        //       targetHash['isConstantTemp'] = it2;
        //     }
        //   }
        // });
        targetHash['scale'] = source.scale;
        targetHash['lifeguardQty'] = source.lifeguardQty;
        targetHash['area'] = source.area;
        targetHash['waterChangePeroid'] = source.waterChangePeroid;
        targetHash['disinfectionMethod'] = source.disinfectionMethod;
        targetHash['address'] = source.address;
        // targetHash['address'] = source.address.split('$')[0].split(' ');
        // targetHash['addressDetail'] = source.address.split('$')[1];
        targetHash['isShowerRoom'] = source.isShowerRoom ? 1 : 0;
        targetHash['isStorageCabinet'] = source.isStorageCabinet ? 1 : 0;
        targetHash['certificate'] = source.certificate;
        targetHash['shallowArea'] = source.shallowArea;
        targetHash['deepArea'] = source.deepArea;
        targetHash['description'] = source.description;
        targetHash['licenseId'] = source.licenseId;
        targetHash['tel'] = source.tel;

        // 下载营业执照图片
        if(targetHash['licenseId']){
          this.image.licenseImageTokens.push(targetHash['licenseId']);
          this.$api.downloadImage({id: targetHash['licenseId']})
            .then(resp => {
              if(resp.success){
                const uriPrefix = `data:image/png;base64,${resp.result}`;

                this.$set(this.image.licenseImageUris, 0, uriPrefix);
              }
            });
        }

        // 下载教点实景图片
        this.image.realSceneImageTokens = photosToken;
        photosToken.forEach((photo, idx) => {
          // 教点实景图片ID
          // this.image.realSceneImageTokens.push(photo.sitePhototId);
          this.$api.downloadImage({id: photo.sitePhototId})
            .then(resp => {
              if(resp.success){
                const uriPrefix = `data:image/png;base64,${resp.result}`;

                this.image.realSceneImageUris.push(uriPrefix);
              }
            });
        });

        // targetHash['ticketModes'] = sourceData.ticketModes;
        this.point = Object.assign({}, this.point, targetHash);

        // 保存已选择的特色的ID
        sourceData.features.forEach((f, i) => {
          this.selectedFeatures.push(f.id);
        });
        // 收费模式
        this.ticketModes = sourceData.ticketModes;
      },

      /** 教点加盟 */
      onPointJoin(){
        if(this.validForm()){
          const params = this.mixParams();

          this.$vux.loading.show('正在提交...');
          this.$api.teachingPointJoin(params)
            .then(resp => {
              this.$vux.loading.hide();
              if(resp.success){
                if(resp.result != 0){
                  this.bindFeaturesForPoint();
                  // 绑定实景图片
                  const tokens = this.image.realSceneImageTokens.map(item => item.sitePhototId);
                  this.$api.connectedSitePhotos({techPointId: resp.result, photoIds: tokens})
                    .then(resp => {
                      if(resp.success){
                        const _this = this;

                        _this.$vux.toast.show({
                          type: 'success',
                          text: this.point.id ? '修改成功！' : '加盟成功！',
                          onHide(){
                            // _this.$router.push({name: 'Index'});
                            window.location.reload();
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
        // let floatTemp = [0, 0, 0, 0];
        // let swimTemp = [0, 0, 0];
        const query = Object.assign({}, this.point);

        // this.point['floatLocation'].forEach((it1, idx1) => {
        //   floatTemp[it1] = 1;
        // });

        // this.point['swimLocation'].forEach((it2, idx2) => {
        //   swimTemp[it2] = 1;
        // });

        // if(this.point['isConstantTemp']){
        //   swimTemp[2] = 1;
        // }
        // query['floatLocation'] = floatTemp.join('');
        // query['swimLocation'] = swimTemp.join('');
        // query['address'] = this.addressNames.join(' ') + '$' + query.addressDetail;
        query['isShowerRoom'] = Number(this.point['isShowerRoom']) === 1 ? true : false;
        query['isStorageCabinet'] = Number(this.point['isStorageCabinet']) === 1 ? true : false;
        query['licenseId'] = this.image.licenseImageTokens[0];

        return query;
      },

      onGetAddress(ids, names){
        this.addressNames = names;
      },

      /** 从地图获取地址 */
      onGetAddressFromMap(addr){
        const latAndLon = addr.location.split(',');

        this.isShowMap = false;
        this.point.address = `${addr.name} ${addr.address}`;
        this.point.lon = latAndLon[0];
        this.point.lat = latAndLon[1];
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
            // case 'swimLocation':
            //   if(data['floatLocation'].length <= 0 && data['swimLocation'].length <= 0){
            //     errMsg = '浮潜和游泳至少选择一项';
            //     unError = false;
            //   }
            //   break;
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
              // if(data[k].length <= 0){
              //   errMsg = '请选择地址';
              //   unError = false;
              // }
              if(!data[k]){
                errMsg = '请选择地址';
                unError = false;
              }
              break;
            // case 'addressDetail':
            //   if(!data[k]){
            //     errMsg = '请输入详细地址';
            //     unError = false;
            //   }
            //   break;
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
                const hash = {
                  sitePhototId: itm.fileToken,
                };

                this.image.realSceneImageTokens.push(hash);
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
        let id = '';
        let isBind2Point = false;

        if(imgType === 'scene'){
          if(this.image.realSceneImageTokens[imgIdx].id){
            id = this.image.realSceneImageTokens[imgIdx].id;
            isBind2Point = true;
          }else{
            id = this.image.realSceneImageTokens[imgIdx].sitePhototId;
          }

          this.$vux.loading.show();
          this.$api.deleteSceneImage({id: id}, isBind2Point)
            .then(resp => {
              if(resp.success){
                this.$vux.toast.show('图片删除成功');

                this.image.realSceneImageTokens.splice(imgIdx, 1);
                this.image.realSceneImageUris.splice(imgIdx, 1);
                // if(imgType === 'scene'){
                //   this.image.realSceneImageTokens.splice(imgIdx, 1);
                //   this.image.realSceneImageUris.splice(imgIdx, 1);
                // }else{
                //   this.image.licenseImageTokens.splice(imgIdx, 1);
                //   this.image.licenseImageUris.splice(imgIdx, 1);
                // }
              }
              this.$vux.loading.hide();
            });
        }else{
          id = this.image.licenseImageTokens[imgIdx];

          this.$vux.loading.show();
          this.$api.deleteLicenseImage({photoId: id})
            .then(resp => {
              if(resp.success){
                this.$vux.toast.show('图片删除成功');
                this.image.licenseImageTokens.splice(imgIdx, 1);
                this.image.licenseImageUris.splice(imgIdx, 1);
              }
              this.$vux.loading.hide();
            });
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .group-wrp{
    padding-right: 10px;
    background: #fff;
  }
  .oper-flex{
    margin-top: 10px;
    display: flex;
    padding: 10px;

    & > div{
      flex: 1;
    }
    .left-sp{
      color: #999;
    }
    .right-sp{
      text-align: right;

      span{
        color: #597AEE;
      }
    }
  }
  .del-btn-flex{
    span{
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url("/static/images/delete-btn-grey@2x.png") no-repeat center center;
      background-size: 15px auto;
    }
  }
  .casul-box{
    margin-top: 10px;
    padding: 0 10px;
    background: #fff;

    .oper-flex{
      padding-left: 0;
      padding-right: 0;
      margin-top: 0;
      border-bottom: 1px solid #E5E5E5;
    }
    .csl-inner{
      padding: 10px 0;
      font-size: 0;

      .feature-it{
        position: relative;
        display: inline-block;
        width: 76px;
        height: 25px;
        padding: 0 5px;
        line-height: 25px;
        margin: 0 12px 20px 0;
        font-size: 12px;
        text-align: center;
        border-radius: 3px;
        background: #EEEEEE;
        box-sizing: border-box;

        &.on{
          color: #5977EE;
          background: #E0E4FF;
        }
        span{
          display: inline-block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        i{
          position: absolute;
          width: 14px;
          height: 14px;
          right: -7px;
          top: -7px;
          background: url("/static/images/del-circle-blue.png") no-repeat center center;
          background-size: 13px auto;
        }
      }
    }
  }
  .img-box{
    text-align: right;

    .img-row{
      display: flex;
      flex-wrap: wrap;

      li{
        position: relative;
        width: 61px;
        height: 43px;
        margin-right: 12px;
        margin-bottom: 10px;
        border: 1px solid #dedede;
        border-radius: 5px;

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
          right: -7px;
          top: -7px;
          width: 14px;
          height: 14px;
          background: url("/static/images/del-circle-blue.png") no-repeat center center;
          background-size: 13px auto;
          /*z-index: 100;*/
        }
      }
      .upd-btn{
        position: relative;
        background: url("/static/images/plus-grey-lg.png") no-repeat center center;
        background-size: 20px auto;
        border: 1px solid #dedede;
        border-radius: 5px;
      }
      .progress{
        position: absolute;
        width: 100%;
        height: 100%;
        line-height: 43px;
        left: 0;
        top: 0;
        text-align: center;
        z-index: 5;
      }
    }
  }
  .pop-radio-title{
    padding: 12px;
    color: #666;
    font-size: 15px;
    text-align: center;
  }
  .featureInput{
    color: #323232;
    border-bottom: 1px solid #D5D5D6;
  }
  .txt-area{
    margin-top: 10px;

    .txt-title{
      padding: 15px;
      font-size: 15px;
    }
  }

  /deep/ .weui-textarea{
    font-size: 14px;
  }
  /deep/ .weui-cell{
    padding: 15px 2px 15px 15px;
  }
  /deep/ .weui-cells{
    margin-top: 0;
  }
  /deep/ .weui-cells:before,
  /deep/ .weui-cells:after{
    border-top: none;
    border-bottom: none;
  }
  /deep/ .vux-cell-value,
  /deep/ .weui-cell__ft{
    color: #323232;
  }



/*
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

*/

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
