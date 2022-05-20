<template>
  <form @submit.prevent="usualSignIn">
    <div class="form-group">
      <label class="form-label" for="input-example-1">Email</label>
      <input v-model="email" class="form-input" type="email" id="input-example-1" placeholder="email">
    </div>
    <div class="form-group">
      <label class="form-label" for="input-example-2">Password</label>
      <input v-model="password" class="form-input" type="password" id="input-example-2" placeholder="password">
    </div>
    <button class="btn btn-primary mb-2">Sign in usually</button>
  </form>
  <button class="btn btn-primary" @click="handleClickSignIn">Sign in via Google</button>
</template>

<script>
import { inject, ref, toRefs } from "vue";
import axios from 'axios'
import router from '@/router'

export default {
  name: "SignIn",
  methods: {
    async handleClickSignIn(){
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        const token = googleUser.xc.access_token
        axios.post('http://localhost:8000/dj-rest-auth/google/', {
          access_token: token
        })
          .then(resp => {
            localStorage.setItem('access_token', resp.data.access_token)
            router.replace({ path: '/profile' })
          })
          .catch(err => {
            console.log(err.response)
          })
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    }
  },
  setup(props) {
    const email = ref('')
    const password = ref('')
    const { isSignIn } = toRefs(props);
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    const handleClickLogin = () => {};

    function usualSignIn() {
      axios.post('http://localhost:8000/dj-rest-auth/login/', {
        email: email.value,
        password: password.value,
      }).then(res => {
        localStorage.setItem('access_token', res.data.access_token)
        router.replace({ path: '/profile' })
      })
    }

    return {
      usualSignIn,
      email,
      password,
      Vue3GoogleOauth,
      handleClickLogin,
      isSignIn,
    };
  },
};
</script>