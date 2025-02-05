<!-- <script setup>
  const value = "???"
  const othervalue = "no"
  const color = "color: red;"
  const colors = ["purple", "brown", "red", "orange", "yellow"]
  const yesorno = false
</script>

<template>
  <h1>goodbye world {{ value }}</h1>
  <h1 v-bind:style="color">{{ othervalue.toUpperCase() }}</h1>
  <h2 :style="`color: ${ colors[3] }`">olaaaaaaaaaa</h2>
  <h1>{{ colors }}</h1>
  <h2>{{ yesorno ? "sisi" : "no, feo" }}</h2>
  
  <h2 v-if="yesorno">u black my friend</h2>
  <h2 v-else="yesorno">u not black my friend thank god</h2>

</template>

<style>
  h1{
    color: #202020;
  }
</style> -->

<script setup>
  const blocks = [
    {
      id: 1,
      name: "Dirt",
      recipes: [
        {id: 1, title: "coarse dirt"},
      ]
    },
    {
      id: 2,
      name: "Cobblestone",
      recipes: [
        {id: 1, title: "stone sword"},
        {id: 2, title: "stone pickaxe"},
        {id: 3, title: "furnance"},
      ] 
    },
    {
      id: 2,
      name: "Diamondo",
      recipes: [
        {id: 1, title: "jukebox"},
        {id: 2, title: "enchanting table"},
        {id: 3, title: "diamond axe"},
      ] 
    }
  ]
</script>

<template>
  <div>
    <h2>List of items used in minecraft recipes</h2>
    <ul>
      <template v-for="(block, index) in blocks":key="block.id">
        <h2>{{ block.name }}</h2>
        <template v-for="(recipe, index) in block.recipes":key="recipe.id">
          <li>{{ recipe.id }} {{ recipe.title }}</li>
        </template>
      </template>
    </ul>
  </div>
</template>