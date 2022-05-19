<template>
  <form v-if="!user" @submit.prevent="signUp">
    <div class="form-group">
      <label class="form-label" for="input-example-1">Email</label>
      <input v-model="email" class="form-input" type="email" id="input-example-1" placeholder="email">
    </div>
    <div class="form-group">
      <label class="form-label" for="input-example-2">Password</label>
      <input v-model="password1" class="form-input" type="password" id="input-example-2" placeholder="password">
    </div>
    <div class="form-group">
      <label class="form-label" for="input-example-3">Repeat Password</label>
      <input v-model="password2" class="form-input" type="password" id="input-example-3" placeholder="repeat password">
    </div>
    <button class="btn btn-primary">Sign up</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  name: "SignUp",
  data(){
    return {
      email: '',
      password1: '',
      password2: '',
    }
  },
  methods: {
    signUp() {
      axios.post('http://localhost:8000/dj-rest-auth/registration/', {
        email: this.email,
        password1: this.password1,
        password2: this.password2,
      }).then(res => {
        localStorage.setItem('access_token', JSON.stringify(res.data.access_token))
      })
    },
  },
};
</script>
