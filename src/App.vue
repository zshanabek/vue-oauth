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
import { ref, onMounted } from "vue";

export default {
  name: "SignUp",
  setup() {
    let token = ref('')
    
    onMounted(()=> {
      isAuthenticated()
    })
  
    function isAuthenticated() {
      token.value = localStorage.getItem('access_token')
    }
    
    function logout() {
      localStorage.removeItem('access_token')
      token.value = null
      router.replace({ path: '/sign-in' })
    }

    return {
      token,
      logout,
      isAuthenticated
    }  
  }
}
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

