<template>
  <v-layout row wrap justify-space-around class="mb-4">
    <v-flex d-flex xs12 sm12 md12>
      <v-col align="center">
        <v-progress-circular
          :rotate="-90"
          :size="130"
          :width="20"
          :value="parseInt(consumedDayCalories)"
          color="primary"
          :key="progressComponentKey"
        >{{((parseFloat(consumedDayCalories) * parseFloat(totalDayCalories)) / 100).toFixed(0)}} Kcal</v-progress-circular>
        <v-card-text class="font-weight-bold">Target: {{ parseInt(totalDayCalories) }} Kcal</v-card-text>
      </v-col>
    </v-flex>
    <v-flex d-flex xs12 sm12 md12>
      <v-text-field type="number" v-model="newAddCalories" label="Calories"></v-text-field>
    </v-flex>
    <v-flex d-flex xs12 sm12 md12>
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
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    loading: false,
    newAddCalories: 0,
    progressComponentKey: 0,
    totalDayCalories: localStorage.getItem("caloriesSetted")
      ? localStorage.getItem("totalDayCalories")
      : 0
  }),
  methods: {
    ...mapActions(["setCalories"]),
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
      this.setCalories(localStorage.getItem("consumedDayCalories"));
    }
  },
  computed: {
    ...mapGetters(["consumedDayCalories"])
  }
};
</script>