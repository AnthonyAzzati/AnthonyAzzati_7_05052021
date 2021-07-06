<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="6" class="pt-0">
        <v-card outlined elevation="2" id="post--card" class="ma-4">
          <v-card-title>
            <div class="d-flex">
              <v-avatar color="deep-purple">
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
              <div class="d-flex flex-column justify-center ml-2">
                <p class="username">Anthony A.</p>
                <p class="post--date">Posté le 28/06/21 à 9:41</p>
              </div>
            </div>
          </v-card-title>

          <v-divider class="mx-2"></v-divider>

          <v-card-text>
            <p id="post--title" class="mb-4">Titre du post</p>
            <p id="post--content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              iste ipsa eius, quos repellat velit animi natus voluptatibus alias
              doloremque! Maiores recusandae facere quaerat est ex sequi eveniet
              repellat nisi! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Aperiam sequi recusandae, animi expedita reprehenderit
              exercitationem, nesciunt fugit culpa ratione tenetur cumque cum?
              Hic quisquam error, consectetur illum animi corporis unde.
            </p>
          </v-card-text>
          <v-img
            src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
            height="auto"
            width="auto"
          ></v-img>

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

            <v-btn text class="ma-2" color="deep-purple">
              <v-icon left>mdi-message</v-icon>
              Commenter
            </v-btn>
          </div>

          <v-form
            @submit.prevent="publishComment"
            class="d-flex flex-column justify-center pT-2 pr-2"
          >
            <div id="comment--wrapper" class="mt-2 mb-2 mx-4">
              <v-textarea
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
              <!-- <v-file-input
                v-model="imageUrl"
                small-chips
                accept="image/png, image/jpeg, image/bmp, image/webp, image/gif, video/mp4"
                name="imageUrl"
                prepend-icon="mdi-image"
                color="deep-purple"
                class="mx-4 py-0"
                required
              ></v-file-input> -->

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

        <div>POSTS: {{ post }}</div>

        <v-btn @click="getAllPosts()">Retrieve data</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      imageUrl: "",
      post: "",
    }
  },

  methods: {
    getAllPosts() {
      axios
        .get("http://localhost:3000/api/post/getallposts")
        .then((response) => console.log(response.data))
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
