<template>
  <div class="particular_user_container">
    <!-- To show how many posts user has -->
    <p class="hasPosts">
      User {{ this.$route.params.user }} has {{ userPosts.length }}
      <span v-if="userPosts.length > 1">posts</span>
      <span v-if="userPosts.length <= 1">post</span>
    </p>
    <div class="container" :class="{ moreMargin: userPosts.length <= 1 }">
      <div class="post_box" v-for="post in userPosts" :key="post.id">
        <h3 @click="openPost(post.id, post.username)">{{ post.title }}</h3>
        <p class="username">User: {{ post.username }}</p>
        <p class="description" @click="openPost(post.id, post.username)">
          {{ post.description.substr(0, 100) }}...
        </p>
        <img :src="post.image" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ParticularUserPostsComponent",
  data() {
    return {
      userPosts: [],
    };
  },

  mounted() {
    fetch(`http://167.99.138.67:1111/getuserposts/${this.$route.params.user}`)
      .then((res) => res.json())
      .then((data) => {
        this.userPosts = data.data;
      });
  },
  methods: {
    openPost(id, user) {
      this.$router.push(`/post/${user}/${id}`);
    },
  },
};
</script>
<style scoped>
/* Mobile first */
.hasPosts {
  font-weight: 600;
  color: var(--secondary-color);
  background: var(--primary-color);
  width: 40%;
  padding: 5px;
  margin: 25px;
}

.container {
  margin: 35px 20px;
}

.moreMargin {
  margin-bottom: 390px;
}
.post_box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--primary-color);
  margin-bottom: 30px;
}
.post_box h3,
.post_box .username,
.post_box .description {
  cursor: pointer;
}

.post_box h3 {
  color: var(--primary-color);
  background: var(--secondary-color);
  font-size: 1.7em;
  text-align: center;
  word-wrap: break-word;
  width: 100%;
  padding: 5px;
  margin-bottom: 15px;
}
.post_box .username {
  display: block;
  margin-right: auto;
  font-size: 1.2em;
  color: var(--primary-color);
  font-weight: 600;
}
.post_box .description {
  font-size: 1.2em;
  color: var(--primary-color);
  padding: 10px 0;
  word-wrap: break-word;
  width: 100%;
}
.post_box img {
  width: 350px;
  height: 250px;
  margin-bottom: 20px;
}
/* Tablet */
@media screen and (min-width: 678px) {
  .hasPosts {
    font-size: 1.1em;
    width: 30%;
  }
  .container {
    margin: 35px 30px;
  }
  .moreMargin {
    margin-bottom: 390px;
  }
  .post_box h3 {
    font-size: 1.8em;
  }
  .post_box .username {
    font-size: 1.3em;
  }
  .post_box .description {
    font-size: 1.3em;
    padding-bottom: 20px;
  }
  .post_box img {
    width: 410px;
    height: 280px;
  }
}
/* Desktop */
@media screen and (min-width: 1280px) {
  .particular_user_container {
    max-width: 1300px;
    margin: 0 auto;
  }
  .hasPosts {
    font-size: 1.2em;
    width: 17%;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    margin: 35px 30px;
  }
  .moreMargin {
    margin-bottom: 390px;
  }
  .post_box {
    width: 48%;
    margin: 0 10px 35px 10px;
  }
  .post_box h3 {
    padding-top: 15px;
    min-height: 100px;
  }
  .post_box .username {
    font-size: 1.3em;
  }
  .post_box .description {
    font-size: 1.3em;
    padding-bottom: 20px;
  }
  .post_box img {
    width: 410px;
    height: 280px;
  }
  .moreMargin {
    margin-bottom: 50px;
  }
}
</style>
