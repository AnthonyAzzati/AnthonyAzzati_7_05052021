<template>
  <v-app>
    <AppNav />
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
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

<style lang="scss">
.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms;
}

.fade-leave-to {
  opacity: 0;
}
</style>
