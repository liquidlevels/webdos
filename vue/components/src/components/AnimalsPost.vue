<script setup>
    defineProps({
        name: String,
        description: {
            text: String,
            default: '???'
        },
        useName: Function,
        image: String
    })

    defineEmits('useName')
</script>

<template>
    <div class="card">
        <div class="card-body">
            <img :src="image" alt="animal" width="200" height="150">
            <h5 class="card-title">{{ name }}</h5>
            <p>{{ description }}</p>
            <button @click="useName(name)">Use</button>
        </div>
    </div>
</template>

<style scoped>
    .card{
        margin-top: 5px;
        margin-right: 15%;
        margin-left: 15%;
    }
</style>