<template>
  <form @submit.prevent="signUp">
    <div class="form-group">
      <label class="form-label" for="input-example-1">Email</label>
      <input v-model="email" class="form-input" type="email" id="input-example-1" placeholder="email" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="input-example-2">Password</label>
      <input v-model="password1" class="form-input" type="password" id="input-example-2" placeholder="password" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="input-example-3">Repeat Password</label>
      <input v-model="password2" class="form-input" type="password" id="input-example-3" placeholder="repeat password" required>
    </div>
    <button class="btn btn-primary">Sign up</button>
  </form>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'
import { usersService } from '@/services/users'

const email = ref('')
const password1 = ref('')
const password2 = ref('')

async function signUp() {
  const payload = {
    email: email.value,
    password1: password1.value,
    password2: password2.value
  }
  await usersService.signUp(payload)
  router.replace({ path: '/profile' })
}
</script>
