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
          <v-btn v-for="icon in icons" :key="icon.id" class="mx-2" icon>
            <a :href="icon.link" target="_blank">
              <v-icon size="24px" color="#673ab7">
                {{ icon.name }}
              </v-icon>
            </a>
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
      icons: [
        { name: "mdi-github", link: "https://github.com/AnthonyAzzati" },
        {
          name: "mdi-linkedin",
          link: "https://www.linkedin.com/in/anthonyazzati/",
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
