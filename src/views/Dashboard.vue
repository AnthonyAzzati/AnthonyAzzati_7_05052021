<template>
  <div>
    <NewPost />

    <Posts />
  </div>
</template>

<script>
import NewPost from "@/components/NewPost.vue"
import Posts from "@/components/Posts/Posts.vue"

export default {
  components: {
    NewPost,
    Posts,
  },
}
</script>

<style lang="scss" scoped></style>
