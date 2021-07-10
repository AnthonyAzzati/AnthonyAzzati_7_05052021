<template>
  <!-- ==========   RegisterUser   ========== -->
  <v-container
    class="d-flex flex-column justify-center align-center fill-height py-4"
  >
    <v-card
      outlined
      elevation="2"
      class="d-flex flex-column text-center black--text"
      max-width="350"
    >
      <v-card-title class="d-flex justify-center">
        <h3>S'inscrire</h3>
      </v-card-title>

      <v-card-text class="py-0">
        <v-form @submit.prevent="signup" v-model="formValidity">
          <v-text-field
            v-model="username"
            label="Nom d'utilisateur"
            prepend-icon="mdi-account-circle"
            name="username"
            :rules="usernameRules"
            color="deep-purple"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            prepend-icon="mdi-email"
            name="email"
            :rules="emailRules"
            color="deep-purple"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Mot de passe"
            name="password"
            required
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            color="deep-purple"
          ></v-text-field>
          <v-alert v-if="passwordError" dense outlined type="error">
            {{ passwordError }}
          </v-alert>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              type="submit"
              name="button"
              class="info white--text"
              elevation="3"
              :disabled="!formValidity"
              >S'inscrire</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>

      <v-divider class="mt-2"></v-divider>

      <!-- Envoie vers la page LoginUser -->
      <div class="pa-2">
        Vous possédez déjà un compte?
        <router-link to="/login">Se connecter.</router-link>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  // data
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordError: "",
      showPassword: false,
      formValidity: false,
      emailRules: [
        (value) => value.indexOf("@") !== 0 || "Email non valide.",
        (value) => value.includes("@") || "Votre email doit contenir un @.",
        (value) =>
          value.indexOf(".") - value.indexOf("@") > 1 ||
          "Nom de domaine non valide",
        (value) => value.includes(".") || "Votre email doit contenir un point.",
        (value) =>
          value.indexOf(".") <= value.length - 3 || "Nom de domaine non valide",
      ],
      usernameRules: [
        (value) =>
          value.length >= 3 ||
          "Le nom d'utilisateur doit contenir au minimum 3 caractères.",
      ],
    }
  },

  // methods
  methods: {
    signup() {
      this.$store
        .dispatch("signup", {
          email: this.email,
          password: this.password,
          username: this.username,
        })
        .then(() => {
          this.$router.push({ name: "Login" })
        })
        .catch((error) => {
          this.passwordError = error.response.data.message
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
