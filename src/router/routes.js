import CoachQualify from '@/pages/coach-qualify/coach-qualify';
import CoachDetail from '@/pages/coach-detail/coach-detail'
import TeachingNearby from '@/pages/teaching-nearby/teaching-nearby';
// import ProductIntroduce from '@/pages/product/product-introduce';
import JoinIn from '@/pages/join-menu/join-menu';
import CoachJoin from '@/pages/coach-join/coach-join';
import TeachingPointJoin from '@/pages/teaching-point-join/teaching-point-join';
import TeachingPointDetail from '@/pages/teaching-point-detail/teaching-point-detail';
// import JoinHistory from '@/pages/join-history/join-history';
import UserCenter from '@/pages/user-center/user-center';
import PostingHistory from '@/pages/user-center/posting-history';

import CommunityIndex from '@/pages/swim-community/index/community-index';
import Posting from '@/pages/swim-community/posting/posting';
import PostingDetail from '@/pages/swim-community/posting-detail/posting-detail';

// 教点、教练模块路由
const RouteWithCoach = [{
  path: '/',
  redirect: '/index',
}, {
  path: '/index',
  name: 'Index',
  component: TeachingNearby,
  meta: {
    title: '附近教点',                // 导航栏标题
    tabName: 'teach_point_nearby',  // 底部tab的标识符
  }
}, {
  path: '/coach/qualify',
  name: 'CoachQualify',
  component: CoachQualify,
  meta: {
    title: '教练资质',
    tabName: 'coach_qualify',
  }
}, {
  path: '/coach/detail/:id',
  name: 'CoachDetail',
  component: CoachDetail,
  meta: {
    customer: true,   // 自定义head bar
    // title: '教练资质详情',
    // back: true,
  },
}, {
  path: '/join',
  name: 'JoinIn',
  component: JoinIn,
  meta: {
    title: '加盟',
    tabName: 'coach_join',
  },
}, {
  path: '/join/coach',
  name: 'CoachJoin',
  component: CoachJoin,
  meta: {
    title: '教练加盟',
    back: true,             // 回退到上一页
  },
}, {
  path: '/join/point',
  name: 'TeachingPointJoin',
  component: TeachingPointJoin,
  meta: {
    title: '教点加盟',
    back: true,
  },
}, {
  path: '/point/detail/:id',
  name: 'TeachingPointDetail',
  component: TeachingPointDetail,
  meta: {
    title: '教点详情',
    back: true,
  },
},/* {
  path: '/join/history',
  name: 'JoinHistory',
  component: JoinHistory,
  meta: {
    title: '加盟记录',
    tabName: 'join_history',
  },
},*/ {
  path: '/user-center',
  name: 'UserCenter',
  component: UserCenter,
  meta: {
    tabName: 'com_center',
    // title: '个人中心',
    customer: true,
  },
}, {
  path: '/user/posting-history/:id',
  name: 'PostingHistory',
  component: PostingHistory,
  meta: {
    title: '我的发帖',
    urlName: 'UserCenter',
  },
}];

// 社区模块路由
const RouteWithCommunity = [{
  path: '/community/index',
  name: 'CommunityIndex',
  component: CommunityIndex,
  meta: {
    tabName: 'community_index',
    title: '皓思派-潜泳社区',
    module: 'community',        // 所属模块标识符
    urlName: 'Index',          // 点击返回键路由到指定页面
  },
}, {
  path: '/community/posting',
  name: 'Posting',
  component: Posting,
  meta: {
    tabName: 'com_edit',
    title: '发帖',
    module: 'community'
  },
}, {
  path: '/posting/detail/:id',
  name: 'PostingDetail',
  component: PostingDetail,
  meta: {
    title: '皓思派-潜泳社区',
    module: 'community',
    urlName: 'CommunityIndex',
  },
}, /*{
  path: '/community/user-center',
  name: 'UserCenter',
  component: UserCenter,
  meta: {
    tabName: 'com_center',
    title: '个人中心',
    module: 'community'
  },
}, {
  path: '/user/posting-history/:id',
  name: 'PostingHistory',
  component: PostingHistory,
  meta: {
    title: '我的发帖',
    module: 'community',
    urlName: 'UserCenter',
  },
}*/];

export const Routes = [...RouteWithCoach, ...RouteWithCommunity];
