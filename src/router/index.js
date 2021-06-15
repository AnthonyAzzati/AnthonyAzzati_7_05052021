<<<<<<< HEAD
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
=======
import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)
>>>>>>> feat/API

const routes = [
  {
    path: "/",
    name: "Home",
<<<<<<< HEAD
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
=======
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
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
  mode: "history",
  base: process.env.BASE_URL,
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
>>>>>>> feat/API
