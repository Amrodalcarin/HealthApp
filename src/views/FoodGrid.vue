<template>
  <v-app>
    <v-container class="flex-column align-center">
      <v-text-field
        class="mx-8"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="fa-search"
        solo-inverted
        v-model="searchWord"
        v-on:keydown.enter="searchFood(searchWord)"
      ></v-text-field>
      <v-row justify="center">
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
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import FoodItem from "./../components/FoodItem";
import CircularLoad from "./../components/CircularLoad";

export default {
  components: {
    FoodItem,
    CircularLoad
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
            "&app_id=2642ad12&app_key=320f1c564ed52ec564d56995ef7089b2",
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