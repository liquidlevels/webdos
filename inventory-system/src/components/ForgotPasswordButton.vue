<template>
  <button @click="goToChangePasswordForm" class="forgot-password-btn">
    Forgot Password?
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToChangePasswordForm = async () => {
  try {
    router.push('/forgotpassword')
    
  } catch (error) {
    console.error('Error handling password reset:', error.message)
  }
}
</script>

<style scoped>
.forgot-password-btn {
  width: 200px;
  padding: 0.75rem;
  background-color: transparent;
  color: #3F3B3B;
  border: 1px solid #D1D1D1;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.forgot-password-btn:hover {
  background-color: #F5F5F5;
  border-color: #838079;
  color: #1A1A1A;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}


@media (max-width: 480px) {
  .forgot-password-btn {
    width: 100%;
    padding: 0.65rem;
  }
}
</style>