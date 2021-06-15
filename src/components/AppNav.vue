<template>
  <v-app-bar app dark>
    <div id="nav" class="grey-darken-4 lighten-1 white--text text-center">
      <router-link v-if="!loggedIn" to="/">Accueil</router-link>
      <router-link v-if="loggedIn" to="/dashboard">Dashboard</router-link>
      <router-link v-if="!loggedIn" to="/login" class="button">
        Se connecter
      </router-link>

      <button v-else type="button" @click="logout">Se déconnecter</button>
    </div>
  </v-app-bar>
</template>

<script>
import { authComputed } from "../store/helpers.js"
export default {
  computed: {
    ...authComputed,
  },
  methods: {
    logout() {
      this.$store.dispatch("logout")
    },
  },
}
</script>

<style lang="scss" scoped></style>
