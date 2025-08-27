<template>
  <div class="clients-container">
    <h1>Clients</h1>
    
    <div v-if="loading" class="loading">Loading clients data...</div>
    
    <div v-if="error" class="error">{{ error }}</div>
    
    <table v-if="!loading && !error" class="clients-table">
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Location</th>
          <th>Contact Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in clients" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.location }}</td>
          <td>{{ item.contact_email }}</td>
        </tr>
      </tbody>
    </table>
    
    <div class="actions">
      <router-link to="/clients" class="edit-button">Edit Clients</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const clients = ref([])
const loading = ref(true)
const error = ref(null)

const fetchClients = async () => {
  try {
    loading.value = true
    const { data, error: supabaseError } = await supabase
      .from('clients')
      .select('id, name, location, contact_email, created_at, updated_at')
    
    if (supabaseError) throw supabaseError
    clients.value = data
  } catch (err) {
    error.value = err.message
    console.error('Error fetching clients:', err)
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
  max-width: 1000px;
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
  position: sticky;
  top: 0;
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
  .clients-container {
    padding: 15px;
  }
  
  .clients-table {
    font-size: 0.85rem;
  }
  
  .clients-table th, 
  .clients-table td {
    padding: 8px;
  }
  
  .edit-button {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
}
</style>