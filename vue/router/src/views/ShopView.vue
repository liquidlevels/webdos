<script setup lang="ts">
  import axios from 'axios'
  import {ref} from 'vue'
  import type {MinecraftAPI, Datum} from '../interfaces/minecraftApi'

  const items = ref<Datum[]>([])
  const getData = async () => {
    try {
      const response = await axios.get('https://minecraft-api.vercel.app/api/items')
      console.log(response.data)
      items.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  getData()
</script>

<template>
  <h1>welcome to the minecraft shop</h1><br>

  <ul>
    <li v-for="item in items">{{ item.name }}</li>
  </ul>
</template>