<template>
  <nav>
    <div v-if="usersService.user">
      <router-link to="/">Home</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/user-list">UserList</router-link>
      <a @click="logout()"> Logout </a>
    </div>
    <div v-else>
      <router-link to="/sign-in">Sign in</router-link>
      <router-link to="/sign-up">Sign up</router-link>
    </div>
  </nav>
</template>

<script setup>
import router from "@/router"
import { usersService } from '@/services/users'

async function logout() {
  await usersService.logout()
  router.replace({ path: '/sign-in' })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-left: 1em;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>