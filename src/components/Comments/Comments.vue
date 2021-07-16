<template>
  <div>
    <div>
      <v-divider class="mx-4"></v-divider>
    </div>

    <div class="d-flex ma-4">
      <v-avatar color="deep-purple">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>

      <div id="comment" class="ml-2 pa-2 rounded grey lighten-3">
        <div class="d-flex justify-space-between">
          <div class="d-flex flex-column justify-space-between mb-2">
            <p class="username">
              {{ comment_username }}
            </p>

            <p id="comment--date" class="grey--text">
              {{
                new Date(created_at).toLocaleDateString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </p>
          </div>

          <v-btn
            v-if="
              comment_username == this.$store.state.user.username ||
              this.$store.state.user.roleId === 2
            "
            elevation="2"
            fab
            small
            @click="deleteComment()"
          >
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </div>

        <p>
          {{ text }}
        </p>

        <v-img
          v-bind:src="image_url"
          max-height="auto"
          id="comment--img"
          class="mx-auto my-2"
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
  props: ["comment_username", "created_at", "text", "image_url"],

  data() {
    return {
      id: this.$vnode.key,
    }
  },

  methods: {
    deleteComment() {
      console.log(this.id)
      axios
        .delete("http://localhost:3000/api/comment/deletecomment", {
          data: {
            commentId: this.id,
          },
        })
        .then(() => window.location.reload())
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

#comment {
  width: fill-available;
  &--img {
    max-height: 180px;
    max-width: 180px;
  }
}

@media screen and (min-width: 375px) {
  #comment--img {
    max-height: 230px;
    max-width: 230px;
  }
}

@media screen and (min-width: 1024px) {
  #comment--img {
    max-height: 350px;
    max-width: 350px;
  }
}

@media screen and (min-width: 1440px) {
  #comment--img {
    max-height: 450px;
    max-width: 450px;
  }
}
</style>
