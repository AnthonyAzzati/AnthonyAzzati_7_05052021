<template>
  <!-- ==========   Navbar   ========== -->
  <v-card class="mx-auto">
    <v-app-bar app color="grey lighten-2">
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="ml-sm-2 ml-md-4"
      ></v-app-bar-nav-icon>

      <v-app-bar-title>
        <router-link to="/homepage">
          <img
            src="../assets/icon-left-font-monochrome-black.svg"
            alt="Logo de Groupomania"
            width="150"
          />
        </router-link>
      </v-app-bar-title>

      <!-- ==========   Navigation Drawer   ========== -->
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        height="100vh"
        color="grey lighten-2"
      >
        <v-list nav dense class="fill-height">
          <v-list-item-group v-model="group">
            <v-list-item v-if="!loggedIn" class="my-4">
              <router-link to="/" class="link">
                <v-list-item-title>Accueil</v-list-item-title>
              </router-link>
            </v-list-item>

            <v-list-item v-if="loggedIn" class="my-4">
              <router-link to="/homepage" class="link">
                <v-list-item>Accueil</v-list-item>
              </router-link>
            </v-list-item>

            <v-list-item v-if="loggedIn" class="my-4">
              <router-link to="/profile" class="link">
                <v-list-item
                  ><v-avatar color="deep-purple">
                    <v-icon dark>mdi-account-circle</v-icon>
                  </v-avatar>
                  <span class="ml-2">Mon profil</span>
                </v-list-item>
              </router-link>
            </v-list-item>

            <v-list-item v-if="!loggedIn" class="my-4">
              <router-link to="/login" class="button link">
                <v-list-item-title>Se connecter</v-list-item-title>
              </router-link>
            </v-list-item>

            <v-list-item v-else class="my-4">
              <v-btn type="button" @click="logout" class="error">
                Déconnexion
              </v-btn>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-app-bar>
  </v-card>
</template>

<script>
import { authComputed } from "../store/helpers.js"

export default {
  // data
  data: () => ({
    drawer: false,
    group: null,
  }),

  // computed
  computed: {
    ...authComputed,
  },

  // methods
  methods: {
    logout() {
      this.$store.dispatch("logout")
    },
  },
}
</script>

<style lang="scss" scoped>
img {
  padding-top: 10px;
}

.link {
  text-transform: uppercase;
  text-decoration: none;
  color: black;
  font-weight: 700;
}

.link:focus {
  color: #6b38fb;
}
</style>
