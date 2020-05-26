<template>
  <v-container fluid grid-list-md fill-height class="overflow-y-auto">
    <v-layout row wrap>
      <v-flex d-flex xs12 sm12 md12 height="10px">
        <v-layout row wrap>
          <v-flex d-flex xs12 sm4 md2>
            <UserHome />
          </v-flex>
          <v-flex d-flex xs12 sm8 md10>
            <v-card min-width="100%" class="d-flex flex-column justify-space-around">
              <v-card-text>
                <CalorieSetter />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm12 md12>
        <v-card min-width="100%" class="d-flex flex-column justify-space-around">
          <v-card-text>
            <v-text-field
              class="mx-8"
              flat
              hide-details
              label="Search"
              prepend-inner-icon="fa-search"
              solo-inverted
              v-model="searchWord"
              v-on:keydown.enter="searchRecipe(searchWord)"
            ></v-text-field>
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
            <CircularLoad v-if="loading" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import RecipeItem from "./../components/RecipeItem";
import CircularLoad from "./../components/CircularLoad";
import CalorieSetter from "./../components/CalorieSetter";
import UserHome from "./../components/UserHome";

const edamam = require("../../edamamConfig");

export default {
  components: {
    RecipeItem,
    CircularLoad,
    CalorieSetter,
    UserHome
  },
  data: () => ({
    recipeResponse: [],
    searchWord: "",
    loading: false
  }),
  mounted() {},
  methods: {
    searchRecipe(val) {
      this.loading = true;
      axios
        .get(
          "https://api.edamam.com/search?q=" +
            val +
            "&app_id=" +
            edamam.app_idRecipe +
            "&app_key=" +
            edamam.api_keyRecipe,
          { crossdomain: true }
        )
        .then(response => (this.recipeResponse = response.data))
        .then(() => (this.loading = false))
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>
.backgroundImg {
  background: grey;
}
</style>