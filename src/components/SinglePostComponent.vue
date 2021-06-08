<template>
  <div class="single_post_page">
    <div class="container">
      <h3>{{ post.title }}</h3>
      <p class="username" @click="allUserPosts(post.username)">
        User: {{ post.username }}
      </p>
      <p class="description">
        {{ post.description }}
      </p>
      <img :src="post.image" alt="" />
      <div @click="allUserPosts(post.username)">
        See all {{ post.username }} posts
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SinglePostComponent",
  data() {
    return {
      post: [],
    };
  },
  mounted() {
    fetch(`http://167.99.138.67:1111/getsinglepost/${this.$route.params.user}/${this.$route.params.id}`)
      .then((res) => res.json())
      .then((data) => (this.post = data.data));
  },
  methods: {
    allUserPosts(user) {
      this.$router.push(`/posts/${user}`);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.container h3 {
  color: var(--primary-color);
  background: var(--secondary-color);
  font-size: 1.7em;
  text-align: center;
  word-wrap: break-word;
  width: 100%;
  padding: 5px;
}
.container .username {
  display: block;
  margin-right: auto;
  font-size: 1.2em;
  color: var(--primary-color);
  font-weight: 600;
  padding-top: 5px;
  cursor: pointer;
}
.container .description {
  font-size: 1.2em;
  color: var(--primary-color);
  padding: 40px 5px;
  word-wrap: break-word;
  width: 100%;
  text-align: center;
}
.container img {
  width: 100%;
  height: 300px;
}
.container div {
  padding-top: 40px;
  font-size: 1.3em;
  color: var(--secondary-color);
  border-bottom: 1px solid var(--secondary-color);
  cursor: pointer;
  margin-bottom: 50px;
}
</style>
