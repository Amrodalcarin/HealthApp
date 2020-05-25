<template>
  <v-layout row wrap justify-space-around class="mb-4">
    <v-flex d-flex xs12 sm12 md2>
      <v-col align="center">
        <v-progress-circular
          :rotate="-90"
          :size="130"
          :width="20"
          :value="parseInt(consumedDayCalories)"
          color="primary"
        >{{((parseFloat(consumedDayCalories) * parseFloat(totalDayCalories)) / 100).toFixed(0)}} Kcal</v-progress-circular>
        <v-card-text class="font-weight-bold">Target: {{ parseInt(totalDayCalories) }} Kcal</v-card-text>
      </v-col>
    </v-flex>
    <v-flex d-flex xs12 sm12 md4>
      <v-text-field type="number" v-model="newAddCalories" label="Calories"></v-text-field>
    </v-flex>
    <v-flex d-flex xs12 sm12 md2>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md12>
          <v-btn
            color="primary"
            :loading="loading"
            @click="setConsumedCalories('add')"
            min-width="100%"
          >
            Add calories
            <v-icon right>fa-plus</v-icon>
          </v-btn>
        </v-flex>
        <v-flex d-flex xs12 sm12 md12>
          <v-btn
            color="primary"
            :loading="loading"
            @click="setConsumedCalories('substract')"
            min-width="100%"
          >
            Sub calories
            <v-icon right>fa-minus</v-icon>
          </v-btn>
        </v-flex>
        <v-flex d-flex xs12 sm12 md12>
          <v-btn
            color="primary"
            :loading="loading"
            @click="setConsumedCalories('reset')"
            min-width="100%"
          >
            Res calories
            <v-icon right>fa-redo</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    consumedDayCalories: localStorage.getItem("caloriesSetted")
      ? localStorage.getItem("consumedDayCalories")
      : 0,
    totalDayCalories: localStorage.getItem("caloriesSetted")
      ? localStorage.getItem("totalDayCalories")
      : 0,
    newAddCalories: 0
  }),
  methods: {
    setConsumedCalories(operation) {
      if (operation === "reset") {
        localStorage.setItem("consumedDayCalories", 0);
      } else if (operation === "add") {
        const actualConsumedCalories = localStorage.getItem(
          "consumedDayCalories"
        );
        const newConsumedCaloriesPercentaje =
          (this.newAddCalories * 100) /
          parseInt(localStorage.getItem("totalDayCalories"));
        localStorage.setItem(
          "consumedDayCalories",
          parseFloat(actualConsumedCalories) + newConsumedCaloriesPercentaje
        );
      } else if (operation === "substract") {
        const actualConsumedCalories = localStorage.getItem(
          "consumedDayCalories"
        );
        const newConsumedCaloriesPercentaje =
          (this.newAddCalories * 100) /
          parseInt(localStorage.getItem("totalDayCalories"));
        localStorage.setItem(
          "consumedDayCalories",
          parseFloat(actualConsumedCalories) - newConsumedCaloriesPercentaje
        );
      }

      this.newAddCalories = 0;
      this.setCalories();
    },
    setCalories() {
      if (localStorage.getItem("caloriesSetted")) {
        this.consumedDayCalories = localStorage.getItem("consumedDayCalories");
        this.totalDayCalories = localStorage.getItem("totalDayCalories");
      }
    }
  }
};
</script>