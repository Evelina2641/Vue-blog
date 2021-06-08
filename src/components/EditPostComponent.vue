<template>
  <div class="container">
    <Modal v-if="showModal">
      <h3 slot="header">Confirm edit?</h3>
      <button slot="buttons" @click="editPost">YES</button>
      <button slot="buttons" @click="(showModal = false), (disabled = false)">
        NO
      </button>
    </Modal>
    <h2>EDIT POST</h2>
    <p class="error_message" v-if="errorMessage !== ''">{{ errorMessage }}</p>
    <p class="success_message" v-if="successMessage !== ''">
      {{ successMessage }}
    </p>
    <form @submit.prevent="confirmEdit">
      <label for="title">Title</label>
      <textarea
        type="text"
        :disabled="disabled"
        v-model="postData.title"
        id="title"
      ></textarea>
      <label for="description">Description</label>
      <textarea
        type="text"
        :disabled="disabled"
        v-model="postData.description"
        id="description"
      ></textarea>
      <label for="url">Upload image URL</label>
      <input type="text" :disabled="disabled" id="url" v-model="postData.url" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import Modal from "./Modal";
export default {
  name: "EditPostComponent",
  components: {
    Modal,
  },
  data() {
    return {
      postData: {
        title: "",
        description: "",
        url: "",
      },
      errorMessage: "",
      successMessage: "",
      showModal: false,
      //   To disable editing post when modal shows up
      disabled: false,
    };
  },
  methods: {
    confirmEdit() {
      this.showModal = true;
      this.disabled = true;
    },
    editPost() {
      this.showModal = false;
      fetch("http://167.99.138.67:1111/updatepost", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          secretKey: localStorage.getItem("secretKey"),
          title: this.postData.title,
          description: this.postData.description,
          image: this.postData.url,
          id: this.$route.params.id,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success === false) {
            this.successMessage = "";
            this.errorMessage = json.message;
          } else {
            this.errorMessage = "";
            this.successMessage = "Post updated successfully! ♥ ";
          }
        });
      this.disabled = false;
    },
  },
  mounted() {
    fetch(
      `http://167.99.138.67:1111/getsinglepost/${this.$route.params.user}/${this.$route.params.id}`
    )
      .then((res) => res.json())
      .then((json) => {
        this.postData.title = json.data.title;
        this.postData.description = json.data.description;
        this.postData.url = json.data.image;
      });
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.container h2 {
  text-align: center;
  font-size: 2em;
  color: var(--primary-color);
  margin: 15px 0;
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
  margin-top: 10px;
}
#description {
  height: 280px;
  width: 90%;
  padding: 5px;
  margin-bottom: 25px;
  margin-top: 10px;
}
#url {
  width: 90%;
  height: 30px;
  margin-bottom: 25px;
  margin-top: 10px;
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
  margin-top: 10px;
  border: none;
  background: var(--secondary-color);
  padding: 5px;
  cursor: pointer;
}
.container .error_message {
  color: red;
  font-size: 1.3em;
  text-align: center;
}
.container .success_message {
  color: var(--secondary-color);
  font-size: 1.7em;
  text-align: center;
  font-weight: 600;
}
.container .error_message::first-letter {
  text-transform: capitalize;
}
/* Tablet */
@media screen and (min-width: 678px) {
  .container button {
    width: 30%;
    padding: 8px;
  }
  .container .error_message {
    color: red;
    font-size: 1.3em;
    text-align: center;
  }
  .container .success_message {
    color: var(--secondary-color);
    font-size: 1.7em;
    text-align: center;
    font-weight: 600;
  }
  .container .error_message::first-letter {
    text-transform: capitalize;
  }
}
</style>
