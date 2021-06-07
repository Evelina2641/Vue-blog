<template>
  <div id="app" >
    <header id="nav">
      <div class="wrapper">
        <div class="logo" @click="homePage">EVA'S BLOG</div>
        <div class="mobile_burger" @click="displayMenu">
          <font-awesome-icon icon="bars" />
        </div>
      </div>
      <div class="nav_items" :class="{ hidden: showMenu } " @hide-menu="showMenu">
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/login">Registration</router-link>
      </div>
    </header>
    <router-view />
    <footer>
      All rights reserved
    </footer>

  </div>
  
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      showMenu: true,
    };
  },
  methods: {
    displayMenu() {
      this.showMenu = !this.showMenu;
    },
    homePage() {
      this.$router.push(`/`)
    }
  }
};
</script>
<style >
/* Mobile first */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: monospace;
}
:root {
  --primary-color: #00539CFF;
  --secondary-color: #EEA47FFF;
}
#nav {
  background: var(--secondary-color);
}
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
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
  font-size: 1.2em;
  
}
.nav_items > a {
    text-decoration: none;
}
.hidden {
  display: none;
}
footer {
  height: 10%;
}
</style>
