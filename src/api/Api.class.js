import Vue from 'vue';
import http from './http.js';
import axios from 'axios';

/**
 * API服务类
 */
export class ApiService{
  constructor(){

  }

  /** 获取公众号配置信息 */
  getWechatConfig(params = {}){
    const mUrl = 'http://www.hhaosport.vip:22743/WechatUi/UsingGetJSSDKJson';

    return getWechatConfig(mUrl, params);
  }

  /** 登录 */
  loginDemo(params = {}){
    const mUrl = 'TokenAuth/Authenticate';

    return post(mUrl, params);
  }

  /** 微信登录 */
  loginWithWechat(params = {}){
    const mUrl = 'TokenAuth/WechatAuthenticate1';

    return post(mUrl, params);
  }

  /** 获取用户的token */
  getUserToken(params = {}){
    const mUrl = 'TokenAuth/WechatAuthenticateByUserId';

    return post(mUrl, params);
  }

  /** 获取用户个人中心的数据 */
  getUserInfo(params = {}){
    const mUrl = 'services/app/User/GetUser';

    return get(mUrl, params);
  }

  /** 图片上传 */
  uploadImage(formData = {}){
    return imageUpload(formData);
  }

  /** 下载图片 */
  downloadImage(params = {}){
    return downloadImage(params);
  }

  /** 删除教点场景图片 */
  deleteSceneImage(params = {}, isBind = false){
    const mUrl = 'services/app/SitePhotos/Delete';

    if(isBind){
      return doDelete(mUrl, params);
    }else{
      return deleteImage(params);
    }
  }

  /** 营业执照图片删除 */
  deleteLicenseImage(params = {}){
    const mUrl = 'services/app/TechPoints/DeleteLicensePhoto';

    return doDelete(mUrl, params);
  }

  /** 获取教练列表数据 */
  getCoachList(params = {}){
    const mUrl = 'services/app/Techs/GetAll';

    return get(mUrl, params);
  }

  /** 获取教练详情数据 */
  getCoachDetail(params = {}){
    const mUrl = 'services/app/Techs/GetTechForEdit';

    return get(mUrl, params);
  }

  /** 获取附近教点 */
  getTeachingWithNearby(params = {}){
    const mUrl = 'services/app/TechPoints/GetAll';

    return get(mUrl, params);
  }

  /** 获取教点详情 */
  getPointDetail(params = {}){
    const mUrl = 'services/app/TechPoints/GetTechPointForEdit';

    return get(mUrl, params);
  }

  /** 教点加盟 */
  teachingPointJoin(params = {}){
    const mUrl = 'services/app/TechPoints/CreateOrEdit';

    return post(mUrl, params);
  }

  /** 关联教点实景图片 */
  connectedSitePhotos(params){
    const mUrl = 'services/app/SitePhotos/Create';

    return post(mUrl, params);
  }

  /** 教练加盟 */
  coachJoin(params = {}){
    const mUrl = 'services/app/Techs/CreateOrEdit';

    return post(mUrl, params);
  }

  /** 获取帖子类型 */
  getPostingSections(params = {}){
    const mUrl = 'services/app/CommunitySections/GetAll';

    return get(mUrl, params);
  }

  /** 判断用户是否有加盟记录 */
  checkUserJoinStatus(params = {}){
    const mUrl = 'services/app/User/GetJoinStatus';

    return get(mUrl, params);
  }

  /***** 临时接口：新增帖子类别 *****/
  // addPostingSection(params = {}){
  //   const mUrl = 'services/app/CommunitySections/CreateOrEdit';
  //
  //   return post(mUrl, params);
  // }
  /***** 临时接口-end *****/

  /** 获取社区首页head部分数据 */
  getCommunityHomeData(params = {}){
    const mUrl = 'services/app/CommunityHomes/GetAll';

    return get(mUrl, params);
  }

  /** 获取帖子列表数据 */
  getPosting(params = {}){
    const mUrl = 'services/app/Communities/GetAll';

    return get(mUrl, params);
  }

  /** 新建帖子 */
  createPosting(params = {}){
    const mUrl = 'services/app/Communities/CreateOrEdit';

    return post(mUrl, params);
  }

  /** 图片和帖子关联 */
  connectPhotoForPosting(params = {}){
    const mUrl = 'services/app/TopicPhotos/Create';

    return post(mUrl, params);
  }

  /** 评论帖子 */
  commentPosting(params = {}){
    const mUrl = 'services/app/Comments/CreateOrEdit';

    return post(mUrl, params);
  }

  /** 帖子点赞 */
  supportPosting(params = {}){
    const mUrl = 'services/app/StarHistories/CreateOrEdit';

    return post(mUrl, params);
  }

  /** 取消点赞 */
  cancelSupport(params = {}){
    const mUrl = 'services/app/StarHistories/Delete';

    return doDelete(mUrl, params);
  }

  /** 获取帖子的详情 */
  getPostingDetail(params = {}){
    const mUrl = 'services/app/Communities/GetCommunityForEdit';

    return get(mUrl, params);
  }

  /** 获取某个帖子的评论 */
  getCommentsForPosting(params = {}){
    const mUrl = 'services/app/Comments/GetAll';

    return get(mUrl, params);
  }

  /** 获取某帖子的点赞数据 */
  getSupportsForPosting(params = {}){
    const mUrl = 'services/app/StarHistories/GetAll';

    return get(mUrl, params);
  }

  /** 添加教点特色 */
  addTeachPointFeatures(params = {}){
    const mUrl = 'services/app/TechPointFeatures/CreateOrEdit';

    return post(mUrl, params);
  }

