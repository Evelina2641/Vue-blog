import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "../views/MainPage.vue";
import SinglePost from "../views/SinglePost.vue";
import ParticularUserPosts from "../views/ParticularUserPosts";
import Login from "../views/Login.vue";
import Registration from "../views/Registration";
import UserPage from "../views/UserPage";
import AddPost from "../views/AddPost";
import EditPost from "../views/EditPost";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/post/:user/:id",
    name: "SinglePost",
    component: SinglePost,
  },
  {
    path: "/posts/:user",
    name: "ParticularUserPosts",
    component: ParticularUserPosts,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/user/:user",
    name: "UserPage",
    component: UserPage,
  },
  {
    path: "/:user/add-post",
    name: "AddPost",
    component: AddPost,
  },
  {
    path: "/:user/:id/edit-post",
    name: "EditPost",
    component: EditPost,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
