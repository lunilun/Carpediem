import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Detail from "../views/Detail.vue"
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      title:"Carpe diem",
    }
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail,
    meta:{
      title:"Carpe diem - Memo",
    },
    beforeEnter: (to, from, next) => {
      if(store.state.cate != "") return next();
      alert("잘못된 접근입니다.");
      return next('/');
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title;
  });
});

export default router;
