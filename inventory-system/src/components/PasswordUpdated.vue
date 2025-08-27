<template>
  <div class="password-updated">
    <h1>Password Updated Successfully!</h1>
    <p>Your password has been changed. You can now log in with your new password.</p>
    <button @click="goToLoginForm">Go to Login</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goToLoginForm = async () => {
  try {
    router.push('/login') 
  } catch (error) {
    console.error('Error redirecting to /login:', error.message)
  }
}
</script>

<style scoped>
.password-updated {
  max-width: 500px;
  margin: 3rem auto;
  padding: 2.5rem;
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

p {
  color: #3F3B3B;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

button {
  padding: 0.75rem 1.5rem;
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

.password-updated::before {
  content: "✓";
  display: block;
  font-size: 3rem;
  color: #838079;
  margin-bottom: 1.5rem;
}

@media (max-width: 600px) {
  .password-updated {
    padding: 1.5rem;
    margin: 2rem auto;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  p {
    font-size: 1rem;
  }
  
  button {
    padding: 0.75rem 1.25rem;
  }
}
</style>