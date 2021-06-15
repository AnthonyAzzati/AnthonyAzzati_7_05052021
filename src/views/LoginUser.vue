<template>
  <div>
    <v-card width="300" class="mx-auto mt-5 flex-column text-center">
      <v-card-title>
        <h1>Login</h1>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="username"
            label="Username"
            prepend-icon="mdi-account-circle"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-card-actions>
            <v-btn type="submit" name="button">Se connecter</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>

      <router-link to="/signup">
        Vous ne possédez pas encore de compte? Créez-en un.
      </router-link>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "LoginUser",

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
