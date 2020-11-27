import Vue from 'vue'
import App from './Home.vue'
import qs from 'qs'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import router from "./router";
import MYLINK from "./data.config";
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$http = axios;
Vue.use(VueRouter);
Vue.prototype.$qs = qs;
Vue.prototype.MYLINK = MYLINK
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
