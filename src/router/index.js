import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login";
import Home from "@/views/home";

Vue.use(VueRouter);

// 1.定义一些路由
// 每个路由都需要映射到一个组件。
const routes = [
  {
    path: "/",
    // 路由重定向
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
  },
];

// 2.创建路由实例并传递 `routes` 配置
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  const token = window.sessionStorage.getItem("token");
  if (!token) return next("/login");
  next();
});
export default router;
