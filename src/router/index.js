import Vue from 'vue'
import Router from 'vue-router'
import {Routes} from './routes';
import {WxUtil} from "../utils/wx-util";

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: Routes,
});

/** 路由到下一个页面后执行的钩子 */
router.afterEach((to) => {
  setTimeout(() => {
    // 微信分享
    // WxUtil.wxShare();
  }, 200);
});
