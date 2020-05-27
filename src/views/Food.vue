<template>
  <v-container fluid grid-list-md fill-height>
    <CircularLoad v-if="loading" />
    <v-layout row wrap v-if="!loading">
      <v-flex d-flex xs12 sm6 md4>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm12 md12>
            <v-card min-width="100%" class="d-flex flex-column justify-space-around">
              <v-card-text>
                <v-card-title class="display-1">{{foodResponse.hints[0].food.label.toUpperCase()}}</v-card-title>
                <v-img
                  :src="foodResponse.hints[0].food.image"
                  max-height="300"
                  contain
                  class="backgroundImg"
                >
                  <!-- <v-progress-circular :size="70" :width="7" color="green" indeterminate></v-progress-circular> -->
                </v-img>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm12 md12>
            <v-card min-width="100%" class="d-flex flex-column justify-space-around">
              <v-card-text>
                <v-card-title>Healthy labels</v-card-title>
                <v-layout row wrap>
                  <v-flex d-flex v-for="(each, n) in nutrientsResponse.healthLabels" :key="n">
                    <v-chip class="py-6 px-4" color="secondary" label>
                      {{nutrientsResponse.healthLabels[n].replace(/_/g, " ")}}
                      <v-icon right>fa-leaf</v-icon>
                    </v-chip>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm3 md4>
        <v-card min-width="100%" class="d-flex flex-column justify-space-around">
          <v-card-text>
            <v-card-title>Nutrients</v-card-title>

            <ul v-for="(each, n) in nutrientsResponse.totalNutrients" :key="n">
              <li>{{nutrientsResponse.totalNutrients[n].label}}: {{nutrientsResponse.totalNutrients[n].quantity.toFixed(2)}} {{nutrientsResponse.totalNutrients[n].unit}}</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm3 md4>
        <v-card min-width="100%" class="d-flex flex-column justify-space-around">
          <v-card-text>
            <v-card-title>Recommended recipes for this food</v-card-title>
            <v-row justify="center">
              <v-col v-for="(each, n) in recipeResponse.hits" :key="n" cols="auto">
                <RecipeItem
                  :recipePhoto="recipeResponse.hits[n].recipe.image"
                  :recipeName="recipeResponse.hits[n].recipe.label"
                  :recipeCal="recipeResponse.hits[n].recipe.calories"
                  :recipeWeight="recipeResponse.hits[n].recipe.totalWeight"
                  :recipeId="recipeResponse.hits[n].recipe.uri"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import CircularLoad from "./../components/CircularLoad";
import RecipeItem from "./../components/RecipeItem";
import { mapGetters } from "vuex";

const edamam = require("../../edamamConfig");

export default {
  components: {
    CircularLoad,
    RecipeItem
  },
  data: () => ({
    foodResponse: [],
    nutrientsResponse: {},
    recipeResponse: [],
    loading: true
  }),
  mounted() {
    this.getFood(this.foodID);
    this.getNutrients(this.foodID);
    this.searchRecipe(this.foodName);
  },
  methods: {
    getNutrients(val) {
      axios
        .post(
          "https://api.edamam.com/api/food-database/nutrients?app_id=" +
            edamam.app_idFood +
            "&app_key=" +
            edamam.api_keyFood,
          {
            ingredients: [
              {
                quantity: 1,
                measureURI:
                  "http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram",
                foodId: val
              }
            ]
          }
        )
        .then(response => (this.nutrientsResponse = response.data))
        .then(() => (this.loading = false))
        .catch(error => console.log(error));
    },
    getFood(val) {
      this.loading = true;
      axios
        .get(
          "https://api.edamam.com/api/food-database/parser?ingr=" +
            val +
            "&app_id=" +
            edamam.app_idFood +
            "&app_key=" +
            edamam.api_keyFood,
          { crossdomain: true }
        )
        .then(response => (this.foodResponse = response.data))
        .catch(error => console.log(error));
    },
    searchRecipe(val) {
      this.loading = true;
      axios
        .get(
          "https://api.edamam.com/search?q=" +
            val +
            "&app_id=" +
            edamam.app_idRecipe +
            "&app_key=" +
            edamam.api_keyRecipe +
            "&from=0&to=2",
          { crossdomain: true }
        )
        .then(response => (this.recipeResponse = response.data))
        .then(() => (this.loading = false))
        .catch(error => console.log(error));
    }
  },
  computed: {
    ...mapGetters(["foodID", "foodName"])
  }
};
</script>

<style scoped>
.backgroundImg {
  background: grey;
}
</style>