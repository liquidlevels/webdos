<script setup>
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
</style>