import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/NoteList.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/note/:id",
      name: "note",
      component: () => import("../views/TheNote.vue")
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

export default router;
