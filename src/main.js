import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
// 导入全局样式表
import "@/assets/css/global.less";
// 按需引入ElementUI组件
import "@/plugins/element";
//导入iconfont字体图标
import "@/assets/font/iconfont.css";
// 引入mock模拟数据
import "../mock/mock_server";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
