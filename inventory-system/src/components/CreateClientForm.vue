<template>
  <div class="create-form-container">
    <h1>Create New Client</h1>
    
    <form @submit.prevent="handleSubmit" class="client-form">
      <div class="form-group">
        <label for="name">Client Name:</label>
        <input 
          id="name" 
          v-model="formData.name" 
          type="text" 
          required 
        />
      </div>
      
      <div class="form-group">
        <label for="location">Location:</label>
        <input 
          id="location" 
          v-model="formData.location" 
          type="text" 
          required 
        />
      </div>
      
      <div class="form-group">
        <label for="contact_email">Contact Email:</label>
        <input 
          id="contact_email" 
          v-model="formData.contact_email" 
          type="email" 
          required 
        />
      </div>
      
      <div class="form-actions">
        <button type="submit" class="submit-button" :disabled="loading">
          {{ loading ? 'Creating...' : 'Create Client' }}
        </button>
        <router-link to="/clients" class="cancel-button">
          Cancel
        </router-link>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const error = ref(null)

const formData = ref({
  name: '',
  location: '',
  contact_email: ''
})

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = null
    
    const { data, error: supabaseError } = await supabase
      .from('clients')
      .insert([{
        name: formData.value.name,
        location: formData.value.location,
        contact_email: formData.value.contact_email
      }])
      .select()
    
    if (supabaseError) throw supabaseError
    
    if (data && data.length > 0) {
      router.push('/clients')
    }
  } catch (err) {
    error.value = err.message
    console.error('Error creating client:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.create-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #E8E8E8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #1A1A1A;
  margin-bottom: 20px;
  font-weight: 600;
  border-bottom: 2px solid #A19F97;
  padding-bottom: 10px;
}

.client-form {
  background-color: #FFFFFF;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #3F3B3B;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #D1D1D1;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #FFFFFF;
  color: #1A1A1A;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #838079;
  box-shadow: 0 0 0 2px rgba(129, 128, 121, 0.2);
}

.form-group input[type="email"] {
  font-family: inherit;
}

.form-actions {
  margin-top: 25px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.submit-button {
  padding: 10px 20px;
  background-color: #3F3B3B;
  color: #E8E8E8;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  min-width: 120px;
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

.cancel-button {
  padding: 10px 20px;
  background-color: #A19F97;
  color: #1A1A1A;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: 500;
  text-align: center;
  min-width: 120px;
}

.cancel-button:hover {
  background-color: #626060;
  color: #FFFFFF;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.error-message {
  margin-top: 20px;
  padding: 12px;
  background-color: #3F3B3B;
  color: #FFFFFF;
  border-radius: 4px;
  font-weight: 500;
}

@media (max-width: 640px) {
  .create-form-container {
    padding: 15px;
  }
  
  .client-form {
    padding: 20px;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .submit-button,
  .cancel-button {
    width: 100%;
  }
}
</style>