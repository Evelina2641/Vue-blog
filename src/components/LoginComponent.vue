<template>
  <div class="container">
    <h3>Login</h3>
    <form @submit.prevent="login">
      <label for="username">Username</label>
      <input type="text" v-model="userData.username" />
      <label for="password">Password</label>
      <input type="password" v-model="userData.password" />
      <button type="submit">Login</button>
    </form>
    <p class="error_message">{{ errorMessage }}</p>
    <!-- If user doesn't exist show Registration button -->
    <button v-if="showRegistrationButton" @click="openRegistrationPage">
      Registration
    </button>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      userData: {
        username: "",
        password: "",
      },
      errorMessage: "",
      showRegistrationButton: false,
    };
  },
  methods: {
    login() {
      fetch(`http://167.99.138.67:1111/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: this.userData.username,
          password: this.userData.password,
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
            this.showRegistrationButton = false;
            this.errorMessage = json.message;
          }
          if (json.message === "No such user") {
            this.showRegistrationButton = true;
          }
          if (json.success === true) {
            localStorage.setItem("secretKey", json.secretKey);
            localStorage.setItem("username", this.userData.username);
            this.$router.push(`/user/${this.userData.username}`);
            // Nesugalvojau kaip padaryti, kad prisijungus ir nuejus i user page'a pasikeistu ir navigacija is karto.Nes nepekrovus nepasikeicia. :(((
            window.location.reload();
            this.userData.username = "";
            this.userData.password = "";
          }
        });
    },
    openRegistrationPage() {
      this.$router.push(`/registration`);
    },
  },
};
</script>

<style scoped>
/* Mobile first */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 88vh;
}
.container h3 {
  font-size: 3em;
  padding-bottom: 25px;
  color: var(--primary-color);
}
.container form {
  display: flex;
  flex-direction: column;
}
.container form label,
input,
button {
  font-size: 1.4em;
  color: var(--primary-color);
}
.container form input {
  margin-bottom: 10px;
  border: 1px solid var(--primary-color);
}
.container form input:focus {
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
  padding-top: 35px;
  font-size: 1.3em;
}
.errorBorder {
  color: red;
}
</style>
