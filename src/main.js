import Vue from 'vue'
import  { AlertPlugin, LoadingPlugin, ToastPlugin, ConfirmPlugin} from 'vux';
import {router} from '@/router';
import App from './App';
import {ApiService} from "./api/Api.class";
import {Pipes} from '@/pipes/pipes';
import {WxUtil} from '@/utils/wx-util';
// px转rem
import 'lib-flexible';

Vue.config.productionTip = false;
Vue.prototype.$api = new ApiService();

// 注册vux中的全局组件
Vue.use(AlertPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin, {position: 'middle', type: 'text'});
Vue.use(ConfirmPlugin);

// 注册全局过滤器
for(let k in Pipes){
  Vue.filter(`${k}`, Pipes[k]);
}

// 生产环境启动此方法
WxUtil.getCodeFromUrl(() => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app-box');
});

// 开发环境渲染模式
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app-box');
