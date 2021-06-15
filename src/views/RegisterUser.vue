<template>
  <div>
    <v-card width="300" class="mx-auto mt-5 flex-column text-center">
      <v-card-title>
        <h1>S'inscrire</h1>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="signup">
          <v-text-field
            v-model="username"
            label="username"
            prepend-icon="mdi-account-circle"
            name="username"
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="email"
            type="email"
            prepend-icon="mdi-email"
            name="email"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="password"
            name="password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-card-actions>
            <v-btn type="submit" name="button">S'inscrire</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>

      <router-link to="/login">
        Vous possédez déjà un compte? Se connecter.
      </router-link>
    </v-card>
  </div>
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
