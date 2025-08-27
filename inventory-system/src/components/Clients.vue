<template>
  <div class="clients-container">
    <h1>Clients</h1>
    
    <div class="actions">
      <router-link to="/clients/create" class="create-button">
        Create New Client
      </router-link>
    </div>
    
    <div v-if="loading" class="loading">Loading clients data...</div>
    
    <div v-if="error" class="error">{{ error }}</div>
    
    <table v-if="!loading && !error" class="clients-table">
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Location</th>
          <th>Contact Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in clients" :key="item.id">
          <td>
            <span v-if="!item.editing">{{ item.name }}</span>
            <input v-else v-model="item.editData.name" type="text" />
          </td>
          <td>
            <span v-if="!item.editing">{{ item.location }}</span>
            <input v-else v-model="item.editData.location" type="text" />
          </td>
          <td>
            <span v-if="!item.editing">{{ item.contact_email }}</span>
            <input v-else v-model="item.editData.contact_email" type="email" />
          </td>
          <td class="actions-cell">
            <template v-if="!item.editing">
              <button @click="startEditing(item)" class="edit-button">Edit</button>
              <button @click="deleteClient(item.id)" class="delete-button">Delete</button>
            </template>
            <template v-else>
              <button @click="saveClient(item)" class="save-button">Save</button>
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
const clients = ref([])
const loading = ref(true)
const error = ref(null)

const fetchClients = async () => {
  try {
    loading.value = true
    const { data, error: supabaseError } = await supabase
      .from('clients')
      .select('id, name, location, contact_email, created_at, updated_at')
      .order('created_at', { ascending: false })
    
    if (supabaseError) throw supabaseError
    
    clients.value = data.map(item => ({
      ...item,
      editing: false,
      editData: {
        name: item.name,
        location: item.location,
        contact_email: item.contact_email
      }
    }))
  } catch (err) {
    error.value = err.message
    console.error('Error fetching clients:', err)
  } finally {
    loading.value = false
  }
}

const startEditing = (item) => {
  item.editing = true
  item.editData = {
    name: item.name,
    location: item.location,
    contact_email: item.contact_email
  }
}

const cancelEditing = (item) => {
  item.editing = false
}

const saveClient = async (item) => {
  try {
    loading.value = true
    const { data, error: supabaseError } = await supabase
      .from('clients')
      .update({
        name: item.editData.name,
        location: item.editData.location,
        contact_email: item.editData.contact_email,
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
          name: updatedItem.name,
          location: updatedItem.location,
          contact_email: updatedItem.contact_email
        }
      })
    }
  } catch (err) {
    error.value = err.message
    console.error('Error updating client:', err)
  } finally {
    loading.value = false
  }
}

const deleteClient = async (id) => {
  if (!confirm('Are you sure you want to delete this client?')) return
  
  try {
    loading.value = true
    const { error: supabaseError } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)
    
    if (supabaseError) throw supabaseError
    
    clients.value = clients.value.filter(client => client.id !== id)
  } catch (err) {
    error.value = err.message
    console.error('Error deleting client:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchClients()
})
</script>

<style scoped>
.clients-container {
  padding: 20px;
  max-width: 1200px;
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

.clients-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.clients-table th, .clients-table td {
  border: 1px solid #D1D1D1;
  padding: 12px;
  text-align: left;
}

.clients-table th {
  background-color: #3F3B3B;
  color: #E8E8E8;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.clients-table tr {
  background-color: #FFFFFF;
  transition: background-color 0.3s ease;
}

.clients-table tr:nth-child(even) {
  background-color: #F5F5F5;
}

.clients-table tr:hover {
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
}

input:focus {
  outline: none;
  border-color: #838079;
  box-shadow: 0 0 0 2px rgba(129, 128, 121, 0.2);
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
</style>