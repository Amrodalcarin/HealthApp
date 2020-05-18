<template >
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-container class="title">{{message}}</v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["message", "redirectLogin"],
  created() {
    if (this.redirectLogin) {
      setTimeout(() => {
        this.$router.push({
          name: "Login"
        });
      }, 3500);
    }
  }
};
</script>