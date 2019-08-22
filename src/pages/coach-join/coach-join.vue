<template>
  <div id="coachJoin">
    <!--<div class="padding-tb-15 coach-img">-->
      <!--<img :src="headImgUrl">-->
    <!--</div>-->

    <div class="group-wrp">
      <group label-width="5.2em" label-margin-right="1.5em" label-align="left">
        <cell title="头像" value-align="right" is-link>
          <div class="avatar">
            <img :src="headImgUrl">
          </div>
        </cell>
        <x-input title="姓名" text-align="right" v-model="coach.name" placeholder="请输入" :show-clear="false"></x-input>
        <!--<cell primary="content" title="性别：" value-align="left">-->
          <!--<m-radio :options="gender" v-model="coach.gender" :margin-right="40"></m-radio>-->
        <!--</cell>-->
        <!--<popup-picker title="性别" :data="certificateLevel" v-model="coach.certificateLevel" value-text-align="right" placeholder="请选择"></popup-picker>-->
        <popup-radio title="性别" :options="gender" v-model="coach.gender" :columns="1" placeholder="请选择">
          <p slot="popup-header" class="vux-1px-b pop-radio-title">请选择性别</p>
        </popup-radio>
        <x-input title="手机" type="tel" text-align="right" v-model="coach.phone" placeholder="请输入" :show-clear="false"></x-input>
      </group>
    </div>

    <div class="group-wrp">
      <group label-width="5.2em" label-margin-right="1.5em">
        <x-address title="地址" @on-shadow-change="onGetAddress" :list="addressList" v-model="coach.address" placeholder="请选择"></x-address>
        <x-input title="微信" v-model="coach.wechat" text-align="right" placeholder="请输入" :show-clear="false"></x-input>
        <datetime title="出生年月" format="YYYY-MM" :min-year="1950" v-model="coach.birthdate" placeholder="请选择"></datetime>
        <x-input title="身高(cm)" type="number" text-align="right" v-model="coach.height" placeholder="请输入" :show-clear="false"></x-input>
        <popup-picker title="证书等级" :data="certificateLevel" v-model="coach.certificateLevel" placeholder="请选择"></popup-picker>
        <x-input title="职业" v-model="coach.position" text-align="right" placeholder="请输入" :show-clear="false"></x-input>
        <x-input title="公司名称" v-model="coach.company" text-align="right" placeholder="请输入" :show-clear="false"></x-input>
      </group>
    </div>

    <div class="group-wrp txt-area ">
      <div class="txt-title">教练简介</div>
      <x-textarea :height="80" v-model="coach.profile" placeholder="请填写您对自己一份详细的自我介绍..."></x-textarea>
    </div>

    <div class="padding-15">
      <x-button :gradients="['#596EEE', '#596EEE']" @click.native="onCoachJoin">保存</x-button>
    </div>
  </div>
</template>

