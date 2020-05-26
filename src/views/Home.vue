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
              label="Search for any food"
              prepend-inner-icon="fa-search"
              solo-inverted
              v-model="searchWord"
              v-on:keydown.enter="searchFood(searchWord)"
            ></v-text-field>
            <v-card-title>The nutrients that appear are always for 100g of the food or the amount that appears in the title</v-card-title>
            <v-row justify="center" height="80%">
              <v-col v-for="(each, n) in foodResponse.hints" :key="n" cols="auto">
                <FoodItem
                  :foodPhoto="foodResponse.hints[n].food.image"
                  :foodName="foodResponse.hints[n].food.label"
                  :foodCal="foodResponse.hints[n].food.nutrients.ENERC_KCAL"
                  :foodProt="foodResponse.hints[n].food.nutrients.PROCNT"
                  :foodFat="foodResponse.hints[n].food.nutrients.FAT"
                  :foodCarb="foodResponse.hints[n].food.nutrients.CHOCDF"
                  :foodFib="foodResponse.hints[n].food.nutrients.FIBTG"
                  :foodId="foodResponse.hints[n].food.foodId"
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
import FoodItem from "./../components/FoodItem";
import CircularLoad from "./../components/CircularLoad";
import CalorieSetter from "./../components/CalorieSetter";
import UserHome from "./../components/UserHome";
const edamam = require("../../edamamConfig");

export default {
  components: {
    FoodItem,
    CircularLoad,
    CalorieSetter,
    UserHome
  },
  data: () => ({
    foodResponse: [],
    searchWord: "",
    loading: false
  }),
  mounted() {},
  methods: {
    searchFood(val) {
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
        .then(() => (this.loading = false))
        .catch(error => console.log(error));
    }
  },
  watch: {}
};
</script>

<style scoped>
.backgroundImg {
  background: grey;
}
</style>