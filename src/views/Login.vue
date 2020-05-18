<template >
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Inicio de sesión</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                name="login"
                prepend-icon="fa-envelope"
                type="text"
                v-model="email"
                @keypress.enter="login()"
              />

              <v-text-field
                id="password"
                label="Contraseña"
                name="password"
                prepend-icon="fa-lock"
                type="password"
                v-model="password"
                @keypress.enter="login()"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="login()">Entrar</v-btn>
            <v-btn color="secondary" :to="{ path: 'register/'}">Registrarse</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GoTrue from "gotrue-js";

export default {
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
    login() {
      this.auth
        .login(this.email, this.password)
        .then(response => {
          localStorage.setItem("userLoggedIn", true);
          localStorage.setItem("userData", JSON.stringify(response));
          this.$router.push({
            name: "Home"
          });
        })
        .catch(error => console.log("It's an error", error));
    }
  },
  props: ["confirmToken"],
  created() {
    if (this.confirmToken) {
      this.auth
        .confirm(this.confirmToken)
        .then(() => {
          this.$router.push({
            name: "Messages",
            params: {
              message: "Account confirmed successfully. Now you can log in.",
              redirectLogin: true
            }
          });
        })
        .catch(error => {
          this.$router.push({
            name: "Messages",
            params: { message: "Error: " + error }
          });
        });
    }
    // this.logUser(this.email, this.password).then(() => (logSuccess = true));
  }
};
</script>
