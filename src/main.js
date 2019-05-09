import Vue from "vue/types"
import App from "./App"
import router from "./router/router"
import store from "./store/store"
import Vuex from "vuex/types"

import "normalize.css"
import "./style/index.scss" // global css
import global from "@/util/global"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "assets/icons/iconfont.css"
import axios from "axios"

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

// 全局baseUrl
Vue.prototype.GLOBAL = global
Vue.prototype.Message = ElementUI.Message // 弹框插件

axios.defaults.baseURL = global.BASE_URL
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
