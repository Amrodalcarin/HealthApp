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
            <v-form ref="form" v-model="valid">
              <v-text-field
                label="Email"
                name="login"
                prepend-icon="fa-envelope"
                type="text"
                v-model="email"
                :rules="[rules.required, rules.emailValid] "
                @keypress.enter="validate"
              />

              <v-text-field
                id="password"
                label="Contraseña"
                name="password"
                prepend-icon="fa-lock"
                type="password"
                v-model="password"
                :rules="[rules.required]"
                @keypress.enter="validate"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="validate">Entrar</v-btn>
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
    rules: {
      required: value => !!value || "Required",
      emailValid: value =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "E-mail must be valid"
    }
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.login();
      }
    },
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
