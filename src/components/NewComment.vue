<template>
  <div>
    <v-form
      @submit.prevent="publishComment"
      class="d-flex flex-column justify-center pT-2 pr-2"
    >
      <div id="comment--wrapper" class="mt-2 mb-2 mx-4">
        <v-textarea
          v-model="text"
          name="text"
          rounded
          single-line
          auto-grow
          rows="1"
          hide-details="auto"
          label="Ajouter un commentaire..."
          color="deep-purple"
          class="ma-0 pt-1"
        >
        </v-textarea>
      </div>

      <div class="d-flex">
        <v-file-input
          @change="uploadFile"
          type="file"
          name="image"
          ref="imageInput"
          accept="image/png, image/jpeg, image/bmp, image/webp, image/gif"
          prepend-icon="mdi-image"
          color="deep-purple"
          class="mx-4 py-0"
          small-chips
          required
        ></v-file-input>

        <v-btn
          type="submit"
          elevation="2"
          rounded
          color="deep-purple"
          class="white--text"
          >Publier</v-btn
        >
      </div>
    </v-form>

    <v-divider class="mx-4"></v-divider>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      text: "",
      idUser: "",
      idPost: "",
      username: "",
      image: null,
    }
  },

  methods: {
    uploadFile() {
      this.image = this.$refs.imageInput.$refs.input.files[0]
    },
    publishComment() {
      let formData = new FormData()

      let user = JSON.parse(localStorage.getItem("user"))
      this.idUser = user.id
      this.username = user.username

      //formData.append("idPost", this.idPost)
      formData.append("idUser", this.idUser)
      formData.append("username", this.username)
      formData.append("text", this.text)
      formData.append("image", this.image, this.image.name)

      axios
        .post("//localhost:3000/api/comment/:id/createcomment", formData)
        .then(() => {
          console.log("Post créé.")
        })
        .catch((error) => console.log(error))

      window.location.reload()
    },
  },
}
</script>

<style lang="scss" scoped>
#comment {
  &--wrapper {
    border: 1px solid grey;
    border-radius: 28px;
  }
  &--date {
    line-height: 1rem;
    font-size: 1rem;
  }
}
</style>
