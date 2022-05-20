<template>
  <div v-if="showLoading">
    Loading...
  </div>
  <div v-else class="panel">
    <div class="panel-header text-center">
      <figure class="avatar avatar-lg">
        <img v-if="user.photo" :src="user.photo" alt="Avatar">
        <img v-else src="https://cdn.vuetifyjs.com/images/lists/1.jpg" alt="Avatar">
      </figure>
      <div class="panel-title h5 mt-10">
        {{ user.first_name }} {{ user.last_name }}
      </div>
      <div class="panel-subtitle">{{ user.username }}</div>
    </div>
    <nav class="panel-nav">
      <ul class="tab tab-block">
        <li class="tab-item active">
          <a>Profile</a>
        </li>
      </ul>
    </nav>
    <div class="panel-body">
      <div class="tile tile-centered">
        <div class="tile-content">
          <div class="tile-title">E-mail</div>
          <div class="tile-subtitle">{{ user.email }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
  name: 'UsersProfile',
  setup() {
    let user = ref({
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      photo: '',
    })
    let showLoading = ref(false)

    onMounted(() => {
      getProfile()
    })

    function getProfile() {
      showLoading.value = true
      const access_token = localStorage.getItem('access_token')
      if (!access_token) {
        this.$router.replace({ path: '/sign-in' })
        return
      }
      axios.get('http://localhost:8000/dj-rest-auth/user/', { headers: { Authorization:`Bearer ${access_token}`}})
        .then(res => {
          user.value = res.data
          showLoading.value = false
        })
        .catch(err => {
          console.log(err.response)
        })
    }
    return {
      user,
      showLoading,
      getProfile,
    }
  }
}
</script>
