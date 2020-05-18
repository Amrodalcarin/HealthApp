import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Food from "../views/Food.vue";
import FoodGrid from "../views/FoodGrid.vue";
import Messages from "../views/Messages.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true
  },
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
  let hash = window.location.hash.substr(1);
  let result = hash.split("&").reduce(function (result, item) {
    let parts = item.split("=");
    result[parts[0]] = parts[1];
    return result;
  }, {});
  if (result.confirmation_token && to.name !== 'Login') {
    router.push({
      name: "Login",
      params: { confirmToken: result.confirmation_token }
    });
  }
  else {
    if (to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Messages' && !localStorage.getItem('userLoggedIn')) next({ name: 'Login' })
    else next()
  }

})

export default router;
