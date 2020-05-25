import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
const fb = require('../firebaseConfig')

Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   vuetify,
//   render: h => h(App)
// }).$mount("#app");
let app
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      vuetify,
      render: h => h(App)
    })
  }
})