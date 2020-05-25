<template>
  <v-card min-width="100%" class="d-flex flex-column justify-space-around">
    <v-card-text>
      <v-card-title>Daily calorie calculator</v-card-title>
      <CalorieSetter />
      <v-select :items="genderItems" filled v-model="gender" label="Gender"></v-select>
      <v-text-field type="number" v-model="weight" label="Weight (Kg)"></v-text-field>
      <v-text-field type="number" v-model="height" label="Height (Cm)"></v-text-field>
      <v-text-field type="number" v-model="age" label="Age"></v-text-field>
      <v-select :items="activtyItems" filled v-model="activity" label="Activity"></v-select>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" :loading="loading" @click="calculateCalories()">
        Calculate
        <v-icon right>fa-calculator</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CalorieSetter from "./CalorieSetter";

export default {
  components: {
    CalorieSetter
  },
  data: () => ({
    loading: false,
    gender: "",
    weight: null,
    height: null,
    age: null,
    activity: null,
    genderItems: ["Man", "Woman", "Other"],
    activtyItems: [
      "Few or no excercise",
      "Light exercise (1 to 3 days a week)",
      "Moderate exercise (3-5 days a week)",
      "Athlete (6 -7 days a week)",
      "Professional Athlete (morning and afternoon training)"
    ],
    activityValues: {
      "Few or no excercise": 1.2,
      "Light exercise (1 to 3 days a week)": 1.375,
      "Moderate exercise (3-5 days a week)": 1.55,
      "Athlete (6 -7 days a week)": 1.72,
      "Professional Athlete (morning and afternoon training)": 1.9
    }
  }),
  methods: {
    calculateCalories() {
      let newDayCaloreis = 0;

      if (this.gender === "Man") {
        newDayCaloreis =
          (66 + 13.7 * this.weight + 5 * this.height - 6.75 * this.age) *
          this.activityValues[this.activity];
      } else if (this.gender === "Woman") {
        newDayCaloreis =
          (655 + 9.6 * this.weight + 1.8 * this.height - 4.7 * this.age) *
          this.activityValues[this.activity];
      } else {
        newDayCaloreis =
          (360.5 + 11.65 * this.weight + 3.4 * this.height - 5.725 * this.age) *
          this.activityValues[this.activity];
      }
      localStorage.setItem("caloriesSetted", true);
      localStorage.setItem("consumedDayCalories", 0);
      localStorage.setItem("totalDayCalories", newDayCaloreis);
    }
  }
};
</script>