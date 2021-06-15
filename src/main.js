<<<<<<< HEAD
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");
=======
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import axios from "axios"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created() {
    const userString = localStorage.getItem("user")
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit("SET_USER_DATA", userData)
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch("logout")
        }
        return Promise.reject(error)
      }
    )
  },
  render: (h) => h(App),
}).$mount("#app")
>>>>>>> feat/API
