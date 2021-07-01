<template>
  <div>
    <NewPost />
    <AllPosts />
  </div>
</template>

<script>
import NewPost from "@/components/NewPost.vue"
import AllPosts from "@/components/AllPosts.vue"

export default {
  components: {
    NewPost,
    AllPosts,
  },
}
</script>

<style lang="scss" scoped></style>
