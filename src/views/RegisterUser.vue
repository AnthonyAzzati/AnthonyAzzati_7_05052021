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
        <h3>S'inscrire</h3>
      </v-card-title>

      <v-card-text class="py-0">
        <v-form @submit.prevent="signup">
          <v-text-field
            v-model="username"
            label="Nom d'utilisateur"
            prepend-icon="mdi-account-circle"
            name="username"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="email"
            type="email"
            prepend-icon="mdi-email"
            name="email"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="password"
            name="password"
            required
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              type="submit"
              name="button"
              class="info white--text"
              elevation="3"
              >S'inscrire</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>

      <div class="pa-2">
        Vous possédez déjà un compte?
        <router-link to="/login">Se connecter. </router-link>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      username: "",
      email: "",
      password: "",
    }
  },
  methods: {
    signup() {
      this.$store
        .dispatch("signup", {
          email: this.email,
          password: this.password,
          username: this.username,
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
