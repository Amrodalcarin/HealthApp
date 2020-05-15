<template>
  <v-list-item two-line :class="miniVariant">
    <v-list-item-avatar>
      <img src="https://randomuser.me/api/portraits/men/1.jpg" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>Username</v-list-item-title>
      <v-list-item-subtitle>Subtext</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<style scoped>
.v-list-item {
  padding: 0 8px;
}
</style>

<script>
export default {
  name: "UserCard",
  data: () => ({
    miniVariant: true
  })
};
</script>