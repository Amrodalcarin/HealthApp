<template>
  <v-list-item two-line :class="miniVariant">
    <v-list-item-avatar>
      <img :src="avatar" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{username}}</v-list-item-title>
      <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<style scoped>
.v-list-item {
  padding: 0 8px;
}
</style>

<script>
const fb = require("../../firebaseConfig");

export default {
  name: "UserCard",
  data: () => ({
    miniVariant: true,
    username: fb.auth.currentUser.displayName,
    email: fb.auth.currentUser.email,
    avatar: fb.auth.currentUser.photoURL
  })
};
</script>