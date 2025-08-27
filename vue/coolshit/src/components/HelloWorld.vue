<script setup lang="ts">
import {useCounterStore} from '@/stores/counter'

const useCounter = useCounterStore()
</script>

<template>
  <h1>Conter: {{ useCounter.count }}</h1>
  <button @click="useCounter.increment">tocame y crezco</button>
  <button @click="useCounter.count=0">ya no mas</button>
  <h2>{{ useCounter.double }}</h2>
</template>

<style scoped></style>