  /** 删除教点特色 */
  deleteFeatureWidthId(params = {}){
    const mUrl = 'services/app/TechPointFeatures/Delete';

    return doDelete(params);
  }

  /** 获取所有教点特色 */
  getAllFeatures(params = {}){
    const mUrl = 'services/app/TechPointFeatures/GetAll';

    return get(mUrl, params);
  }

  /** 教点绑定特色项 */
  bindFeaturesForPoint(params = {}){
    const mUrl = 'services/app/TechPointToFeatures/CreateFeatures';

    return post(mUrl, params);
  }

  /** 收藏教练 */
  collectCoach(params = {}){
    const mUrl = 'services/app/FavoriteTechs/CreateOrEdit';

    return post(mUrl, params);
  }

  /** 取消收藏教练 */
  cancelCollectCoach(params){
    const mUrl = 'services/app/FavoriteTechs/Delete';

    return doDelete(mUrl, params);
  }

  /** 新增收费模式 */
  addTicketMode(params = {}){
    const mUrl = 'services/app/TicketModes/CreateTicketMode';

    return post(mUrl, params);
  }

  /** 删除收费模式 */
  deleteTicketMode(params = {}){
    const mUrl = 'services/app/TicketModes/Delete';

    return doDelete(mUrl, params);
  }

  /** 收藏教点 */
  collectTeachPoint(params = {}){
    const mUrl = 'services/app/FavoriteTechPoints/CreateOrEdit';

    return post(mUrl, params);
  }

  /** 取消收藏教点 */
  cancelCollectPoint(params = {}){
    const mUrl = 'services/app/FavoriteTechPoints/Delete';

    return doDelete(mUrl, params);
  }

  /** 提交教点评分 */
  commitPointComment(params = {}){
    const mUrl = 'services/app/TechpointScores/CreateOrEdit';

    return post(mUrl, params);
  }

  /** 提交教练评分 */
  commitCoachComment(params = {}){
    const mUrl = 'services/app/TechScores/CreateOrEdit';

    return post(mUrl, params);
  }
}

/** post请求 */
function post(mUrl, query) {
  return http.doPost(mUrl, query).then(resolve => {
    const resp = resolve.data;

    if(!resp.success){
      Vue.$vux.alert.show({
        content: JSON.stringify(resp.error),
      });

      return false;
    }

    return resp;
  }).catch(err => {
    Vue.$vux.alert.show({
      content: err.toString(),
    });
    Vue.$vux.loading.hide();
  });
}

/** get请求 */
function get(mUrl, query) {
  return http.doGet(mUrl, query).then(resolve => {
    const resp = resolve.data;

    if(!resp.success){
      Vue.$vux.alert.show({
        content: JSON.stringify(resp.error),
      });

      return false;
    }

    return resp;
  }).catch(err => {
    Vue.$vux.alert.show({
      content: err.toString(),
    });
    Vue.$vux.loading.hide();
  });
}

/** delete请求处理 */
function doDelete(mUrl, query) {
  return http.doDelete(mUrl, query).then(resolve => {
    const resp = resolve.data;

    if(!resp.success){
      Vue.$vux.alert.show({
        content: JSON.stringify(resp.error),
      });

      return false;
    }

    return resp;
  }).catch(err => {
    Vue.$vux.alert.show({
      content: err.toString(),
    });
    Vue.$vux.loading.hide();
  });
}

/** 图片上传 */
function imageUpload(formData) {
  const uploadUrl = 'http://www.hhaosport.vip:22743/File/UploadFiles';
  const head = {
    'Content-Type': 'multipart/form-data',
  };

  return axios.post(uploadUrl, formData, {headers: head}).then(resolve => {
    const resp = resolve.data;

    if(!resp.success){
      Vue.$vux.alert.show({
        content: JSON.stringify(resp.error),
      });

      return false;
    }

    return resp;
  }).catch(err => {
    Vue.$vux.alert.show({
      content: err.toString(),
    });
  });
}

/** 图片下载 */
function downloadImage(params) {
  const downloadUrl = 'http://www.hhaosport.vip:22743/File/DownloadImg';

  return axios.get(downloadUrl, {params: params}).then(resolve => {
    const resp = resolve.data;

    if(!resp.success){
      Vue.$vux.alert.show({
        content: JSON.stringify(resp.error),
      });

      return false;
    }

    return resp;
  }).catch(err => {
    Vue.$vux.alert.show({
      content: err.toString(),
    });
  });
}

/** 删除图片 */
function deleteImage(params) {
  const deleteUrl = 'http://www.hhaosport.vip:22743/File/DeleteFile';
  const head = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
  };

  return axios.delete(deleteUrl, {params: params}).then(resolve => {
    const resp = resolve.data;

    if(!resp.success){
      Vue.$vux.alert.show({
        content: JSON.stringify(resp.error),
      });

      return false;
    }

    return resp;
  }).catch(err => {
    Vue.$vux.alert.show({
      content: err.toString(),
    });
  });
}

/** 获取微信公众号配置信息 */
function getWechatConfig(mUrl, params) {
  return axios.get(mUrl, {params: params}).then(resolve => {
    const resp = resolve.data;

    if(!resp.success){
      Vue.$vux.alert.show({
        content: JSON.stringify(resp.error),
      });

      return false;
    }

    return resp;
  }).catch(err => {
    Vue.$vux.alert.show({
      content: err.toString(),
    });
  });
}
