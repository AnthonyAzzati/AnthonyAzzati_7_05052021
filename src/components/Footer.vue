<template>
  <div>
    <v-footer padless>
      <v-card
        flat
        tile
        min-width="100%"
        class="grey lighten-2 text-center black--text"
      >
        <v-card-text class="py-2">
          <v-btn v-for="icon in icons" :key="icon" class="mx-2" icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="pt-0"
          >Projet 7 de la formation Développeur Web d'OpenClassrooms, ceci est
          un réseau social interne de l'entreprise fictive
          Groupomania.</v-card-text
        >

        <v-divider></v-divider>

        <v-card-text>
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
