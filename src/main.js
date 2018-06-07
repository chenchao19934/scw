import Vue from 'vue';
import Mint from 'mint-ui';
Vue.use(Mint);
import store from '@/store';
import 'amfe-flexible';
import '@/utils/methods.js';
import '@/utils/vTouch.js';
// 微信sdk配置
import '@/utils/wxConfig.js';
import '@/assets/style/reset.css';

// 注册全局过滤器
import * as filters from '@/filters/';
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
// 指令
import '@/directive/';


import router from '@/router';
import App from '@/App';


import vueg from 'vueg';
import 'vueg/css/transition-min.css';

if (localStorage.userId) {
  store.commit('setLoginState', true);
} else {
  store.commit('setLoginState', false);
}
Vue.use(vueg, router, {
  duration: '0.8',
  // forwardAnim: 'fadeInRight',
  // backAnim: 'fadeInLeft',
  forwardAnim: 'fadeIn',
  backAnim: 'none',
  sameDepthDisable: false,
  // tabs: [{
  // 	name: 'home'
  // }, {
  // 	name: 'list'
  // },{
  // 	name: 'cark'
  // }, {
  // 	name: 'my'
  // }],
  tabsDisable: true,
})

// import  Velocity from 'velocity-animate'
router.beforeEach(async (to, from, next) => {
  if (to.path !== from.path) {
    Vue.prototype.$indicator.open('努力加载中...');
    if (!store.state.isLogin) {
      if (to.meta.isLogin) {
        next({
          path: '/login',
          query: {
            fromPath: to.name,
          }
        });
      }
    }
  }
  Vue.prototype.$nextTick(() => {
    next();
    Vue.prototype.$indicator.close();
  });
});

router.afterEach(() => {
  Vue.prototype.$nextTick(() => {
    Vue.prototype.$indicator.close();
  });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: {
    App
  },
});
