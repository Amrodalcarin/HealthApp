<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="foodPhoto?foodPhoto:logoNutricare"
      gradient="to bottom left, rgba(100,115,201,.33), rgba(25,32,72,.7)"
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
      <v-btn color="green" text>Share</v-btn>

      <v-btn color="green" text :to="{ path: 'food/'+foodId}">Explore</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
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
  ]
};
</script>