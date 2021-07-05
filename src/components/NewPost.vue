<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" align="center">
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <div
              id="newpost"
              class="d-flex justify-center align-center mt-4 py-2"
            >
              <v-avatar color="deep-purple">
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
              <v-btn
                id="newpost--btn"
                text
                v-bind="attrs"
                v-on="on"
                class="ml-2"
                width="75%"
              >
                Commencer un post
              </v-btn>
            </div>
          </template>
          <v-card>
            <div class="d-flex justify-space-between">
              <v-card-title class="pb-0">Créer un post</v-card-title>
              <v-btn icon @click="dialog = false" class="mt-4 mr-4">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>

            <v-form @submit.prevent="createNewPost" v-model="formValidity">
              <v-textarea
                v-model="title"
                name="title"
                label="Donner un titre à votre post"
                class="px-4 pt-2"
                prepend-icon="mdi-format-title"
                color="deep-purple"
                rows="1"
                :rules="postRules"
                auto-grow
                counter
                required
              ></v-textarea>

              <v-textarea
                v-model="text"
                name="text"
                label="De quoi souhaitez-vous discuter ?"
                class="mt-0 px-4 pt-4"
                prepend-icon="mdi-comment"
                color="deep-purple"
                rows="2"
                :rules="postRules"
                auto-grow
                counter
                required
              ></v-textarea>

              <v-divider class="mx-4 mt-4"></v-divider>

              <v-card-actions
                class="d-flex justify-center align-center mt-2 py-0"
              >
                <v-file-input
                  small-chips
                  @change="uploadFile"
                  type="file"
                  name="image"
                  ref="imageInput"
                  prepend-icon="mdi-image"
                  truncate-length="10"
                  color="deep-purple"
                  class="pr-4"
                  accept="image/png, image/jpeg, image/bmp, image/webp, image/gif"
                ></v-file-input>

                <v-btn
                  type="submit"
                  elevation="2"
                  rounded
                  color="deep-purple"
                  class="white--text"
                  :disabled="!formValidity"
                  >Publier</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data: () => ({
    title: "",
    text: "",
    idUser: "",
    image: null,
    dialog: false,
    formValidity: false,
    postRules: [(value) => value.length > 0 || "Ce champ doit être rempli"],
  }),

  methods: {
    uploadFile() {
      this.image = this.$refs.imageInput.$refs.input.files[0]
      console.log(this.image)
      console.log(this.image.name)
    },
    createNewPost() {
      let formData = new FormData()

      let user = JSON.parse(localStorage.getItem("user"))
      this.idUser = user.id

      formData.append("title", this.title)
      formData.append("text", this.text)
      formData.append("image", this.image, this.image.name)
      formData.append("idUser", this.idUser)

      axios
        .post("//localhost:3000/api/post/createpost", formData)
        .then((data) => {
          console.log(data)
        })
        .catch((error) => console.log(error))
    },
  },
}
</script>

<style lang="scss" scoped>
#newpost {
  margin: 0 1rem;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  background-color: #e0e0e0;
  max-width: 325px;
  &--btn {
    border: 1px solid #bdbdbd;
    background-color: white;
    &:hover {
      background-color: #673ab7;
      transition: 200ms;
      color: white;
    }
  }
}
</style>
