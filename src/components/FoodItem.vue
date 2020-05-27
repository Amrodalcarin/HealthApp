<template>
  <v-card class="mx-auto" width="300">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="foodPhoto?foodPhoto:logoNutricare"
      gradient="to bottom left, rgba(183, 235, 209,.10), rgba(47, 133, 90,.40)"
    >
      <v-card-title>{{foodName}}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">Nutrients</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Calories: {{foodCal?foodCal.toFixed(2):0.00}} kcal</div>
      <div>Protein: {{foodProt?foodProt.toFixed(2):0.00}} g</div>
      <div>Fat: {{foodFat?foodFat.toFixed(2):0.00}} g</div>
      <div>Carbs: {{foodCarb?foodCarb.toFixed(2):0.00}} g</div>
      <div>Fiber: {{foodFib?foodFib.toFixed(2):0.00}} g</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="secondary"
        @click="setConsumedCalories(foodCal?foodCal.toFixed(2):0.00)"
      >Add to calories</v-btn>

      <v-btn color="primary" @click="goFood({name: foodName, id: foodId})">View More</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({ logoNutricare: require("@/assets/nutricare_logo.png") }),
  props: [
    "foodPhoto",
    "foodName",
    "foodCal",
    "foodProt",
    "foodFat",
    "foodCarb",
    "foodFib",
    "foodId"
  ],
  methods: {
    ...mapActions(["setFoodId", "setCalories"]),
    goFood(val) {
      this.setFoodId(val);
      this.$router.push({
        name: "Food"
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
      this.setCalories(localStorage.getItem("consumedDayCalories"));
    }
  }
};
</script>