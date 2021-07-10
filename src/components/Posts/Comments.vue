<template>
  <div>
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
            truncate-length="10"
            small-chips
            required
          ></v-file-input>

          <v-btn
            type="submit"
            :id="post.id"
            :value="post.id"
            elevation="2"
            color="deep-purple"
            class="white--text"
            rounded
            >Publier</v-btn
          >
        </div>
      </v-form>

      <v-divider class="mx-4"></v-divider>
    </div>

    <div v-for="comment of comments" :key="comment.id" class="d-flex ma-4">
      <v-avatar color="deep-purple">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>

      <div id="comment" class="ml-2 pa-2 rounded grey lighten-3">
        <div class="d-flex justify-space-between mb-2">
          <p class="username">{{ comment.comment_username }}</p>
          <p id="comment--date" class="grey--text">
            {{
              new Date(comment.created_at).toLocaleDateString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </p>
        </div>

        <p>{{ comment.text }}</p>

        <v-img
          v-bind:src="comment.image_url"
          max-height="250"
          max-width="150"
          class="mx-auto"
          contain
        >
        </v-img>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      posts: [],
      comments: [],
      text: "",
      idUser: "",
      idPost: "",
      username: "",
      image: null,
    }
  },

  created() {
    axios
      .get("http://localhost:3000/api/post/getallposts")
      .then((response) => (this.posts = response.data.results))
      .catch((error) => console.error(error))
  },

  methods: {
    deletePost() {},
    uploadFile() {
      this.image = this.$refs.imageInput[0].$refs.input.files[0]
    },
    publishComment() {
      let formData = new FormData()

      let user = JSON.parse(localStorage.getItem("user"))
      this.idUser = user.id
      this.username = user.username

      this.idPost = this.posts[0].id

      formData.append("idPost", this.idPost)
      formData.append("idUser", this.idUser)
      formData.append("username", this.username)
      formData.append("text", this.text)
      formData.append("image", this.image)

      axios
        .post("//localhost:3000/api/comment/createcomment", formData)
        .then(() => {
          console.log("Commentaire créé.")
        })
        .catch((error) => console.log(error))

      window.location.reload()
    },
    showComments() {
      axios
        .get("http://localhost:3000/api/comment/getallcomments", {
          params: {
            // voir pour récupèrer uniquement l'ID du POST, là il n'est récupéré que les commentaires du PREMIER post
            // qui sont affichés sur TOUT les posts
            id: this.posts[0].id,
          },
        })
        .then((response) => {
          this.comments = response.data.results
          console.log(this.posts)
          console.log(this.comments)
        })
        .catch((error) => console.error(error))
    },
  },
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

#post--card {
  border: 1px solid #bdbdbd;
  border-radius: 5px;
}

.username {
  line-height: 1rem;
  font-size: 1rem;
  font-weight: bold;
}

.post--date {
  line-height: 1rem;
  font-size: 14px;
  color: #757575;
}

#post--title {
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 600;
  color: black;
}

#post--content {
  font-size: 1rem;
  color: black;
}

#comment {
  width: fill-available;
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
