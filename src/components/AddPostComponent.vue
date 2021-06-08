<template>
  <div class="container">
    <h2>ADD POST</h2>
    <p class="error_message" v-if="errorMessage !== ''">{{ errorMessage }}</p>
    <p class="success_message" v-if="successMessage !== ''">
      {{ successMessage }}
    </p>
    <form @submit.prevent="addPost">
      <label for="title">Title</label>
      <textarea type="text" v-model="postData.title" id="title"></textarea>
      <label for="description">Description</label>
      <textarea
        type="text"
        v-model="postData.description"
        id="description"
      ></textarea>
      <label for="url">Upload image URL</label>
      <input type="text" id="url" v-model="postData.url" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddPostComponent",
  data() {
    return {
      postData: {
        title: "",
        description: "",
        url: "",
      },
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    addPost() {
      fetch("http://167.99.138.67:1111/createpost", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          secretKey: localStorage.getItem("secretKey"),
          title: this.postData.title,
          description: this.postData.description,
          image: this.postData.url,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return (this.errorMessage = "Something went wrong");
          }
        })
        .then((json) => {
          if (json.success === false) {
            this.successMessage = ''
            this.errorMessage = json.message
          } else {
            this.errorMessage = "";
            this.successMessage = "Post added! ♥ ";
            this.postData.title = "";
            this.postData.description = "";
            this.postData.url = "";
          }
        });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 90vh;
}
.container h2 {
  text-align: center;
  font-size: 2em;
  color: var(--primary-color);
  margin: 25px 0 15px 0;
}
.container form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#title {
  height: 50px;
  width: 90%;
  padding: 5px;
  margin-bottom: 25px;
}
#description {
  height: 280px;
  width: 90%;
  padding: 5px;
  margin-bottom: 25px;
}
#url {
  width: 90%;
  height: 30px;
  margin-bottom: 25px;
}
.container form label,
textarea,
button {
  font-size: 1.5em;
  color: var(--primary-color);
}
.container form textarea {
  margin-bottom: 10px;
  border: 1px solid var(--primary-color);
  resize: none;
}
.container form textarea:focus {
  outline: 1px solid var(--secondary-color);
}
.container button {
  width: 40%;
  margin-top: 5px;
  border: none;
  background: var(--secondary-color);
  padding: 5px;
  cursor: pointer;
}
.container .error_message {
  color: red;
  font-size: 1.3em;
  text-align: center;
  padding-bottom: 7px;
}
.container .success_message {
  color: var(--secondary-color);
  font-size: 1.7em;
  text-align: center;
  font-weight: 600;
  padding-bottom: 7px;
}
.container .error_message::first-letter {
  text-transform: capitalize;
}
</style>
