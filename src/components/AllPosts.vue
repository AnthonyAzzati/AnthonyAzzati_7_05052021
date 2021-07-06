<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="6" class="pt-0">
        <v-card
          v-for="(post, index) of posts"
          :key="index"
          outlined
          elevation="2"
          id="post--card"
          class="ma-4"
        >
          <v-card-title>
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
          </v-card-title>

          <v-divider class="mx-2"></v-divider>

          <v-card-text>
            <p id="post--title" class="mb-4">{{ post.title }}</p>
            <p id="post--content">
              {{ post.text }}
            </p>
          </v-card-text>
          <v-img :src="post.image_url" height="auto" width="auto"></v-img>

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

          <NewComment />

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

          <v-btn text small class="ml-2 mb-2"
            >Afficher plus de commentaires</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NewComment from "./NewComment.vue"

import axios from "axios"

export default {
  components: { NewComment },
  data() {
    return {
      posts: [],
    }
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/post/getallposts")
      .then((response) => (this.posts = response.data.results))
      .catch((error) => console.error(error))
  },

  methods: {},
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
</style>
