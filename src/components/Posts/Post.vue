<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="6" class="pt-0">
        <v-card outlined elevation="2" id="post--card" class="ma-4">
          <v-card-title>
            <v-container
              class="d-flex flex-fill pa-0 justify-space-between align-center"
            >
              <div class="d-flex">
                <v-avatar color="deep-purple">
                  <v-icon dark>mdi-account-circle</v-icon>
                </v-avatar>

                <div class="d-flex flex-column justify-center ml-2">
                  <p class="username">{{ post_username }}</p>
                  <p class="post--date">
                    Posté le
                    {{
                      new Date(created_at).toLocaleDateString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                  </p>
                </div>
              </div>

              <v-btn
                v-if="
                  post_username == this.$store.state.user.username ||
                  this.$store.state.user.roleId === 2
                "
                class="deletePost--btn"
                elevation="2"
                fab
                small
                @click="deletePost()"
              >
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-container>
          </v-card-title>

          <v-divider class="mx-2"></v-divider>

          <v-card-text>
            <p id="post--title" class="mb-4">{{ title }}</p>
            <p id="post--content">
              {{ text }}
            </p>
          </v-card-text>
          <v-img :src="image_url" max-height="400" width="auto" contain>
          </v-img>

          <v-divider class="mx-2 mt-6"></v-divider>

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

          <v-form
            @submit.prevent="publishComment"
            class="d-flex flex-column justify-center pT-2 pr-2"
          >
            <div id="comment--wrapper" class="mt-2 mb-2 mx-4">
              <v-textarea
                v-model="postText"
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
                elevation="2"
                color="deep-purple"
                class="white--text"
                rounded
                >Publier</v-btn
              >
            </div>
          </v-form>

          <v-btn text small class="ml-2 my-2" @click="showComments()">
            Afficher les commentaires
          </v-btn>

          <Comments
            v-for="comment in comments"
            :key="comment.id"
            :comment_username="comment.comment_username"
            :created_at="comment.created_at"
            :text="comment.text"
            :image_url="comment.image_url"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios"
import Comments from "@/components/Comments/Comments.vue"

export default {
  props: ["post_username", "created_at", "title", "text", "image_url"],

  components: {
    Comments,
  },

  data() {
    return {
      comments: [],
      idUser: "",
      idPost: "",
      postText: "",
      username: "",
      image: "",
      id: this.$vnode.key,
    }
  },

  methods: {
    deletePost() {
      axios
        .delete("http://localhost:3000/api/post/deletepost", {
          data: {
            postId: this.id,
          },
        })
        .then(() => window.location.reload())
        .catch((error) => console.error(error))
    },
    uploadFile() {
      this.image = this.$refs.imageInput.$refs.input.files[0]
    },
    publishComment() {
      let formData = new FormData()
      let user = JSON.parse(localStorage.getItem("user"))

      this.idUser = user.id
      this.username = user.username
      this.idPost = this.$vnode.key

      formData.append("idPost", this.idPost)
      formData.append("idUser", this.idUser)
      formData.append("username", this.username)
      formData.append("text", this.postText)
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
            id: this.$vnode.key,
          },
        })
        .then((response) => {
          this.comments = response.data.results
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

#post {
  &--card {
    border: 1px solid #bdbdbd;
    border-radius: 5px;
  }
  &--title {
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 600;
    color: black;
  }
  &--content {
    font-size: 1rem;
    color: black;
  }
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
