<template>
  <v-container fluid grid-list-md fill-height>
    <CircularLoad v-if="loading" />
    <v-layout row wrap>
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
              <v-card-text>Aquí iran etiquetas del alimento</v-card-text>
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
            <v-card-title>Recetas para este alimento</v-card-title>Aqui recetas y tal
            <!-- <ul v-for="(each, n) in nutrientsResponse.totalNutrients" :key="n">
              <li>{{nutrientsResponse.totalNutrients[n].label}}: {{nutrientsResponse.totalNutrients[n].quantity.toFixed(2)}} {{nutrientsResponse.totalNutrients[n].unit}}</li>
            </ul>-->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
      this.loading = true;
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