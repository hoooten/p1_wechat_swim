import CoachQualify from '@/pages/coach-qualify/coach-qualify';
import CoachDetail from '@/pages/coach-detail/coach-detail'
import TeachingNearby from '@/pages/teaching-nearby/teaching-nearby';
import ProductIntroduce from '@/pages/product/product-introduce';
import JoinIn from '@/pages/join-menu/join-menu';
import CoachJoin from '@/pages/coach-join/coach-join';
import TeachingPointJoin from '@/pages/teaching-point-join/teaching-point-join';
import TeachingPointDetail from '@/pages/teaching-point-detail/teaching-point-detail';

import CommunityIndex from '@/pages/swim-community/index/community-index';
import Posting from '@/pages/swim-community/posting/posting';
import PostingDetail from '@/pages/swim-community/posting-detail/posting-detail';
import UserCenter from '@/pages/swim-community/user-center/user-center';
import PostingHistory from '@/pages/swim-community/user-center/posting-history';

// 教点、教练模块路由
const RouteWithCoach = [{
  path: '/',
  redirect: '/index',
}, {
  path: '/index',
  name: 'Index',
  component: TeachingNearby,
  meta: {
    title: '附近教点',
    tabName: 'teach_point_nearby',
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
    title: '教练资质详情',
    urlName: 'CoachQualify',
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
    urlName: 'JoinIn',
  },
}, {
  path: '/join/point',
  name: 'TeachingPointJoin',
  component: TeachingPointJoin,
  meta: {
    title: '教点加盟',
    urlName: 'JoinIn',
  },
}, {
  path: '/point/detail/:id',
  name: 'TeachingPointDetail',
  component: TeachingPointDetail,
  meta: {
    title: '教点详情',
    urlName: 'Index',
  },
}, {
  path: '/product/introduce',
  name: 'ProductIntroduce',
  component: ProductIntroduce,
}];

// 社区模块路由
const RouteWithCommunity = [{
  path: '/community/index',
  name: 'CommunityIndex',
  component: CommunityIndex,
  meta: {
    tabName: 'community_index',
    title: '皓思派-潜泳社区',
    module: 'community',
    urlName: 'JoinIn',
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
}, {
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
}];

export const Routes = [...RouteWithCoach, ...RouteWithCommunity];
