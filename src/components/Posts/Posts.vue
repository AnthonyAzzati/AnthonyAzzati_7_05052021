<template>
  <div>
    <Post
      v-for="post in posts"
      :key="post.id"
      :post_username="post.post_username"
      :created_at="post.created_at"
      :title="post.title"
      :text="post.text"
      :image_url="post.image_url"
    />
  </div>
</template>

<script>
import axios from "axios"
import Post from "@/components/Posts/Post.vue"

export default {
  components: {
    Post,
  },

  data() {
    return {
      posts: [],
    }
  },

  created() {
    axios
      .get("http://localhost:3000/api/post/getallposts")
      .then((response) => {
        this.posts = response.data.results
      })
      .catch((error) => console.error(error))
  },
}
</script>

<style lang="scss" scoped></style>
