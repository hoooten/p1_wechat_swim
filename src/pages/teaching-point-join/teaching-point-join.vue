<template>
  <div id="coachJoin">
    <group title="必填项" label-width="4.5em" label-margin-right="1.5em" label-align="justify">
      <x-input title="场所名称" v-model="point.name" placeholder="必填"></x-input>
      <cell primary="content" title="场所位置">
        <div class="">
          <div>
            <div>浮潜：</div>
            <div>
              <label>
                <input type="checkbox" name="sea">海
              </label>
              <label>
                <input type="checkbox" name="river">河
              </label>
              <label>
                <input type="checkbox" name="jiang">江
              </label>
              <label>
                <input type="checkbox" name="lake">湖
              </label>
            </div>
          </div>
          <div>
            <div>游泳：</div>
            <div>
              <label>
                <input type="checkbox" name="inner">室内游泳池
              </label>
              <label>
                <input type="checkbox" name="outer">露天游泳池
              </label>
            </div>
          </div>
        </div>
      </cell>
      <!--<popup-picker title="性别" :data="gender" v-model="coach.gender" placeholder="请选择性别" value-text-align="left"></popup-picker>-->
      <!--<x-input title="手机" type="tel" v-model="coach.phone" placeholder="必填"></x-input>-->
      <!--<x-input title="微信" v-model="coach.wechat" placeholder="选填"></x-input>-->
      <!--<x-address title="地址" :list="addressList" v-model="coach.address" placeholder="请选择地址"></x-address>-->
    </group>

    <group title="选填项" label-width="4.5em" label-margin-right="1.5em" label-align="justify">
      <!--<popup-picker title="证书等级" :data="grade" v-model="coach.grade" value-text-align="left" placeholder="请选择证书等级"></popup-picker>-->
      <!--<x-input title="职位" v-model="coach.position" placeholder="选填"></x-input>-->
      <!--<x-input title="公司名称" v-model="coach.company" placeholder="选填"></x-input>-->
      <!--<x-textarea title="个人简介" :height="50" placeholder="选填"></x-textarea>-->
      <!--<datetime title="出生年月" format="YYYY-MM" v-model="coach.birthday" value-text-align="left"></datetime>-->
      <!--<x-input title="身高" type="number" v-model="coach.tall" placeholder="必填"></x-input>-->
    </group>

    <div class="padding-15">
      <x-button :gradients="['#1D62F0', '#19D5FD']">加盟</x-button>
    </div>
  </div>
</template>

<script>
  import {Group, XInput, Cell, PopupRadio, Datetime, XAddress, XTextarea, ChinaAddressV4Data, XButton, PopupPicker} from 'vux';

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
      PopupPicker,
    },
    data(){
      return {
        gender: [['男', '女']],
        grade: [['一级', '二级', '三级']],
        addressList: ChinaAddressV4Data,
        point: {
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
