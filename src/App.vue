<template>
  <div id="app">
    <header id="nav">
      <div class="wrapper">
        <div class="logo" @click="homePage">EVA'S BLOG</div>
        <div
          class="mobile_burger"
          @click="displayMenu"
          :class="{ hideBar: true }"
        >
          <font-awesome-icon icon="bars" />
        </div>
      </div>
      <div class="nav_items" :class="{ hidden: hideMenu }">
        <router-link to="/">Home</router-link>
        <router-link to="/login" v-if="username === null">Login</router-link>
        <router-link to="/registration" v-if="username === null"
          >Registration</router-link
        >
        <!-- Navigation if you logged in -->
        <router-link to="" v-if="username !== null">
          <a @click="showProfile">Profile</a>
        </router-link>
        <router-link to="" v-if="username !== null">
          <a @click="logout">Logout</a>
        </router-link>
      </div>
    </header>
    <router-view />
    <footer>
      <p>&copy; All rights reserved</p>
    </footer>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      hideMenu: true,
      username: localStorage.getItem("username"),
    };
  },
  methods: {
    displayMenu() {
      this.hideMenu = !this.hideMenu;
    },
    homePage() {
      this.$router.push(`/`);
    },
    showProfile() {
      this.$router.push(`/user/${this.username}`);
    },
    logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("secretKey");
      this.$router.push("/");
      // Cia irgi nesugalvojau kaip padaryti kad ir navigacija pasikeistu pereinat i main puslapi po logout'o..
      window.location.reload();
    },
  },
  watch: {
    $route() {
      this.hideMenu = true;
    },
  },
};
</script>
<style>
/* Mobile first */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: monospace;
}
:root {
  --primary-color: #00539cff;
  --secondary-color: #eea47fff;
}
#nav {
  background: var(--secondary-color);
  padding: 10px 15px;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrapper .logo {
  color: var(--primary-color);
  font-size: 1.5em;
  cursor: pointer;
}
.mobile_burger {
  font-size: 1.7em;
  color: var(--primary-color);
}
.nav_items {
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 1.4em;
  margin-top: 5px;
}
.nav_items > a {
  text-decoration: none;
  padding-bottom: 5px;
  color: var(--primary-color);
  text-align: center;
  cursor: pointer;
}
.hidden {
  display: none;
}
footer {
  text-align: center;
  font-size: 1em;
  margin-bottom: 10px;
  opacity: 0.7;
}
/* Tablet */
@media screen and (min-width: 1280px) {
  .hideBar {
    display: none;
  }
  #nav {
    background: var(--secondary-color);
    padding: 10px 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .wrapper .logo {
    font-size: 1.7em;
  }
  .nav_items {
    display: flex;
    flex-direction: column;
    text-align: right;
    font-size: 1.5em;
    margin-top: 0;
  }
  .nav_items > a {
    padding-bottom: 5px;
    padding-left: 15px;
    padding-right: 5px;
  }
  .hidden {
    display: block;
  }
  footer {
    text-align: center;
    font-size: 1em;
    margin-bottom: 10px;
    opacity: 0.7;
  }
}
</style>
