<template>
  <v-container
    class="d-flex flex-column justify-center align-center fill-height py-4"
  >
    <v-card
      outlined
      elevation="2"
      class="d-flex flex-column text-center black--text"
    >
      <v-card-title class="d-flex justify-center">
        <h3>Se connecter</h3>
      </v-card-title>

      <v-card-text class="py-0">
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="username"
            name="username"
            label="Nom d'utilisateur"
            prepend-icon="mdi-account-circle"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Mot de passe"
            name="password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
          ></v-text-field>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              type="submit"
              name="button"
              class="info white--text"
              elevation="3"
              >Se connecter</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>

      <v-divider dark></v-divider>

      <div class="pa-2"
        >Vous ne possédez pas encore de compte?
        <router-link to="/signup">Créez-en un.</router-link>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      status: null,
      showPassword: false,
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "Dashboard" })
        })
        .catch((error) => {
          this.status = error.response.status
          console.error(error.response)
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
