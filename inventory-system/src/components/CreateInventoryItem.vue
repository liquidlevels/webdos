<template>
  <div class="create-form-container">
    <h1>Create New Inventory Item</h1>
    
    <form @submit.prevent="handleSubmit" class="inventory-form">
      <div class="form-group">
        <label for="product_name">Product Name:</label>
        <input 
          id="product_name" 
          v-model="formData.product_name" 
          type="text" 
          required 
        />
      </div>
      
      <div class="form-group">
        <label for="price">Price:</label>
        <input 
          id="price" 
          v-model="formData.price" 
          type="number" 
          step="0.01" 
          min="0" 
          required 
        />
      </div>
      
      <div class="form-group">
        <label for="total_units">Units:</label>
        <input 
          id="total_units" 
          v-model="formData.total_units" 
          type="number" 
          min="0" 
          required 
        />
      </div>
      
      <div class="form-group">
        <label for="brand">Brand:</label>
        <input 
          id="brand" 
          v-model="formData.brand" 
          type="text" 
          required 
        />
      </div>
      
      <div class="form-actions">
        <button type="submit" class="submit-button" :disabled="loading">
          {{ loading ? 'Creating...' : 'Create Item' }}
        </button>
        <router-link to="/inventory" class="cancel-button">
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
  product_name: '',
  price: 0,
  total_units: 0,
  brand: ''
})

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = null
    
    const { data, error: supabaseError } = await supabase
      .from('inventory')
      .insert([{
        product_name: formData.value.product_name,
        price: parseFloat(formData.value.price),
        total_units: parseInt(formData.value.total_units),
        brand: formData.value.brand
      }])
      .select()
    
    if (supabaseError) throw supabaseError
    
    if (data && data.length > 0) {
      router.push('/inventory')
    }
  } catch (err) {
    error.value = err.message
    console.error('Error creating item:', err)
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

.inventory-form {
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

.form-group input[type="number"] {
  font-family: monospace;
  font-weight: 500;
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
  
  .inventory-form {
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

<!-- <style scoped>
.create-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.inventory-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.submit-button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #45a049;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.cancel-button {
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #da190b;
}

.error-message {
  margin-top: 15px;
  padding: 10px;
  background-color: #ffebee;
  color: #f44336;
  border-radius: 4px;
}
</style> -->