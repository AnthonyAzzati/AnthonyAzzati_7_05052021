<template>
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
}
</style>
