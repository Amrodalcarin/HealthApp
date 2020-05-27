<template>
  <v-navigation-drawer v-model="drawer" absolute stateless dark>
    <UserCard />
    <v-divider></v-divider>
    <v-list>
      <v-list-item @click="home()">
        <v-list-item-icon>
          <v-icon>fa-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="profile()">
        <v-list-item-icon>
          <v-icon>fa-user</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="searchRecipe()">
        <v-list-item-icon>
          <v-icon>fa-leaf</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Recipes</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout()">
        <v-list-item-icon>
          <v-icon>fa-sign-out-alt</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import UserCard from "./../components/UserCard";
const fb = require("../../firebaseConfig");

export default {
  components: {
    UserCard
  },
  props: ["drawer"],
  data: () => ({}),
  methods: {
    home() {
      this.$router.push({
        name: "Home"
      });
    },
    profile() {
      this.$router.push({
        name: "Profile"
      });
    },
    searchRecipe() {
      this.$router.push({
        name: "SearchRecipes"
      });
    },
    logout() {
      localStorage.clear();
      fb.auth
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>