<template>
  <v-container
    class="
      d-flex
      flex-column
      align-center
      justify-center
      fill-height
      black--text
    "
  >
    <h1>Bienvenue sur le réseau social de Groupomania</h1>

    <div v-if="!loggedIn" class="pt-4">
      Pour utiliser cette application vous devez
      <router-link to="/login"> vous connecter </router-link>
      ou
      <router-link to="/signup"> vous enregistrer.</router-link>
    </div>
  </v-container>
</template>

<script>
import { authComputed } from "../store/helpers"
export default {
  computed: {
    ...authComputed,
  },
}
</script>

<style lang="scss" scoped></style>
