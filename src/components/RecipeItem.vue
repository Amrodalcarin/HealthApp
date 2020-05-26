<template>
  <v-card class="mx-auto" width="300">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="recipePhoto?recipePhoto:logoNutricare"
      gradient="to bottom left, rgba(183, 235, 209,.10), rgba(47, 133, 90,.40)"
    >
      <v-card-title>{{recipeName}}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">Info</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Calories: {{recipeCal?recipeCal.toFixed(2):0.00}} kcal</div>
      <div>Weight: {{recipeWeight?recipeWeight.toFixed(2):0.00}} g</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="secondary"
        @click="setConsumedCalories(recipeCal?recipeCal.toFixed(2):0.00)"
      >Add to calories</v-btn>

      <v-btn color="primary" @click="goRecipe(recipeId)">View More</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({ logoNutricare: require("@/assets/nutricare_logo.png") }),
  props: ["recipePhoto", "recipeName", "recipeCal", "recipeWeight", "recipeId"],
  methods: {
    ...mapActions(["setRecipeId"]),
    goRecipe(val) {
      this.setRecipeId(val);
      this.$router.push({
        name: "Recipe"
      });
    },
    setConsumedCalories(calories) {
      const actualConsumedCalories = localStorage.getItem(
        "consumedDayCalories"
      );
      const newConsumedCaloriesPercentaje =
        (calories * 100) / parseInt(localStorage.getItem("totalDayCalories"));
      localStorage.setItem(
        "consumedDayCalories",
        parseFloat(actualConsumedCalories) + newConsumedCaloriesPercentaje
      );
    }
  }
};
</script>