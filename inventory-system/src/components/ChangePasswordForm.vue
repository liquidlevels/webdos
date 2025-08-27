<template>
  <div class="change-password">
    <h1>Change Password</h1>
    <form @submit.prevent="handleChangePassword">
      <input
        v-model="newPassword"
        type="password"
        placeholder="New Password (min. 8 characters)" 
        required
        @input="validatePassword"
      />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        required
      />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Updating...' : 'Update Password' }}
      </button>
    </form>
    <p v-if="error || passwordError" class="error">{{ error ? error : passwordError }}</p>
    <router-link to="/login">Back to Login</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

const newPassword = ref('')
const confirmPassword = ref('')
const passwordError = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()

const handleChangePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  loading.value = true
  error.value = ''
  try {
    const { error: sbError } = await supabase.auth.updateUser({
      password: newPassword.value,
    })
    if (sbError) throw sbError
    router.push('/passwordupdated')
  } catch (err) {
    error.value = err.message || 'Failed to update password.'
  } finally {
    loading.value = false
  }
}

const validatePassword = () => {
  if (newPassword.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters.'
  } else {
    passwordError.value = ''
  }
}

</script>

<style scoped>
.change-password {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #1A1A1A;
  margin-bottom: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid #A19F97;
  padding-bottom: 0.5rem;
  display: inline-block;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #D1D1D1;
  border-radius: 4px;
  background-color: #FFFFFF;
  color: #1A1A1A;
  transition: all 0.3s ease;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #838079;
  box-shadow: 0 0 0 2px rgba(129, 128, 121, 0.2);
}

input::placeholder {
  color: #959693;
  opacity: 1;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #3F3B3B;
  color: #E8E8E8;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

button:hover:not(:disabled) {
  background-color: #1A1A1A;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:disabled {
  background-color: #959693;
  cursor: not-allowed;
  opacity: 0.8;
}

.error {
  color: #FFFFFF;
  background-color: #3F3B3B;
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1rem 0;
  font-weight: 500;
}

.router-link {
  display: inline-block;
  margin-top: 1rem;
  color: #3F3B3B;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.router-link:hover {
  color: #1A1A1A;
  text-decoration: underline;
}

.password-strength {
  margin-top: -1rem;
  font-size: 0.85rem;
  text-align: left;
  color: #626060;
}

@media (max-width: 480px) {
  .change-password {
    padding: 1.5rem;
    margin: 1.5rem auto;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  input,
  button {
    padding: 0.65rem;
  }
}
</style>