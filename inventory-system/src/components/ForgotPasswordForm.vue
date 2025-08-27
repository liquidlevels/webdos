<template>
  <div class="forgot-password">
    <h1>Forgot Password</h1>
    <form @submit.prevent="handleForgotPassword">
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Sending...' : 'Send Reset Link' }}
      </button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">
      Password reset link sent! Check your email.
    </p>
    <router-link to="/login">Back to Login</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)
const router = useRouter()

const handleForgotPassword = async () => {
  loading.value = true
  error.value = ''
  try {
    const { error: sbError } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: 'http://localhost:5173/changepassword',
    })
    if (sbError) throw sbError
    success.value = true
  } catch (err) {
    error.value = err.message || 'Failed to send reset link.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.forgot-password {
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
}

button:hover {
  background-color: #1A1A1A;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:disabled {
  background-color: #959693;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.error {
  color: #FFFFFF;
  background-color: #3F3B3B;
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1.5rem 0;
  font-weight: 500;
}

.success {
  color: #FFFFFF;
  background-color: #838079;
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1.5rem 0;
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

@media (max-width: 480px) {
  .forgot-password {
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