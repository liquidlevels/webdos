<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      
      <button class="submit-button" type="submit" :disabled="loading">
        {{ loading ? 'Loading...' : 'Login' }}
      </button>
      
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <ForgotPassword/>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { supabase } from '../lib/supabase'
  import { useRouter } from 'vue-router'
  import ForgotPassword from './ForgotPasswordButton.vue'

  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref('')

  const handleLogin = async () => {
    try {
      loading.value = true 
      error.value = ''

      const {data, error: loginError} = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })

      if(loginError) throw loginError
      router.push('/dashboard')
      
    } catch (error) {
      error.value = error.message
    } finally {
      loading.value = false
    }
  }
</script>

<style scoped>
.login-form {
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

.submit-button {
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
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: #1A1A1A;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-button:disabled {
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
  margin-top: 1.5rem;
  text-align: center;
  font-weight: 500;
}

.login-form > :last-child {
  margin-top: 1.5rem;
  text-align: center;
}

@media (max-width: 480px) {
  .login-form {
    padding: 1.5rem;
    margin: 1.5rem auto;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  input,
  .submit-button {
    padding: 0.65rem;
  }
}
</style>

<!-- <style scoped>
  .login-form {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .submit-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #ccc;
  }

  .error {
    color: red;
    margin-top: 1rem;
  }
</style> -->