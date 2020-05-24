<template >
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Sign up</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field label="Username" name="username" type="text" v-model="username" />
              <v-text-field label="Email" name="email" type="text" v-model="email" />

              <v-text-field
                id="password"
                label="Password"
                name="password"
                type="password"
                v-model="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn v-on:click="register()">Send</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const fb = require("../../firebaseConfig");

export default {
  data: () => ({
    email: "",
    password: "",
    username: ""
  }),
  methods: {
    register() {
      fb.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.fillUser();
        })
        .catch(err => {
          console.log(err);
        });
    },
    fillUser() {
      const user = fb.auth.currentUser;
      user
        .updateProfile({
          displayName: this.username
        })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>