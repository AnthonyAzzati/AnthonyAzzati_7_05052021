import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    posts: null,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      localStorage.setItem("user", JSON.stringify(userData))
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`
      state.user = userData
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user")
      location.reload()
    },
  },
  actions: {
    signup({ commit }, credentials) {
      return axios
        .post("//localhost:3000/api/user/signup", credentials)
        .then(({ data }) => {
          console.log(data)
          commit("SET_USER_DATA", data)
        })
    },
    login({ commit }, credentials) {
      return axios
        .post("//localhost:3000/api/user/login", credentials)
        .then(({ data }) => {
          console.log(data)
          commit("SET_USER_DATA", data)
        })
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA")
    },
  },
  getters: {
    loggedIn(state) {
      return !!state.user
    },
  },
  modules: {},
})
