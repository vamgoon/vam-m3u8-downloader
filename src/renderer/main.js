import Vue from 'vue'

import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

// 原型上注册一个时间总线
Vue.prototype.$eHub = Vue.prototype.$eHub || new Vue()

Vue.use(iView)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
