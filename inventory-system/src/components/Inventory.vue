<template>
  <div class="inventory-container">
    <h1>Inventory</h1>
    
    <div class="actions">
      <router-link to="/inventory/create" class="create-button">
        Create New Item
      </router-link>
    </div>
    
    <div v-if="loading" class="loading">Loading inventory data...</div>
    
    <div v-if="error" class="error">{{ error }}</div>
    
    <table v-if="!loading && !error" class="inventory-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Units</th>
          <th>Brand</th>
          <th>Created</th>
          <th>Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in inventory" :key="item.id">
          <td>{{ item.id }}</td>
          <td>
            <span v-if="!item.editing">{{ item.product_name }}</span>
            <input v-else v-model="item.editData.product_name" type="text" />
          </td>
          <td>
            <span v-if="!item.editing">${{ item.price.toFixed(2) }}</span>
            <input v-else v-model="item.editData.price" type="number" step="0.01" />
          </td>
          <td>
            <span v-if="!item.editing">{{ item.total_units }}</span>
            <input v-else v-model="item.editData.total_units" type="number" />
          </td>
          <td>
            <span v-if="!item.editing">{{ item.brand }}</span>
            <input v-else v-model="item.editData.brand" type="text" />
          </td>
          <td>{{ new Date(item.created_at).toLocaleDateString() }}</td>
          <td>{{ new Date(item.updated_at).toLocaleDateString() }}</td>
          <td class="actions-cell">
            <template v-if="!item.editing">
              <button @click="startEditing(item)" class="edit-button">Edit</button>
              <button @click="deleteItem(item.id)" class="delete-button">Delete</button>
            </template>
            <template v-else>
              <button @click="saveItem(item)" class="save-button">Save</button>
              <button @click="cancelEditing(item)" class="cancel-button">Cancel</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()
const inventory = ref([])
const loading = ref(true)
const error = ref(null)

const fetchInventory = async () => {
  try {
    loading.value = true
    const { data, error: supabaseError } = await supabase
      .from('inventory')
      .select('id, product_name, price, total_units, brand, created_at, updated_at')
      .order('created_at', { ascending: false })
    
    if (supabaseError) throw supabaseError
    
    inventory.value = data.map(item => ({
      ...item,
      editing: false,
      editData: {
        product_name: item.product_name,
        price: item.price,
        total_units: item.total_units,
        brand: item.brand
      }
    }))
  } catch (err) {
    error.value = err.message
    console.error('Error fetching inventory:', err)
  } finally {
    loading.value = false
  }
}

const startEditing = (item) => {
  item.editing = true
  item.editData = {
    product_name: item.product_name,
    price: item.price,
    total_units: item.total_units,
    brand: item.brand
  }
}

const cancelEditing = (item) => {
  item.editing = false
}

const saveItem = async (item) => {
  try {
    loading.value = true
    const { data, error: supabaseError } = await supabase
      .from('inventory')
      .update({
        product_name: item.editData.product_name,
        price: parseFloat(item.editData.price),
        total_units: parseInt(item.editData.total_units),
        brand: item.editData.brand,
        updated_at: new Date().toISOString()
      })
      .eq('id', item.id)
      .select()
    
    if (supabaseError) throw supabaseError
    
    if (data && data.length > 0) {
      const updatedItem = data[0]
      Object.assign(item, {
        ...updatedItem,
        editing: false,
        editData: {
          product_name: updatedItem.product_name,
          price: updatedItem.price,
          total_units: updatedItem.total_units,
          brand: updatedItem.brand
        }
      })
    }
  } catch (err) {
    error.value = err.message
    console.error('Error updating item:', err)
  } finally {
    loading.value = false
  }
}

const deleteItem = async (id) => {
  if (!confirm('Are you sure you want to delete this item?')) return
  
  try {
    loading.value = true
    const { error: supabaseError } = await supabase
      .from('inventory')
      .delete()
      .eq('id', id)
    
    if (supabaseError) throw supabaseError
    
    inventory.value = inventory.value.filter(item => item.id !== id)
  } catch (err) {
    error.value = err.message
    console.error('Error deleting item:', err)
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
  max-width: 1400px;
  margin: 0 auto;
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
  margin-bottom: 20px;
  text-align: right;
}

.create-button {
  padding: 8px 16px;
  background-color: #3F3B3B;
  color: #E8E8E8;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: 500;
  border: 1px solid #3F3B3B;
}

.create-button:hover {
  background-color: #E8E8E8;
  color: #3F3B3B;
}

.inventory-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
}

.inventory-table th, .inventory-table td {
  border: 1px solid #D1D1D1;
  padding: 10px;
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

.actions-cell {
  white-space: nowrap;
}

button {
  padding: 6px 12px;
  margin: 0 3px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.85rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.edit-button {
  background-color: #838079;
  color: #FFFFFF;
}

.edit-button:hover {
  background-color: #626060;
}

.delete-button {
  background-color: #A19F97;
  color: #1A1A1A;
}

.delete-button:hover {
  background-color: #959693;
  color: #FFFFFF;
}

.save-button {
  background-color: #3F3B3B;
  color: #E8E8E8;
}

.save-button:hover {
  background-color: #1A1A1A;
}

.cancel-button {
  background-color: #959693;
  color: #1A1A1A;
}

.cancel-button:hover {
  background-color: #626060;
  color: #FFFFFF;
}

input {
  padding: 6px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #D1D1D1;
  border-radius: 4px;
  background-color: #FFFFFF;
  color: #1A1A1A;
  font-size: 0.85rem;
}

input:focus {
  outline: none;
  border-color: #838079;
  box-shadow: 0 0 0 2px rgba(129, 128, 121, 0.2);
}

input[type="number"] {
  max-width: 80px;
}

.loading {
  padding: 20px;
  text-align: center;
  font-style: italic;
  color: #626060;
  background-color: #F5F5F5;
  border-radius: 4px;
  margin-top: 20px;
}

.error {
  padding: 20px;
  text-align: center;
  color: #FFFFFF;
  background-color: #3F3B3B;
  font-weight: bold;
  border-radius: 4px;
  margin-top: 20px;
}

td:nth-child(3) {
  font-family: monospace;
  font-weight: 600;
  color: #1A1A1A;
}

@media (max-width: 1200px) {
  .inventory-container {
    padding: 15px;
  }
  
  .inventory-table {
    font-size: 0.8rem;
  }
  
  .inventory-table th, 
  .inventory-table td {
    padding: 8px;
  }
}
</style>