<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-icon
        @click="drawer = !drawer"
        v-if="$route.name !== 'Login' && $route.name !== 'Register' && $route.name !== 'Messages'"
      >fa-bars</v-icon>
      <v-spacer></v-spacer>
      <div class="d-flex align-center" @click="home()">
        <v-img
          alt="NutriCare Logo"
          class="shrink mr-2"
          contain
          :src="logoNutricare"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="NutriCare Name"
          class="shrink mt-1"
          contain
          min-width="100"
          :src="namelogoNutricare"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-switch
        v-model="$vuetify.theme.dark"
        hide-details
        inset
        prepend-icon="fa-moon"
        color="info"
      ></v-switch>
    </v-app-bar>

    <v-content>
      <NavDrawer
        v-if="$route.name !== 'Login' && $route.name !== 'Register' && $route.name !== 'Messages'"
        :drawer="drawer"
      />
      <router-view />
    </v-content>

    <!-- <v-footer app>Nutricare - 2020</v-footer> -->
  </v-app>
</template>

<script>
import NavDrawer from "./views/NavDrawer";

export default {
  name: "App",

  components: {
    NavDrawer
  },
  data: vm => ({
    initialDark: vm.$vuetify ? vm.$vuetify.theme.dark : false,
    logoNutricare: require("@/assets/nutricare_logo.png"),
    namelogoNutricare: require("@/assets/nutricare_namelogo.png"),
    goDark: false,
    drawer: false
  }),
  methods: {
    home() {
      this.$router.push({
        name: "Home"
      });
    }
  },
  beforeDestroy() {
    if (!this.$vuetify) return;

    this.$vuetify.theme.dark = this.initialDark;
  }
};
</script>
