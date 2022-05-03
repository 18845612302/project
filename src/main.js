import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import tinymce from 'tinymce';
import VueTinymce from '@packy-tang/vue-tinymce'
Vue.prototype.$tinymce=tinymce;
import *as echarts from 'echarts'
import "echarts-gl"
Vue.prototype.$echarts=echarts
Vue.prototype.$tinymce=tinymce
Vue.use(VueTinymce)
//使用elementUi
Vue.use(ElementUi);
// 消息提示得环境配置(是否报错,是否报全) false 开发环境，vue会提供很多警告 true 生产环境，只有简单警告，反而会增加应用体积

Vue.config.productionTip = false;
import storageUtils from './utils/storageUtils'
import memoryUtiles from './utils/memoryUtils'
const user=storageUtils.getUser();
if(user &&user._id){
  memoryUtiles.user=user
}
console.log(process.env.VUE_APP_BASE_API);
//process.env.NODE_ENV development或者production
import './permission'
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
