<template>
  <nav>
      <router-link to="/sign-in">Sign in</router-link>
      <router-link to="/sign-up">Sign up</router-link>
      <router-link to="/profile">Profile</router-link>
  </nav>
  <div class="container">
    <div class="columns">
      <div class="column col-4 col-mx-auto">
        <router-view/>
      </div>
    </div>
  </div>
</template>

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
