<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link v-if="!user" to="/login">Login</router-link> |
      <router-link v-if="!user" to="/register">Register</router-link> |
      <router-link v-if="user" to="/dashboard">Dashboard</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
  import {useAuth} from './composables/useAuth'
  const {user} = useAuth()
</script>