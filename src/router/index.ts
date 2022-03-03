import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/orderComplete",
    component: () => import("../views/OrderComplete.vue"),
  },
  {
    path: "/orderConfirm",
    component: () => import("../views/OrderConfirm.vue"),
  },
  {
    path: "/cartList",
    component: () => import("../views/CartList.vue"),
  },
  {
    path: "/itemDetail/:isbn",
    component: () => import("../views/ItemDetail.vue"),
  },
  {
    path: "/signin",
    component: () => import("../views/Signin.vue"),
  },
  {
    path: "/signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/",
    component: () => import("../views/Books.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
