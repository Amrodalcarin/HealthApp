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
import GoTrue from "gotrue-js";

export default {
  props: {
    source: String
  },
  data: () => ({
    email: "",
    password: "",
    auth: new GoTrue({
      APIUrl: "https://nutricare.online/.netlify/identity",
      audience: "",
      setCookie: false
    })
  }),
  methods: {
    register() {
      this.auth
        .signup(this.email, this.password)
        .then(() => {
          this.$router.push({
            name: "Messages",
            params: {
              message:
                "An email has been sent to " +
                this.email +
                ". Please click on the link we sent to you to confirm your account."
            }
          });
        })
        .catch(error => console.log("It's an error", error));
    }
  }
};
</script>