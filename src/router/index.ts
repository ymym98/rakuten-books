import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/signin",
    component: () => import("../views/Signin.vue"),
  },
  {
    path: "/signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/bookList",
    component: () => import("../views/Books.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
