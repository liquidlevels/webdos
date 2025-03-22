<script setup lang="ts">
  import axios from 'axios'
  import {ref} from 'vue'
  import type {MinecraftAPI} from '../interfaces/minecraftApi'

  const items = ref([])
  const getData = async () => {
    try {
      const data = await axios.get('https://minecraft-api.vercel.app/api/items')
      const minecraftApi:MinecraftAPI = data.data
      console.log(minecraftApi)
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
    <li v-for="item in items">{{ item }}</li>
  </ul>
</template>