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

<!-- <script setup>
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
</template> -->

<!--
<script setup>
  const handleClick = (message) => {console.log(message)}

</script>

<template>
  <h2>v-on??</h2>
  params
  <button v-on:click="handleClick('???')">ola</button>
  <button @click="handleClick('!!!')">dog water</button>
  click options
  <button v-on:click.left="handleClick('left')">left button</button>
  <button v-on:click.right="handleClick('right')">right button</button>
  <button @click.middle="handleClick('middle')">middle button</button>
  specific click options
  <button @click.left.prevent="handleClick('prevent left')">left button</button>
</template>
-->

<!-- <script setup>
  import {ref, resolveDirective} from 'vue'
  const num = ref(0)
  const red = "color: red;"
  const green = "color: green;"
  const black = "color: black;"
  const colors = ["red", "green", "black"]
  const conter = () => {num.value++}
  const deconter = () => {num.value--}
  const reset = () => {num.value=0}
</script>

<template>
  <button @click="conter">conter</button>
  <button @click="deconter">deconter</button>
  <button @click="reset">deconter</button>
  <h2 v-if="num > 0" v-bind:style="green">{{ num }}</h2>
  <h2 v-else-if="num < 0" v-bind:style="red">{{ num }}</h2>
  <h2 v-else="num == 0" v-bind:style="black">{{ num }}</h2>
  <h2 :class="num > 0 ? 'positive' : num < 0 ? 'negative' : 'black'">{{ num }}</h2>
  <h2 :style="`color: ${ num > 0 ? colors[1] : num < 0 ? colors[0] : colors[2] }`">{{ num }}</h2>

</template>

<style>
.black {color: black;}

.positive {color: green;}

.negative {color: red;}
</style> -->

<!-- <script setup>
import {computed, ref} from 'vue'


const numbar = ref(0)
const conter = () => {numbar.value++}
const deconter = () => {numbar.value--}
const reset = () => {numbar.value=0}

const conterClass = computed(()=>{
  if(numbar.value === 0) return 'ziro'
  if(numbar.value > 0) return 'positip'
  if(numbar.value < 0) return 'negatip'

})

</script>

<template>
  <h2 :class="conterClass"> {{ numbar }}</h2>
  <button @click="conter">conter</button>
  <button @click="deconter">deconter</button>
  <button @click="reset">resetme</button>
</template>

<style>
.ziro {color: black;}
.positip {color: green;}
.negatip {color: red;}
</style> -->

<!-- excercise two -->
<script setup>
import { computed, ref } from 'vue'

  const list = ref([])
  const numbar = ref(0)
  const conter = () => {numbar.value++}
  const deconter = () => {numbar.value--}
  const reset = () => {numbar.value=0}
  
  const addNumbar = () => {list.value.push(numbar.value)}

  const noRepeatedNumbars = computed(()=>{
    const found = list.value.find((num) => num === numbar.value)
    if (found === 0) return true
    return found ? true : false    
  })
</script>
<template>
  <h2> {{ numbar }}</h2>
  <button @click="conter">conter</button>
  <button @click="deconter">deconter</button>
  <button @click="reset">resetme</button>
  <button @click="addNumbar" :disabled="noRepeatedNumbars">add</button>
  <div>
    <h2>List of numbars</h2>
    <ul style="color: purple;">
      <template v-for="(num, index) in list">
        <li>{{ num }}</li>
      </template>
    </ul>
    <!-- another way to show the array -->
    <ol>
      <li v-for="(num) in list":key="num">{{ num }}</li>
    </ol>
  </div>
</template>
<style></style>