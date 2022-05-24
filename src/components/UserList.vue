<template>
  <ul>
    <li class="card" v-for="user in users" :key="user.id">
      <router-link :to="`/chat/${user.id}`">
        {{user.email}} - {{ user.get_full_name }}
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { usersService } from '@/services/users';

const users = ref([])

async function getUserList() {
  users.value = await usersService.getUserList()
}

onMounted(() => {
  getUserList()
});

</script>