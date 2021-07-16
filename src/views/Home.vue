<template>
  <!-- Page d'accueil qui apparaît quand l'utilisateur arrive sur le site  -->
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
      <router-link to="/login" class="link"> vous connecter </router-link>
      ou
      <router-link to="/signup" class="link"> vous enregistrer.</router-link>
    </div>
  </v-container>
</template>

<script>
import { authComputed } from "../store/helpers"

export default {
  // computed
  computed: {
    ...authComputed,
  },
}
</script>

<style lang="scss" scoped>
.link:hover {
  color: #6b38fb;
  transition: 150ms ease-in-out;
}
</style>
