<template>
<<<<<<< HEAD
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
=======
  <v-app>
    <AppNav />
    <v-main>
      <router-view class="page" />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import AppNav from "@/components/AppNav.vue"
import Footer from "@/components/Footer.vue"

export default {
  components: {
    AppNav,
    Footer,
  },

  name: "App",

  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
>>>>>>> feat/API
}
</style>
