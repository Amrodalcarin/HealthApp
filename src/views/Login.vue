<template >
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Inicio de sesión</v-toolbar-title>
            <v-spacer />
            <v-btn color="secondary" :to="{ path: 'register/'}">Registrarse</v-btn>
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
    password: ""
  }),
  methods: {
    login() {
      fb.auth
        .signInWithEmailAndPassword(this.email, this.password)
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
