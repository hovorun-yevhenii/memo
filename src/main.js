import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

require("./global-components");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
