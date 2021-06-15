<template>
  <div>
    <h1>Bienvenue sur le réseau social de Groupomania</h1>

    <div v-if="!loggedIn">
      Pour utiliser cette application vous devez
      <router-link to="/login"> vous connecter </router-link>
      ou
      <router-link to="/signup"> vous enregistrer </router-link>
    </div>
  </div>
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
