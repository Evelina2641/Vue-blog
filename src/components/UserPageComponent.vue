<template>
  <div class="wrapper">
    <Modal v-if="showModal">
      <h3 slot="header">Are you sure you want to delete it?</h3>
      <button slot="buttons" @click="deletePost()">YES</button>
      <button slot="buttons" @click="showModal = false">NO</button>
    </Modal>
    <h2>Hello {{ username }}!</h2>
    <button @click="openAddPost">ADD POST!</button>
    <!-- If posts array is empty, show that to user -->
    <div class="emty_container" v-if="userPosts.length === 0">
      <h2>You have 0 posts</h2>
    </div>
    <div class="container">
      <div class="post_box" v-for="(post, index) in userPosts" :key="post.id">
        <h3 @click="openPost(post.id, post.username)" class="title">
          {{ post.title }}
        </h3>
        <!-- Click on the username to see all of this users posts -->
        <p class="username" @click="allUserPosts(post.username)">
          User: {{ post.username }}
        </p>
        <div class="buttons_container">
          <button @click="openEditPage(post.username, post.id)">
            EDIT POST
          </button>
          <!-- Index for delete post -->
          <button @click="savePostIndex(index)">DELETE POST</button>
        </div>
        <p class="description" @click="openPost(post.id, post.username)">
          {{ post.description.substr(0, 100) }}...
        </p>
        <img :src="post.image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./Modal";
export default {
  name: "UserPageComponent",
  components: {
    Modal,
  },
  data() {
    return {
      username: this.$route.params.user,
      userPosts: [],
      showModal: false,
      postIndex: "",
    };
  },
  methods: {
    openAddPost() {
      this.$router.push(`/${this.username}/add-post`);
    },

    openPost(id, user) {
      this.$router.push(`/post/${user}/${id}`);
    },
    allUserPosts(user) {
      this.$router.push(`/posts/${user}`);
    },
    openEditPage(username, id) {
      this.$router.push(`/${username}/${id}/edit-post`);
    },
    savePostIndex(index) {
      this.postIndex = index;
      this.showModal = true;
    },
    deletePost() {
      fetch(`http://167.99.138.67:1111/deletepost`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          secretKey: localStorage.getItem("secretKey"),
          id: this.userPosts[this.postIndex].id,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          this.showModal = false;
          this.userPosts.splice(this.postIndex, 1);
        });
    },
  },
  mounted() {
    fetch(`http://167.99.138.67:1111/getuserposts/${this.username}`)
      .then((res) => res.json())
      .then((json) => {
        this.userPosts = json.data;
      });
  },
};
</script>

<style scoped>
/* Mobile first */
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.wrapper > h2 {
  padding: 35px 0 25px 0;
  font-size: 2em;
  color: var(--primary-color);
}
.wrapper button {
  padding: 10px 25px;
  background: var(--secondary-color);
  color: var(--primary-color);
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
}
.empty_container {
  margin-top: 200px;
  width: 100%;
  text-align: center;
  font-size: 2.4em;
  color: var(--primary-color);
  opacity: 0.4;
}
.container {
  margin: 35px 20px;
  width: 100vw;
  overflow: hidden;
}
.post_box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--primary-color);
  margin-bottom: 30px;
}
.post_box .title,
.post_box .username,
.post_box .description {
  cursor: pointer;
}
.post_box .title {
  color: var(--primary-color);
  background: var(--secondary-color);
  font-size: 1.7em;
  text-align: center;
  word-wrap: break-word;
  width: 90%;
  padding: 5px;
}
.post_box .username {
  display: block;
  font-size: 1.2em;
  color: var(--primary-color);
  font-weight: 600;
  padding-top: 10px;
}
.buttons_container > button {
  background: var(--primary-color);
  color: var(--secondary-color);
  margin: 5px;
}
.post_box .description {
  font-size: 1.2em;
  color: var(--primary-color);
  padding: 20px 0;
  word-wrap: break-word;
  width: 90%;
}
.post_box img {
  width: 350px;
  height: 250px;
  margin-bottom: 20px;
}
/* Tablet */
@media screen and (min-width: 678px) {
  .wrapper {
    margin: 0 30px;
  }
  .wrapper button {
    font-size: 1.4em;
  }
  .empty_container {
    font-size: 2.5em;
  }
  .post_box .title {
    font-size: 1.9em;
    padding: 8px;
  }
  .post_box .username {
    font-size: 1.3em;
  }
  .post_box .description {
    font-size: 1.4em;
    width: 80%;
  }
  .post_box img {
    width: 450px;
    height: 280px;
  }
}
/* Desktop */
@media screen and (min-width: 1280px) {
  .wrapper {
    margin: 0 auto;
    max-width: 1300px;
  }
  .wrapper h2 {
    font-size: 2.3em;
  }
  .wrapper button {
    font-size: 1.5em;
  }
  .empty_container {
    font-size: 2.7em;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .post_box {
    width: 48%;
  }
  .post_box .title {
    min-height: 100px;
  }
  .post_box .description {
    height: 100px;
  }
}
</style>
