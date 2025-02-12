<script setup>
import { ref } from 'vue';


const conter = ref(0)

const add = () => {
    conter.value++
}

</script>

<template>
    <h1>ola?</h1>
    <button @click="add">{{ conter }}</button>
</template>