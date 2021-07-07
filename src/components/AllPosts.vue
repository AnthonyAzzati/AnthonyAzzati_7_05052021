<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="6" class="pt-0">
        <v-card
          v-for="post of posts"
          :key="post.id"
          outlined
          elevation="2"
          id="post--card"
          class="ma-4"
        >
          <v-card-title>
            <v-container
              class="d-flex flex-fill pa-0 justify-space-between align-center"
            >
              <div class="d-flex">
                <v-avatar color="deep-purple">
                  <v-icon dark>mdi-account-circle</v-icon>
                </v-avatar>

                <div class="d-flex flex-column justify-center ml-2">
                  <p class="username">{{ post.post_username }}</p>
                  <p class="post--date">
                    Posté le
                    {{
                      new Date(post.created_at).toLocaleDateString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                  </p>
                </div>
              </div>

              <v-btn
                class="deletePost--btn"
                elevation="2"
                fab
                small
                color="red"
                @click="deletePost()"
              >
                <v-icon color="white">mdi-delete</v-icon>
              </v-btn>
            </v-container>
          </v-card-title>

          <v-divider class="mx-2"></v-divider>

          <v-card-text>
            <p id="post--title" class="mb-4">{{ post.title }}</p>
            <p id="post--content">
              {{ post.text }}
            </p>
          </v-card-text>
          <v-img
            v-bind:src="post.image_url"
            max-height="400"
            width="auto"
            contain
          >
          </v-img>

          <div class="d-flex ma-4">
            <div class="mr-4">
              <v-icon left color="blue lighten-2" class="mr-0"
                >mdi-thumb-up</v-icon
              >
              17
            </div>
            <div>
              <v-icon left color="red lighten-2" class="mr-0"
                >mdi-thumb-down</v-icon
              >
              4
            </div>

            <v-divider vertical class="mx-4"></v-divider>

            <span>42 commentaires</span>
          </div>

          <v-divider class="mx-2 mt-4"></v-divider>

          <div class="d-flex justify-space-between">
            <div>
              <v-btn class="my-2 ml-2" icon color="blue lighten-2">
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>

              <v-btn icon class="my-2 ml-2" color="red lighten-2">
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
            </div>
          </div>

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

          <div class="d-flex ma-4">
            <v-avatar color="deep-purple">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>

            <div class="ml-2 pa-2 rounded grey lighten-3">
              <div class="d-flex justify-space-between mb-2">
                <p class="username">Username</p>
                <p id="comment--date" class="grey--text">21/06/2021 9:41</p>
              </div>

              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Suscipit temporibus voluptates excepturi odit mollitia nesciunt
                obcaecati recusandae natus quisquam, beatae facere culpa magni
                itaque! Asperiores cum nihil saepe assumenda alias.
              </p>
            </div>
          </div>

          <v-btn text small class="ml-2 mb-2" @click="showComments()"
            >Afficher plus de commentaires</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
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

      const datata = [...formData.entries()]
      console.log(datata)

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
        .get("http://localhost:3000/api/comment/comments", {
          data: {
            id: this.posts[0].id,
          },
        })
        .then((response) => {
          console.log(response)
          this.comments = response.data.results
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
