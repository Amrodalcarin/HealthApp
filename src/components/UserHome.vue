<template>
  <v-card min-width="100%" class="d-flex flex-column justify-space-around">
    <v-card-text class="d-flex flex-column justify-space-around align-center">
      <v-layout row wrap class="mb-8">
        <v-avatar size="96" class="mr-4">
          <img :src="avatar" alt="Avatar" />
        </v-avatar>
      </v-layout>
      <v-label label="Username">{{username}}</v-label>
      <v-label label="Email Address">{{email}}</v-label>
    </v-card-text>
  </v-card>
</template>

<script>
const fb = require("../../firebaseConfig");

export default {
  data: () => ({
    loading: false,
    username: fb.auth.currentUser.displayName,
    email: fb.auth.currentUser.email,
    avatar: fb.auth.currentUser.photoURL
  })
};
</script>