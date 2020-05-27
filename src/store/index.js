import Vue from "vue";
import Vuex from "vuex";
import food from "./modules/food"
import recipe from "./modules/recipe"
import calorieCalculator from "./modules/calorieCalculator"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { food, recipe, calorieCalculator }
});
