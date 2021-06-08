<template>
  <div class="container">
    <h3>Registration form</h3>
    <form @submit.prevent="registration">
      <label for="username">Username</label>
      <input type="text" v-model="userData.username" />
      <label for="password">Password</label>
      <input type="password" v-model="userData.password" />
      <label for="password">Confirm password</label>
      <input type="password" v-model="userData.secondPassword" />
      <button type="submit">Login</button>
    </form>
    <p class="error_message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "RegistrationComponent",
  data() {
    return {
      userData: {
        username: "",
        password: "",
        secondPassword: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    registration() {
      fetch(`http://167.99.138.67:1111/createaccount`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: this.userData.username,
          passwordOne: this.userData.password,
          passwordTwo: this.userData.secondPassword,
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
            this.errorMessage = json.message;
          }
          if (json.success === true) {
            this.$router.push("/login");
          }
        });
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
/* Tablet */
@media screen and (min-width: 678px) {
  .container h3 {
    font-size: 3.1em;
    padding-bottom: 28px;
  }
  .container form label,
  input,
  button {
    font-size: 1.7em;
  }
  .container form input {
    margin-bottom: 18px;
    padding: 4px 18px;
  }
  .container button {
    padding: 6px;
  }
  .container .error_message {
    font-size: 1.5em;
  }
}

/* Desktop */
@media screen and (min-width: 1280px) {
  .container {
    max-width: 1300px;
    margin: 0 auto;
  }
}
</style>
