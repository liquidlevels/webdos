<script setup>
import AnimalsPost from './components/AnimalsPost.vue';
import BlogPost from './components/BlogPost.vue';
import ConterButton from './components/ConterButton.vue';

import { computed, ref } from 'vue';
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
const loadingPage = ref(true)

const next = () => {
  start.value = start.value + postPerPage
  end.value = end.value + postPerPage
}

const back = () => {
  start.value == 0 ? console.log("no") : start.value = start.value - postPerPage
  end.value = end.value - postPerPage
}

fetch("https://minecraft-api.vercel.app/api/items")
.then((response) => response.json())
.then((data) => {
  posts.value = data
})
.finally(() => loadingPage.value = false)
.catch((err) => console.error(err)); 

</script>

<template>

  <!-- <button @click="next" :disabled="end >= posts.length">Next</button> -->
  <!-- <button @click="back" :disabled="start <= 0">Back</button> -->

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

  <!-- <h1>Welcome to the zoo</h1>
  <h4>bros name: {{ animalName }}</h4>

  <AnimalsPost
    v-for="animal in animals"
    :key="animal.name"
    :name="animal.name"
    :image="animal.image"
    :description="animal.description"
    :useName="useAnimalName"
  /> -->

  <!-- <MinecraftAPI/> -->
</template>

<style scoped>
  h1{
    align-self: center;
  }
  h4{
    align-self: center;
  }
</style>