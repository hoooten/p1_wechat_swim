<template>
  <div id="coachJoin">
    <div class="padding-tb-15 coach-img">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553696314856&di=cb03cfa0c95730ba1b4ff4f3074b44e9&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F07%2F06%2F88T58PICWVb.jpg">
    </div>
    <group title="必填项" label-width="4.5em" label-margin-right="1.5em" label-align="justify">
      <x-input title="姓名" v-model="coach.name" placeholder="必填"></x-input>
      <popup-picker title="性别" :data="gender" v-model="coach.gender" placeholder="请选择性别" value-text-align="left"></popup-picker>
      <x-input title="手机" type="tel" v-model="coach.phone" placeholder="必填"></x-input>
      <x-input title="微信" v-model="coach.wechat" placeholder="选填"></x-input>
      <x-address title="地址" :list="addressList" v-model="coach.address" placeholder="请选择地址"></x-address>
    </group>

    <group title="选填项" label-width="4.5em" label-margin-right="1.5em" label-align="justify">
      <popup-picker title="证书等级" :data="grade" v-model="coach.grade" value-text-align="left" placeholder="请选择证书等级"></popup-picker>
      <x-input title="职位" v-model="coach.position" placeholder="选填"></x-input>
      <x-input title="公司名称" v-model="coach.company" placeholder="选填"></x-input>
      <x-textarea title="个人简介" :height="50" placeholder="选填"></x-textarea>
      <datetime title="出生年月" format="YYYY-MM" v-model="coach.birthday" value-text-align="left"></datetime>
      <x-input title="身高" type="number" v-model="coach.tall" placeholder="必填"></x-input>
    </group>

    <div class="padding-15">
      <x-button :gradients="['#1D62F0', '#19D5FD']">加盟</x-button>
    </div>
  </div>
</template>

<script>
  import {Group, XInput, Cell, PopupRadio, Datetime, XAddress, XTextarea, ChinaAddressV4Data, XButton, PopupPicker} from 'vux';

  export default {
    name: 'coach-join',
    components: {
      XTextarea,
      Group,
      XInput,
      Cell,
      PopupRadio,
      Datetime,
      XAddress,
      XButton,
      PopupPicker,
    },
    data(){
      return {
        gender: [['男', '女']],
        grade: [['一级', '二级', '三级']],
        addressList: ChinaAddressV4Data,
        coach: {
          name: '',
          gender: [],
          birthday: '',
          tall: '',
          address: [],
          phone: '',
          wechat: '',
          grade: [],
          position: '',
          company: '',
        },
      };
    },
  }
</script>

<style lang="less" scoped>
  #coachJoin{
    padding-bottom: 50px;
  }
  .coach-img{
    text-align: center;

    img{
      width: 100px;
      height: 100px;
    }
  }
</style>