<script>
  import {Group, XInput, Cell, Datetime, XAddress, XTextarea, ChinaAddressV4Data, XButton, PopupPicker, PopupRadio} from 'vux';
  import {MRadio} from '@/components';
  import {Utils} from '@/utils/utils';

  export default {
    name: 'coach-join',
    components: {
      XTextarea,
      Group,
      XInput,
      Cell,
      Datetime,
      XAddress,
      XButton,
      PopupPicker,
      MRadio,
      PopupRadio,
    },
    data(){
      return {
        gender: [
          {
            value: '男',
            key: 1,
          }, {
            value: '女',
            key: 0,
          },
        ],
        certificateLevel: [['高级', '中级', '初级']],
        addressList: ChinaAddressV4Data,
        addressNames: [],
        coach: {
          id: '',
          name: '',
          gender: '',
          phone: '',
          address: [],
          wechat: '',
          position: '',
          company: '',
          certificateLevel: [],
          profile: '',
          birthdate: '',
          height: '',
        },
      };
    },
    computed: {
      // 头像地址
      headImgUrl(){
        return window.localStorage.getItem('head_img');
      },
    },
    created(){
      this.coach.id = this.$route.query.id;
      if(this.coach.id){
        this.getCoachData();
      }
    },
    methods: {
      /** 获取教练数据 */
      getCoachData(){
        this.$vux.loading.show();
        this.$api.getCoachDetail({id: this.coach.id})
          .then(resp => {
            if(resp.success){
              this.resolveCoachData(resp.result.tech);
            }
            this.$vux.loading.hide();
          });
      },

      /** 教练数据处理 */
      resolveCoachData(source){
        const hash = Object.assign({}, source);

        hash['gender'] = hash['gender'] ? 1 : 0;
        hash['address'] = hash['address'].split(',');
        hash['certificateLevel'] = [hash['certificateLevel']];

        if(hash['birthdate']){
          const oDate = new Date(hash['birthdate']);
          const year = oDate.getFullYear();
          const month = oDate.getMonth() + 1;

          hash['birthdate'] = `${year}-${Utils.padZero(month)}`;
        }

        this.coach = Object.assign({}, this.coach, hash);
      },

      /** 提交加盟数据 */
      onCoachJoin(){
        if(this.validForm()){
          const params = this.mixField();

          this.$vux.loading.show();
          this.$api.coachJoin(params)
            .then(resp => {
              if(resp.success){
                const _this = this;

                _this.$vux.toast.show({
                  type: 'success',
                  text: this.coach.id ? '修改成功！' : '加盟成功！',
                  onHide(){
                    if(!this.coach.id){
                      _this.$router.push({name: 'CoachQualify'});
                    }
                  },
                });
              }else{
                this.$vux.toast.show('您已加盟过，请勿重复加盟！');
              }
              this.$vux.loading.hide();
            });
        }
      },

      onGetAddress(ids, names){
        this.addressNames = names;
      },

      validForm(){
        let unError = true;
        let errMsg = '';
        const data = this.coach;

        for(const k in data){
          switch (k){
            case 'name':
              if(!data[k]){
                errMsg = '请输入真实姓名';
                unError = false;
              }
              break;
            case 'phone':
              const phoneReg = /^1[345678]\d{9}$/;

              if(!data[k]){
                errMsg = '请输入手机号码';
                unError = false;
              }else if(!phoneReg.test(String(data[k]))){
                errMsg = '手机号码格式有误';
                unError = false;
              }
              break;
            case 'address':
              if(data[k].length <= 0){
                errMsg = '请选择地址';
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

      mixField(){
        const params = Object.assign({}, this.coach);

        params['gender'] == 1 ? params['gender'] = true : params['gender'] = false;
        params['address'] = this.addressNames.join(',');
        params['certificateLevel'] = params['certificateLevel'][0];

        return params;
      },
    },
  }
</script>

<style lang="less" scoped>
  .coach-img{
    text-align: center;


    img{
      width: 100px;
      height: 100px;
      border-radius: 100px;
    }
  }
  .group-wrp{
    padding-right: 10px;
    background: #fff;
  }
  .txt-area{
    margin-top: 10px;

    .txt-title{
      padding: 15px;
      font-size: 15px;
    }
  }
  .avatar{
    width: 46px;
    height: 46px;
    border-radius: 46px;
    overflow: hidden;

    img{
      width: 100%;
      min-height: 46px;
      vertical-align: top;
    }
  }
  .pop-radio-title{
    padding: 12px;
    color: #666;
    font-size: 15px;
    text-align: center;
  }

  /deep/ .weui-textarea{
    font-size: 14px;
  }
  /deep/ .weui-cell{
    padding: 15px 2px 15px 15px;
  }
  /deep/ .weui-cells{
    margin-top: 10px;
  }
  /deep/ .weui-cells:before,
  /deep/ .weui-cells:after{
    border-top: none;
    border-bottom: none;
  }
  /deep/ .vux-cell-value{
    color: #323232;
  }
</style>
