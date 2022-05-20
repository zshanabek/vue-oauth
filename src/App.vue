<template>
  <nav>
    <router-link v-if="!token" to="/sign-in">Sign in</router-link>
    <router-link v-if="!token" to="/sign-up">Sign up</router-link>
    <router-link v-if="token" to="/profile">Profile</router-link>
    <a v-if="token" @click="logout"> Logout </a>
  </nav>
  <div class="container">
    <div class="columns">
      <div class="column col-4 col-mx-auto">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router"

export default {
  name: "SignUp",
  data(){
    return {
      token: '',
    }
  },
  mounted() {
    this.isAuthenticated()
  },
  methods: {
    isAuthenticated() {
      this.token = localStorage.getItem('access_token')
    },
    logout() {
      localStorage.removeItem('access_token')
      this.token = ''
      router.replace({ path: '/sign-in' })
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

