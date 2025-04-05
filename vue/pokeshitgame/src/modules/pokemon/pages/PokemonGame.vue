<template>
  <section 
    v-if="isLoading"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1>Wait please</h1>
    <h1>Loading pokeshit</h1>
  </section>
  <section
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1>who I am?</h1>

    <h3>{{ randomPokeshit }}</h3>
    <PokeshitImage/>
    <PokeshitOptions/>
  </section>
</template>

<script setup lang="ts">
  import PokeshitImage from '../components/PokeshitImage.vue';
  import PokeshitOptions from '../components/PokeshitOptions.vue';
  import { usePokeshitGame } from '../composables/usePokeshitGame';
    
    const {gameStatus, isLoading, theChosenOnes, randomPokeshit, getPokeshitOptions} = usePokeshitGame()
</script>