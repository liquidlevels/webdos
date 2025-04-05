import { computed, onMounted, ref } from "vue"
import { GameStatus, type Pokeshit } from "../interfaces"
import { pokeshitApi } from "../api/pokeshitAPI"
import type { PokeshitListResponse } from "../interfaces/pokeshit-list.response"

export const usePokeshitGame = () => {
  
  const gameStatus = ref<GameStatus>(GameStatus.Playing)  
  const pokeshits = ref<Pokeshit[]>([])
  const isLoading = computed(() => pokeshits.value.length === 0)
  const theChosenOnes = ref<Pokeshit[]>([])
  //a pokeshit from theChosenOnes
  const randomPokeshit = computed(() => theChosenOnes.value[Math.floor(Math.random() * theChosenOnes.value.length)])

  const getPokeshits = async () => {
    const response = await pokeshitApi.get<PokeshitListResponse>('/?limit=200')
    
    const pokeshitArray = response.data.results.map(
      (pokeshit) => {
        const urlParts = pokeshit.url.split('/')
        const id = urlParts[urlParts.length - 2] ?? 0
      return {
        name: pokeshit.name,
        id: +id
      }
    })

    return pokeshitArray.sort(() => Math.random() - 0.5)
  }

  const getPokeshitOptions = (howMany:number = 4) => {
    gameStatus.value = GameStatus.Playing
    theChosenOnes.value = pokeshits.value.slice(0, howMany)
    pokeshits.value = pokeshits.value.slice(howMany) 
  }

  onMounted(async () => {
    pokeshits.value = await getPokeshits()
    getPokeshitOptions()
    console.log(theChosenOnes.value)
  })

  return {
    //variables
    gameStatus, 
    isLoading, 
    theChosenOnes,
    randomPokeshit,
    
    //methods
    getPokeshitOptions,
  }
}