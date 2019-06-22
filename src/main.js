// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n'
import messages from './common/lang'
import ElementLocale from 'element-ui/lib/locale'

Vue.config.productionTip = false
Vue.use(ElementUI) // UI模块
Vue.use(VueAxios, axios) // 网络请求模块
Vue.use(VueI18n) // 语言切换模块
/* eslint-disable no-new */
Vue.config.productionTip = false
const i18n = new VueI18n({
  locale: 'cn', // 语言标识
  messages
  // messages: {
  //   'zh-CN': require('./common/lang/zh'), // 中文语言包
  //   'en-US': require('./common/lang/en') // 英文语言包
  // }
})
ElementLocale.i18n((key, value) => i18n.t(key, value))
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})

// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/login2') {
//     sessionStorage.removeItem('user');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login2') {
//     next({ path: '/login2' })
//   } else {
//     next()
//   }
// })
