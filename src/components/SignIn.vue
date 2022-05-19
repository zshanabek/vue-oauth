<template>
  <form v-if="!user" @submit.prevent="usualSignIn">
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
  <div v-if="!user">
    <button class="btn btn-primary" @click="handleClickSignIn">Sign in via Google</button>
  </div>
  <div v-else>
    <button class="btn btn-primary" @click="handleClickGetAuthCode" :disabled="!Vue3GoogleOauth.isInit">get authCode</button>
    <button class="btn btn-primary" @click="handleClickSignOut" :disabled="!Vue3GoogleOauth.isAuthorized">sign out</button>
    <button class="btn btn-primary" @click="handleClickDisconnect" :disabled="!Vue3GoogleOauth.isAuthorized">disconnect</button>
  </div>
</template>

<script>
import { inject, toRefs } from "vue";
import axios from 'axios'
import router from '@/router'

export default {
  name: "SignIn",
  components: {
  },
  props: {
    msg: String,
  },
  data(){
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    usualSignIn() {
      axios.post('http://localhost:8000/dj-rest-auth/login/', {
        email: this.email,
        password: this.password,
      }).then(res => {
        localStorage.setItem('access_token', res.data.access_token)
        router.replace({ path: '/profile' })
      })

    },
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
            this.user = resp.data.user
          })
          .catch(err => {
            console.log(err.response)
          })
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickGetAuthCode(){
      try {
        const authCode = await this.$gAuth.getAuthCode();
        console.log("authCode", authCode);
      } catch(error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
        this.user = "";
      } catch (error) {
        console.error(error);
      }
    },
    handleClickDisconnect() {
      window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
    },
  },
  setup(props) {
    const { isSignIn } = toRefs(props);
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    const handleClickLogin = () => {};
    return {
      Vue3GoogleOauth,
      handleClickLogin,
      isSignIn,
    };
  },
};
</script>