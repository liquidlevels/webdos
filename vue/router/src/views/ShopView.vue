<script setup>
  import axios from 'axios'
  import {ref} from 'vue'

  const items = ref([])
  const getData = async () => {
    try {
      const data = await axios.get('https://minecraft-api.vercel.app/api/items')
      console.log(data)
      items.value = data.data
    } catch (error) {
      console.error(error)
    }
  }

  getData()
</script>

<template>
  <h1>welcome to the minecraft shop</h1>
  <!-- {{ items }} -->

  <ul>
    <li v-for="item in items">{{ item.name }}</li>
  </ul>
</template>