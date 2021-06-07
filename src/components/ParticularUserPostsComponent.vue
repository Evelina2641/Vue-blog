<template>
    <div>
                <div class="container" v-for="post in userPosts" :key="post.id">
            <div class="post_box">
                <h3 @click="openPost(post.id, post.username)">{{post.title}}</h3>
                <p class="username">User: {{post.username}}</p>
                <p class="description" @click="openPost(post.id, post.username)">{{post.description.substr(0,70)}}...</p>
                <img :src="post.image" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ParticularUserPostsComponent',
    data() {
        return {
            userPosts: []
        }
    },
    mounted() {
        fetch(`http://167.99.138.67:1111/getuserposts/${this.$route.params.user}`)
        .then(res => res.json())
        .then(data => this.userPosts = data.data)
    },
        methods: {
        openPost(id, user) {
            this.$router.push(`/${user}/${id}`)
        }
    }
}
</script>
<style scoped>
    /* Mobile first */
    .container {
        margin: 15px 20px;
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
</style>