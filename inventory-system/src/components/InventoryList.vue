<template>
  <div class="inventory-container">
    <h1>Inventory</h1>
    
    <div v-if="loading" class="loading">Loading inventory data...</div>
    
    <div v-if="error" class="error">{{ error }}</div>
    
    <table v-if="!loading && !error" class="inventory-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Units</th>
          <th>Brand</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in inventory" :key="item.id">
          <td>{{ item.product_name }}</td>
          <td>${{ item.price.toFixed(2) }}</td>
          <td>{{ item.total_units }}</td>
          <td>{{ item.brand }}</td>
        </tr>
      </tbody>
    </table>
    
    <div class="actions">
      <router-link to="/inventory" class="edit-button">Edit Inventory</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const inventory = ref([])
const loading = ref(true)
const error = ref(null)

const fetchInventory = async () => {
  try {
    loading.value = true
    const { data, error: supabaseError } = await supabase
      .from('inventory')
      .select('id, product_name, price, total_units, brand, created_at, updated_at')
    
    if (supabaseError) throw supabaseError
    inventory.value = data
  } catch (err) {
    error.value = err.message
    console.error('Error fetching inventory:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchInventory()
})
</script>

<style scoped>
.inventory-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
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

.actions {
  margin-top: 20px;
  text-align: right;
}

.edit-button {
  padding: 8px 16px;
  background-color: #838079;
  color: #FFFFFF;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: 500;
  display: inline-block;
}

.edit-button:hover {
  background-color: #626060;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.inventory-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.inventory-table th, .inventory-table td {
  border: 1px solid #D1D1D1;
  padding: 12px;
  text-align: left;
}

.inventory-table th {
  background-color: #3F3B3B;
  color: #E8E8E8;
  font-weight: 500;
  letter-spacing: 0.5px;
  position: sticky;
  top: 0;
}

.inventory-table tr {
  background-color: #FFFFFF;
  transition: background-color 0.3s ease;
}

.inventory-table tr:nth-child(even) {
  background-color: #F5F5F5;
}

.inventory-table tr:hover {
  background-color: #E8E8E8;
}

.inventory-table td:nth-child(2) {
  font-family: monospace;
  font-weight: 600;
  color: #1A1A1A;
}

.loading {
  padding: 20px;
  text-align: center;
  font-style: italic;
  color: #626060;
  background-color: #F5F5F5;
  border-radius: 4px;
  margin: 20px 0;
}

.error {
  padding: 20px;
  text-align: center;
  color: #FFFFFF;
  background-color: #3F3B3B;
  font-weight: bold;
  border-radius: 4px;
  margin: 20px 0;
}

@media (max-width: 768px) {
  .inventory-container {
    padding: 15px;
  }
  
  .inventory-table {
    font-size: 0.85rem;
  }
  
  .inventory-table th, 
  .inventory-table td {
    padding: 8px;
  }
  
  .edit-button {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
}
</style>