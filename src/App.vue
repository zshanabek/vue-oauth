<template>
  <div class="container">
    <nav-bar/>
    <div class="columns">
      <div class="column col-4 col-mx-auto">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar'
</script>
