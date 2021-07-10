<template>
  <v-app>
    <!-- ==========   Navbar   ========= -->
    <TheNavbar />

    <!-- ==========   Main app   ========== -->
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>

    <!-- ==========   Footer   ========== -->
    <TheFooter />
  </v-app>
</template>

<script>
// import des composants
import TheNavbar from "@/components/TheNavbar.vue"
import TheFooter from "@/components/TheFooter.vue"

export default {
  components: {
    TheNavbar,
    TheFooter,
  },

  name: "App",
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
