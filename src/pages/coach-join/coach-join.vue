<template>
  <div id="coachJoin">
    <div class="padding-tb-15 coach-img">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553696314856&di=cb03cfa0c95730ba1b4ff4f3074b44e9&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F07%2F06%2F88T58PICWVb.jpg">
    </div>
    <group title="必填项" label-width="5.2em" label-margin-right="1.5em" label-align="left">
      <x-input title="姓名：" v-model="coach.name" placeholder="必填" :show-clear="false"></x-input>
      <cell primary="content" title="性别：" value-align="left">
        <m-radio :options="gender" v-model="coach.gender" :margin-right="40"></m-radio>
      </cell>
      <x-input title="手机：" type="tel" v-model="coach.phone" placeholder="必填" :show-clear="false"></x-input>
      <x-input title="微信：" v-model="coach.wechat" placeholder="必填" :show-clear="false"></x-input>
      <x-address title="地址：" @on-shadow-change="onGetAddress" :list="addressList" v-model="coach.address" placeholder="请选择地址" value-text-align="left"></x-address>
    </group>

    <group title="选填项" label-width="5.2em" label-margin-right="1.5em">
      <popup-picker title="证书等级：" :data="certificateLevel" v-model="coach.certificateLevel" value-text-align="left" placeholder="请选择证书等级"></popup-picker>
      <x-input title="职位：" v-model="coach.position" placeholder="选填" :show-clear="false"></x-input>
      <x-input title="公司名称：" v-model="coach.company" placeholder="选填" :show-clear="false"></x-input>
      <x-textarea title="个人简介：" :height="50" v-model="coach.profile" placeholder="选填"></x-textarea>
      <datetime title="出生年月：" format="YYYY-MM" :min-year="1950" v-model="coach.birthdate" value-text-align="left"></datetime>
      <x-input title="身高(cm)：" type="number" v-model="coach.height" placeholder="选填" :show-clear="false"></x-input>
    </group>

    <div class="padding-15">
      <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="onCoachJoin">加盟</x-button>
    </div>
  </div>
</template>

<script>
  import {Group, XInput, Cell, Datetime, XAddress, XTextarea, ChinaAddressV4Data, XButton, PopupPicker} from 'vux';
  import {MRadio} from '@/components';

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
    },
    data(){
      return {
        gender: [
          {
            value: 1,
            name: '男'
          }, {
            value: 0,
            name: '女',
          }
        ],
        certificateLevel: [['高级', '中级', '初级']],
        addressList: ChinaAddressV4Data,
        addressNames: [],
        coach: {
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
    methods: {
      onCoachJoin(){
        if(this.validForm()){
          const params = this.mixField();

          this.$api.coachJoin(params)
            .then(resp => {
              if(resp.success){
                this.$vux.toast.show({
                  type: 'success',
                  text: '加盟成功！',
                  onHide(){
                    this.$router.push({name: 'CoachQualify'});
                  },
                });
              }
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
</style>
