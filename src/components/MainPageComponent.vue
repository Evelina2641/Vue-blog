<template>
  <div class="main_page">
    <h1>EXPLORE OUR BLOG POSTS!</h1>
    <button @click="sortPost">SORT NEWEST</button>
    <div class="container">
      <div class="post_box" v-for="post in posts" :key="post.id">
        <h3 @click="openPost(post.id, post.username)">{{ post.title }}</h3>
        <p class="username" @click="allUserPosts(post.username)">
          {{ new Date(post.timestamp).getFullYear() }}.{{
            new Date(post.timestamp).getMonth() + 1
          }}
          by user {{ post.username }}
        </p>
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
  name: "MainPageComponent",
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    fetch(`http://167.99.138.67:1111/getallposts`)
      .then((res) => res.json())
      .then((data) => {
        this.posts = data.data;
      });
  },
  methods: {
    openPost(id, user) {
      this.$router.push(`/post/${user}/${id}`);
    },
    allUserPosts(user) {
      this.$router.push(`/posts/${user}`);
    },
    sortPost() {
      this.posts.sort((a, b) => b.timestamp - a.timestamp);
    },
  },
};
</script>
<style scoped>
/* Mobile first */
.main_page h1 {
  text-align: center;
  padding-top: 25px;
  color: var(--primary-color);
  text-decoration: underline var(--secondary-color);
}
.main_page button {
  padding: 10px 20px;
  margin: 10px 0 0 7px;
  background: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
}
.container {
  margin: 35px 20px;
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
}
.post_box .username {
  display: block;
  margin-right: auto;
  font-size: 1.2em;
  color: var(--primary-color);
  font-weight: 600;
  padding-top: 10px;
}
.post_box .description {
  font-size: 1.2em;
  color: var(--primary-color);
  padding: 20px 0;
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
  .main_page h1 {
    font-size: 2.1em;
  }
  .main_page button {
    padding: 12px 22px;
    margin: 10px 0 0 10px;
    font-size: 1.3em;
  }
  .container {
    margin: 35px 30px;
  }
  .post_box h3 {
    padding: 6px;
  }
  .post_box .username {
    font-size: 1.3em;
  }
  .post_box .description {
    font-size: 1.4em;
  }
  .post_box img {
    width: 420px;
    height: 280px;
    margin-bottom: 20px;
  }
}

/* Desktop  */
@media screen and (min-width: 1280px) {
  .main_page {
    max-width: 1300px;
    margin: 0 auto;
  }
  .main_page h1 {
    font-size: 2.4em;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  .post_box {
    width: 48%;
    margin: 0 10px 35px 10px;
  }
  .post_box h3 {
    min-height: 100px;
  }
  .post_box .description {
    height: 100px;
  }
}
</style>
