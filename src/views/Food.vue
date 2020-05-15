<template>
  <v-app>
    <CircularLoad v-if="loading" />
    <v-row justify="center">
      <v-card elevation="10">
        <v-img
          :src="foodResponse.hints[0].food.image"
          max-height="300"
          contain
          class="backgroundImg"
        >
          <!-- <v-progress-circular :size="70" :width="7" color="green" indeterminate></v-progress-circular> -->
        </v-img>
      </v-card>
      <v-card>
        <div class="title">{{foodResponse.hints[0].food.label}}</div>
        <v-divider />
        <div class="sub-title">Nutrients</div>

        <ul v-for="(each, n) in nutrientsResponse.totalNutrients" :key="n">
          <li>{{nutrientsResponse.totalNutrients[n].label}}: {{nutrientsResponse.totalNutrients[n].quantity.toFixed(2)}} {{nutrientsResponse.totalNutrients[n].unit}}</li>
        </ul>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>
import axios from "axios";
import CircularLoad from "./../components/CircularLoad";

export default {
  components: {
    CircularLoad
  },
  data: () => ({
    foodResponse: [],
    nutrientsResponse: {},
    loading: false
  }),
  mounted() {
    this.getFood(this.foodId);
    this.getNutrients(this.foodId);
  },
  methods: {
    getNutrients(val) {
      this.loading = true;
      axios
        .post(
          "https://api.edamam.com/api/food-database/nutrients?app_id=2642ad12&app_key=320f1c564ed52ec564d56995ef7089b2",
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
      axios
        .get(
          "https://api.edamam.com/api/food-database/parser?ingr=" +
            val +
            "&app_id=2642ad12&app_key=320f1c564ed52ec564d56995ef7089b2",
          { crossdomain: true }
        )
        .then(response => (this.foodResponse = response.data))
        .catch(error => console.log(error));
    }
  },
  props: ["foodId"]
};
</script>

<style scoped>
.backgroundImg {
  background: grey;
}
</style>