<template>
  <v-navigation-drawer
    v-model="drawer"
    :expand-on-hover="expandOnHover"
    :mini-variant="miniVariant"
    :permanent="permanent"
    absolute
    dark
  >
    <UserCard />
    <v-divider></v-divider>
    <v-btn class="my-2" color="secondary" v-on:click="profile()">Profile</v-btn>
    <v-btn class="my-2" color="secondary" v-on:click="logout()">Logout</v-btn>
  </v-navigation-drawer>
</template>

<script>
import UserCard from "./../components/user-card";
export default {
  components: {
    UserCard
  },
  data: () => ({
    expandOnHover: true,
    miniVariant: true,
    drawer: true,
    permanent: true
  }),
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({
        name: "Login"
      });
    }
  }
};
</script>