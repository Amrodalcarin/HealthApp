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
            <v-form ref="form" v-model="valid">
              <v-text-field
                label="Username"
                name="username"
                type="text"
                :rules="[rules.required]"
                v-model="username"
              />
              <v-text-field
                label="Email"
                name="email"
                type="text"
                :rules="[rules.required, rules.emailValid] "
                v-model="email"
              />

              <v-text-field
                id="password"
                label="Password"
                name="password"
                type="password"
                :rules="[rules.required, rules.min]"
                v-model="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn v-on:click="validate">Send</v-btn>
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
    valid: true,
    email: "",
    password: "",
    username: "",
    rules: {
      required: value => !!value || "Required",
      min: value => value.length >= 6 || "Min 6 characters",
      emailValid: value =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "E-mail must be valid"
    }
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.register();
      }
    },
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