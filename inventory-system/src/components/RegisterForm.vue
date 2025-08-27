<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" required />
      </div>
      <p v-if="confirmPassword != password">
        Password does not match  
      </p>
      <button v-else type="submit" :disabled="loading">
        {{ loading ? 'Loading...' : "Register" }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

onMounted(() => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN') {
      router.push('/login')
    }
  })
})

const handleRegister = async () => {
  try {
    loading.value = true
    error.value = ''
    success.value = ''

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: `${window.location.origin}/login`
      }
    })

    if (signUpError) {
      throw signUpError
    }

    success.value = 'Please check your email for a confirmation link.'
    
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #1A1A1A;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
  border-bottom: 2px solid #A19F97;
  padding-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #3F3B3B;
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

.success {
  color: #FFFFFF;
  background-color: #838079;
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1rem 0;
  font-weight: 500;
}

p:not(.error, .success) {
  color: #3F3B3B;
  font-size: 0.9rem;
  margin: -1rem 0 1rem 0;
  text-align: center;
  font-style: italic;
}

@media (max-width: 480px) {
  .register-form {
    padding: 1.5rem;
    margin: 1.5rem auto;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  input,
  button {
    padding: 0.65rem;
  }
}
</style>