<template>
  <div id="account" class="d-flex flex-column align-center justify-center">
    <v-card elevation="4">
      <v-card-text class="d-flex flex-column align-center justify-center">
        <v-avatar color="deep-purple" size="80">
          <v-icon dark large>mdi-account-circle</v-icon>
        </v-avatar>

        <h3 class="mt-4 text-uppercase">Test</h3>

        <p class="mt-2">test@email.com</p>

        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn rounded v-bind="attrs" v-on="on" class="mt-2">
              Modifier
            </v-btn>
          </template>

          <v-card>
            <div class="d-flex justify-space-between">
              <v-card-title class="pb-0"
                >Modifier mes informations</v-card-title
              >
              <v-btn icon @click="dialog = false" class="mt-4 mr-4">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            <v-form @submit.prevent="updateUserProfile" v-model="formValidity">
              <v-textarea
                v-model="username"
                name="username"
                label="Nom d'utilisateur"
                class="px-4 pt-2"
                prepend-icon="mdi-account"
                color="deep-purple"
                rows="1"
                auto-grow
                counter
                required
              ></v-textarea>
              <v-textarea
                v-model="email"
                name="email"
                label="Email"
                class="mt-0 px-4 pt-4"
                prepend-icon="mdi-email"
                color="deep-purple"
                rows="1"
                auto-grow
                counter
                required
              ></v-textarea>

              <v-divider class="mx-4 mt-4"></v-divider>

              <v-card-actions
                class="d-flex justify-center align-center mt-2 py-0"
              >
                <v-file-input
                  v-model="profilePicture"
                  small-chips
                  name="profilePicture"
                  prepend-icon="mdi-image"
                  truncate-length="10"
                  color="deep-purple"
                  class="pr-4"
                  accept="image/png, image/jpeg, image/bmp, image/webp"
                ></v-file-input>
                <v-btn
                  type="submit"
                  elevation="2"
                  rounded
                  color="deep-purple"
                  class="white--text"
                  :disabled="!formValidity"
                  >Mettre à jour</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <v-btn rounded color="red" class="mt-4 white--text">
          Supprimer mon compte
        </v-btn>

        <v-alert dense outlined type="error" class="mt-2">
          La suppression de votre compte est <strong>définitive</strong> et
          <strong>irréversible.</strong>
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      profilePicture: [],
      dialog: false,
      formValidity: false,
    }
  },
}
</script>

<style lang="scss" scoped>
#account {
  height: 60vh;
}
</style>
