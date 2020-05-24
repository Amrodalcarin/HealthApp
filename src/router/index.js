import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import Food from "../views/Food.vue";
import FoodGrid from "../views/FoodGrid.vue";
import Messages from "../views/Messages.vue";
const fb = require("../../firebaseConfig");

Vue.use(VueRouter);

const routes = [
  {
    path: "/messages",
    name: "Messages",
    component: Messages,
    props: true
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    props: true
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true
  },
  {
    path: "/user",
    name: "Profile",
    component: Profile
  },
  {
    path: "/food/:foodId",
    name: "Food",
    component: Food,
    props: true
  },
  {
    path: "/searchfood",
    name: "SearchFood",
    component: FoodGrid
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {

  if (to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Messages' && !fb.auth.currentUser) next({ name: 'Login' })
  else next()


})

export default router;
