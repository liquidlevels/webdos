<template>
  <div class="container">
    <h1>Minecraft Items</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else class="items-grid">
      <div v-for="item in items" :key="item.id" class="item">
        <img :src="item.image" :alt="item.name" />
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const items = ref([]);
    const loading = ref(true);
    const error = ref(null);

    onMounted(async () => {
      try {
        const response = await fetch('https://minecraft-api.vercel.app/api/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        items.value = await response.json();
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    });

    return { items, loading, error };
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  text-align: center;
  padding: 20px;
}

.items-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.item {
  width: calc(25% - 20px);
  background: #f4f4f4;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.item img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}
</style>