<template>
  <header>
    <div class="header-div">
      <nav class="nav-group" v-if="user && !isPasswordReset">
        <RouterLink class="filter-button" to="/">Home</RouterLink>
        <RouterLink class="filter-button" v-if="user" to="/dashboard">Dashboard</RouterLink>
        <RouterLink class="filter-button" v-if="user" to="/inventory">Inventory</RouterLink>
        <SignOutButton class="filter-button"/>
      </nav>
      <nav class="nav-group" v-else>
        <RouterLink class="filter-button" to="/">Home</RouterLink>
        <RouterLink class="filter-button" v-if="!user" to="/login">Login</RouterLink>
        <RouterLink class="filter-button" v-if="!user" to="/register">Register</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
  import { RouterLink, RouterView, useRoute } from 'vue-router'
  import {useAuth} from './composables/useAuth'
  import SignOutButton from './components/SignOutButton.vue';
  import { computed } from 'vue';

  const route = useRoute();
  
  const {user} = useAuth()
  const isPasswordReset = computed(() => route.path === '/changepassword' || route.path === '/passwordupdated')
</script>

<style scoped>
.header-div{
    display:flex;
    justify-content:end;
  }

.filter-button {
  margin: 10px 0 10px 0;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background-color: white;
  color: #4a5568;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 8px;
}

.filter-button.active {
  background-color: #edf2f7;
  border-color: #cbd5e0;
  color: #2d3748;
}

.filter-button:hover:not(.active) {
  background-color: #f7fafc;
}

.nav-group {
  display: flex;
  gap: 8px;
}
</style>