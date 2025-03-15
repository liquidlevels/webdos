<script setup>
    // const props = defineProps(["title", "text", "id", "titleColor"])
    defineProps({
        title: String,
        id: Number,
        text: {
            content: String,
            default: '???'
        },
        changeFavorite: Function
    })

    const emit = defineEmits('changeFavorite')
</script>

<template>
    <div class="card">
        <div class="card-body">
            <!-- <h5 class="card-title" :class="`text-${titleColor}`">{{ title }} no. {{ id }}</h5> -->
             <h5 class="card-title">{{ title }} {{ id }}</h5>
            <p>{{ text }}</p>
            <button @click="changeFavorite(title, text)">Favoriteeee</button>
        </div>
    </div>
</template>