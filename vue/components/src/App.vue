<script setup>
import AnimalsPost from './components/AnimalsPost.vue';
import BlogPost from './components/BlogPost.vue';
import ConterButton from './components/ConterButton.vue';

import { computed, onMounted, ref } from 'vue';
import MinecraftAPI from './components/MinecraftAPI.vue';
import PaginacionPost from './components/PaginacionPost.vue';
import Loading from './components/Loading.vue';

// const posts = ref([
//   { title: "Post netherite", id: 1, text: "Netherite is a material from the Nether, used primarily to upgrade diamond gear." },
//   { title: "Post coal", id: 2, text: "Coal is a mineral item mainly obtained from coal ore. It is primarily used for crafting torches and campfires, as well as fuel." },
//   { title: "Post iron axe", id: 3, text: "An axe is used to break logs, blocks derived from wood and some other blocks" },
//   { title: "Post dragon egg", id: 4, text: "The dragon egg is a decorative block or a trophy item, and is the rarest item obtainable in the game, as it generates only once" },
//   { title: "nothing", id: 5 },
// ]);

const animals = ref([
  {name: "Pig", image: "./Pig_JE3_BE2.png", description: "A pig is a passive mob found commonly in most grass biomes."},
  {name: "Bee", image: "./Bee.png", description: "Bees are flying neutral mobs that live in bee nests and beehives. Bees pollinate flowers and, when they do, add honey to their home when they return to it."},
  {name: "Cow", image: "./Cold_Cow.png", description: "A cow is a passive mob and a source of leather, beef and milk. There are three different variants that spawn depending on the biome that the Cow spawns in."}
])

const favoriteTitle = ref("")
const favoriteText = ref("")

const favoritePost = (title) => {
  favoriteTitle.value = title
}

const favoriteContent = (text) => {
  favoriteText.value = text
}

const changeFavorite = (title, text) => {
  favoriteTitle.value = title
  favoriteText.value = text
}

const animalName = ref("")

const useAnimalName = (name) => {
  animalName.value = name
}

const posts = ref([])
const postPerPage = 5
const start = ref(0)
const end = ref(postPerPage)
const totalPosts = computed(() => posts.length)
const loadingPage = ref(false)

const next = () => {
  start.value = start.value + postPerPage
  end.value = end.value + postPerPage
}

const back = () => {
  start.value == 0 ? console.log("no") : start.value = start.value - postPerPage
  end.value = end.value - postPerPage
}

// fetch("https://minecraft-api.vercel.app/api/items")
// .then((response) => response.json())
// .then((data) => {
//   posts.value = data
// })
// .finally(() => {
//   setTimeout(() => {
//     loadingPage.value = false
//   }, 2000)
// })
// .catch((err) => console.error(err)); 

onMounted(async() => {
  loadingPage.value = true
  try {
    const response = await fetch("https://minecraft-api.vercel.app/api/items")
    posts.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    setTimeout(() => {
      loadingPage.value = false
    }, 2000)
  }
})

</script>

<template>

  <Loading v-if="loadingPage"/>

  <div class="container" v-else>
    <PaginacionPost
      :start="start"
      :end="end"
      :disableNext="end >= posts.length"
      :disableBack="start <= 0"
      @next="next"
      @back="back"
    />
    <h2>Favorite Item {{ favoriteTitle }}</h2>
    <p>Content: {{ favoriteText }}</p>

    <BlogPost
      v-for="post in posts.slice(start, end)"
      :key="post.id"
      :id="post.id"
      :title="post.name"
      :text="post.description"
      :changeFavorite="changeFavorite"
    />
  </div>

</template>

<style scoped>
  h1{
    align-self: center;
  }
  h4{
    align-self: center;
  }
</style>