<template>
  <form @submit.prevent="usualSignIn">
    <div class="form-group">
      <label class="form-label" for="input-example-1">Email</label>
      <input v-model="email" class="form-input" type="email" id="input-example-1" placeholder="email" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="input-example-2">Password</label>
      <input v-model="password" class="form-input" type="password" id="input-example-2" placeholder="password" required>
    </div>
    <button class="btn btn-primary mb-2">Sign in usually</button>
  </form>
  <button class="btn btn-primary" @click="handleClickSignIn">Sign in via Google</button>
</template>

<script>
import { ref } from "vue";
import router from '@/router'
import { usersService } from '@/services/users'

export default {
  name: "SignIn",
  methods: {
    async handleClickSignIn(){
      let access_token = ''
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        if (process.env.NODE_ENV === 'development') {
          access_token = googleUser.xc.access_token
        } else {
          access_token = googleUser.zc.access_token
        }
        await usersService.googleSignIn({access_token})
        router.replace({ path: '/profile' })
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    }
  },
  setup() {
    const email = ref('')
    const password = ref('')

    async function usualSignIn() {
      const payload = {
        email: email.value,
        password: password.value
      }
      await usersService.signIn(payload)
      router.replace({ path: '/profile' })
    }

    return {
      usualSignIn,
      email,
      password,
    };
  },
};
</script>
