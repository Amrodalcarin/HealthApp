<template>
  <v-container fluid grid-list-md fill-height>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm12 md12>
            <UserEdit />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm6 md8>
        <CaloriesCalculator />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CaloriesCalculator from "../components/CaloriesCalculator";
import UserEdit from "../components/UserEdit";

export default {
  pageTitle: "My Profile",
  components: {
    CaloriesCalculator,
    UserEdit
  }
};
</script>