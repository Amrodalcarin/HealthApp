<template>
  <v-container fluid grid-list-md fill-height>
    <CircularLoad v-if="loading" />
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm12 md12>
            <v-card min-width="100%" class="d-flex flex-column justify-space-around">
              <v-card-text>
                <v-card-title class="display-1">{{recipeResponse.label.toUpperCase()}}</v-card-title>
                <v-img :src="recipeResponse.image" max-height="300" contain class="backgroundImg">
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
                  <v-flex d-flex v-for="(each, n) in recipeResponse.healthLabels" :key="n">
                    <v-chip class="py-6 px-4" color="secondary" label>
                      {{recipeResponse.healthLabels[n].replace(/_/g, " ")}}
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
            <v-card-title>Ingredients</v-card-title>

            <ul v-for="(each, n) in recipeResponse.ingredientLines" :key="n">
              <li>{{recipeResponse.ingredientLines[n]}}</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm3 md4>
        <v-card min-width="100%" class="d-flex flex-column justify-space-around">
          <v-card-text>
            <v-card-title>Nutrients</v-card-title>

            <ul v-for="(each, n) in recipeResponse.totalNutrients" :key="n">
              <li>{{recipeResponse.totalNutrients[n].label}}: {{recipeResponse.totalNutrients[n].quantity.toFixed(2)}} {{recipeResponse.totalNutrients[n].unit}}</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import CircularLoad from "./../components/CircularLoad";
import { mapGetters } from "vuex";

const edamam = require("../../edamamConfig");

export default {
  components: {
    CircularLoad
  },
  data: () => ({
    recipeResponse: [],
    loading: false
  }),
  mounted() {
    this.getRecipe(this.recipeID.replace("#", "%23"));
  },
  methods: {
    getRecipe(val) {
      this.loading = true;
      axios
        .get(
          "https://api.edamam.com/search?&app_id=" +
            edamam.app_idRecipe +
            "&app_key=" +
            edamam.api_keyRecipe +
            "&r=" +
            val,
          { crossdomain: true }
        )
        .then(response => (this.recipeResponse = response.data[0]))
        .then(() => (this.loading = false))
        .catch(error => console.log(error));
    }
  },
  computed: mapGetters(["recipeID"])
};
</script>

<style scoped>
.backgroundImg {
  background: grey;
}
</style>