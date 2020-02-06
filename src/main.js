import Vue from "vue";
import App from "./App";

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import ElementUI from "element-ui";
import "./styles/element-variables.scss";

import "@/styles/index.scss"; // global css

import "./icons"; // icon

import store from "./store";
import router from "./router";

// import "./permission"; // permission control

import "./utils/error-log"; // error log

import * as filters from "./filters"; // 全局实用程序过滤器

Vue.use(ElementUI);

// 注册全局实用程序过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
