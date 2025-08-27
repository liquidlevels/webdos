<template>
  <button 
    class="sign-out-button"
    v-if="hasSession"
    @click="handleSignOut"
  >
    Sign Out
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()
const hasSession = ref(false)

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  hasSession.value = !!session

  supabase.auth.onAuthStateChange((event, session) => {
    hasSession.value = !!session
  })
})

const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/login')
  } catch (error) {
    console.error('Error signing out:', error.message)
  }
}
</script>