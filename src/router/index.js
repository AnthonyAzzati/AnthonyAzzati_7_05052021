import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/RegisterUser.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginUser.vue"),
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: "history",
  routes,
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user")

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/")
  }
  next()
})

export default router
