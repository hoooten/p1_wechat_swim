import wx from 'weixin-js-sdk';
import Vue from 'vue';

const $vue = new Vue();

export const WxUtil = {
  _init(){
    Vue.$api.getWechatConfig()
      .then(resp => {
        console.log(resp);
        if(resp.success){

        }
      });
  },

  getUserLocation(){
    $vue.$api.getWechatConfig()
      .then(resp => {
        if(resp.success){
          const config = resp.result;

          wx.config({
            debug: true,
            appId: config.appId,              // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: config.timestamp,      // 必填，生成签名的时间戳
            nonceStr: config.nonceStr,        // 必填，生成签名的随机串
            signature: config.signature,      // 必填，签名，见附录1
            // 必填，需要使用的JS接口列表
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'openLocation'],
          });

          wx.ready(function () {
            wx.openLocation({
              latitude: 0, // 纬度，浮点数，范围为90 ~ -90
              longitude: 0, // 经度，浮点数，范围为180 ~ -180。
              name: '广州', // 位置名
              address: '广州市天河区太古汇', // 地址详情说明
              scale: 1,   // 地图缩放级别,整形值,范围从1~28。默认为最大
              infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            });
          });
        }
      });
  }
};

// 公众号appId
/*
const APP_ID = 'wx9399b67c3c1205d4';

wx.config({
  debug: true,
  appId: APP_ID,             // 必填，企业号的唯一标识，此处填写企业号corpid
  timestamp: 10086,      // 必填，生成签名的时间戳
  nonceStr: '',          // 必填，生成签名的随机串
  signature: '',         // 必填，签名，见附录1
  // 必填，需要使用的JS接口列表
  jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'],
});
*/

/*
export const WxUtil = function (options = {}, callback = new Function()) {


  function getCode(){
    const url = encodeURIComponent(window.location.href);
    const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;

    window.location.href = authUrl;
  }



  openMap(){
    wx.ready(function () {
      wx.openLocation({
        // latitude: 0, // 纬度，浮点数，范围为90 ~ -90
        // longitude: 0, // 经度，浮点数，范围为180 ~ -180。
        name: '广州', // 位置名
        address: '广州市天河区太古汇', // 地址详情说明
        scale: 1,   // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      });
    });
  },

  getLocation(){
    wx.ready(function () {
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude ; // 经度，浮点数，范围为180 ~ -180。
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度

          console.log('location:', res);
        },
        error: function (err) {
          console.log('err:', res);
        },
      });
    });
  },
};
*/
