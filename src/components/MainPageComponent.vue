<template>
    <div class="main_page">
        <div class="container" v-for="post in posts" :key="post.id">
            <div class="post_box">
                <h3 @click="openPost(post.id, post.username)">{{post.title}}</h3>
                <p class="username" @click="allUserPosts(post.username)">User: {{post.username}}</p>
                <p class="description" @click="openPost(post.id, post.username)">{{post.description.substr(0,70)}}...</p>
                <img :src="post.image" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainPageComponent',
    data() {
        return {
            posts: []
        }
    },
    mounted() {
        fetch(`http://167.99.138.67:1111/getallposts`)
        .then(res => res.json())
        .then(data => {
            console.log(data.data);
            this.posts = data.data;
        })
    },
    methods: {
        openPost(id, user) {
            this.$router.push(`/post/${user}/${id}`)
        },
        allUserPosts(user) {
          this.$router.push(`/posts/${user}`)
      }
    }
}
</script>
<style scoped>
    /* Mobile first */
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
    .post_box h3, .post_box .username, .post_box .description {
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
</style>