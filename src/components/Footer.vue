<template>
  <div>
    <v-footer dark padless>
      <v-card
        flat
        tile
        min-width="100%"
        class="grey-darken-4 lighten-1 white--text text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0"
          >Projet 7 de la formation Développeur Web d'OpenClassrooms, ceci est
          un réseau social interne de l'entreprise fictive
          Groupomania.</v-card-text
        >

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} | <strong>© Anthony Azzati</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: ["mdi-github", "mdi-linkedin"],
    }
  },
}
</script>

<style lang="scss" scoped></style>
