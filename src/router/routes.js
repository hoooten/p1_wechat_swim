import CoachQualify from '@/pages/swim-community/coach-qualify';
import ProductIntroduce from '@/pages/product/product-introduce';
import Index from '@/pages/index/index';
import CoachJoin from '@/pages/coach-join/coach-join';
import TeachingPointJoin from '@/pages/teaching-point-join/teaching-point-join';

export const Routes = [{
  path: '/',
  redirect: '/index'
}, {
  path: '/index',
  name: 'Index',
  component: Index,
}, {
  path: '/coach/qualify',
  name: 'CoachQualify',
  component: CoachQualify,
}, {
  path: '/coach/join',
  name: 'CoachJoin',
  component: CoachJoin,
},{
  path: '/point/join',
  name: 'TeachingPointJoin',
  component: TeachingPointJoin,
}, {
  path: '/product/introduce',
  name: 'ProductIntroduce',
  component: ProductIntroduce,
}];
