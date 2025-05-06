<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p v-if="user">Welcome master {{ user.mail }}</p>
    <button @click="handleSignOut">Sign out</button>
  </div>
</template>

<script setup lang="js">
  import {useAuth} from '../composables/useAuth'
  import {useRouter} from 'vue-router'

  const router = useRouter()
  const {user, signOut} = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
</script>