import Vue from "vue";
import Vuex from "vuex";
import food from "./modules/food"
import recipe from "./modules/recipe"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { food, recipe }
});
