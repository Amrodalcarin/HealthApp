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
  })
};
</script>