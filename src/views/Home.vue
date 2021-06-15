<template>
<<<<<<< HEAD
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
=======
  <div>
    <h1>Bienvenue sur le réseau social de Groupomania</h1>
    <div v-if="!loggedIn">
      Pour utiliser cette application vous devez
      <router-link to="/login"> vous connecter </router-link>
      ou
      <router-link to="/signup"> vous enregistrer </router-link>
    </div>
>>>>>>> feat/API
  </div>
</template>

<script>
<<<<<<< HEAD
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
=======
import { authComputed } from "../store/helpers"
export default {
  computed: {
    ...authComputed,
  },
}
</script>

<style lang="scss" scoped></style>
>>>>>>> feat/API
