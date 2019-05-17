import wx from 'weixin-js-sdk';
import {Utils} from "./utils";
import Vue from 'vue';

const $vue = new Vue();

export const WxUtil = {
  _init(){
    const currentUrl = encodeURIComponent(window.location.href);

    return new Promise((resolve, reject) => {
      $vue.$api.getWechatConfig({Url: currentUrl})
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
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'getLocation'],
            });

            wx.ready(function () {
              resolve(config);
            });
            wx.error(function (err) {
              reject(err);
            });
          }
        });
    });
  },

  /** 获取用户当前位置 */
  getUserLocation(callback){
    WxUtil._init().then(() => {
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (resp) {
          const lat = resp.latitude;
          const lon = resp.longitude;

          typeof callback === 'function' && callback({lat, lon});
        },
        cancel: function () {
          typeof callback === 'function' && callback(false);
        },
      });
    }).catch(err => {
      Vue.$vux.alert.show({
        content: JSON.stringify(err),
      });
      Vue.$vux.loading.hide();
    });
  },

  /** 微信授权获取用户code */
  wxAuth(callback){
    WxUtil._init().then(resp => {
      const encodeUrl = encodeURIComponent(window.location.href);
      const AUTH_UTL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${resp.appId}&redirect_uri=${encodeUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;

      window.location.href = AUTH_UTL;
    });
  },

  /** 微信登录 */
  getCodeFromUrl(callback = function(){}){
    const code = Utils.getUserCode();
    const userId = window.localStorage.getItem('user_id');

    // 存在userId，证明用户已授权登录过公众号
    if(userId){
      Vue.$vux.loading.show('载入中…');
      $vue.$api.getUserToken({UserId: userId})
        .then(resp => {
          if(resp.success){
            window.localStorage.setItem('token', resp.result.accessToken);
            callback();
          }
          Vue.$vux.loading.hide();
        });
    }else{
      if(code){
        const params ={
          authProvider: 'Wechat',
          providerAccessCode: code,
        };

        Vue.$vux.loading.show('载入中…');
        $vue.$api.loginWithWechat(params)
          .then(resp => {
            if(resp.success){
              window.localStorage.setItem('token', resp.result.accessToken);
              window.localStorage.setItem('user_id', resp.result.userId);
            }
            callback();
            Vue.$vux.loading.hide();
          });
      }else{
        WxUtil.wxAuth();
      }
    }
  },

  /** 微信分享 */
  wxShare(options, callback){
    const mTitle = options.title || '皓思派--游泳|潜浮';
    const mDesc = options.desc || '皓思派潜伏欢迎您的加入！';
    const mLink = window.location.href;
    const mImgUrl = options.imgUrl || 'http://m.tuniucdn.com/fb2/t1/G4/M00/AF/9C/Cii_J1xRUGaII7WCAAOoAmngE7EAADokgNXLDYAA6ga361_w450_h300_c1_t0.jpg';

    WxUtil._init().then(() => {
      // 分享给朋友
      wx.onMenuShareAppMessage({
        title: mTitle, // 分享标题
        desc: mDesc,   // 分享描述
        link: mLink,   // 分享链接
        imgUrl: mImgUrl, // 分享图标
        success: function () {
          callback && callback();
        },
      });

      // 分享朋友圈
      wx.onMenuShareTimeline({
        title: mTitle, // 分享标题
        desc: mDesc,   // 分享描述
        link: mLink,   // 分享链接
        imgUrl: mImgUrl, // 分享图标
        success: function () {
          callback && callback();
        },
      });

      // 分享到QQ
      wx.onMenuShareQQ({
        title: mTitle, // 分享标题
        desc: mDesc,   // 分享描述
        link: mLink,   // 分享链接
        imgUrl: mImgUrl, // 分享图标
        success: function () {
          callback && callback();
        },
      });

      // 分享到空间
      wx.onMenuShareQZone({
        title: mTitle, // 分享标题
        desc: mDesc,   // 分享描述
        link: mLink,   // 分享链接
        imgUrl: mImgUrl, // 分享图标
        success: function () {
          callback && callback();
        },
      });

      // 分享到微博
      wx.onMenuShareWeibo({
        title: mTitle, // 分享标题
        desc: mDesc,   // 分享描述
        link: mLink,   // 分享链接
        imgUrl: mImgUrl, // 分享图标
        success: function () {
          callback && callback();
        },
      });
    }).catch(err => {
      Vue.$vux.alert.show({
        content: JSON.stringify(err),
      });
    });
  },
};
