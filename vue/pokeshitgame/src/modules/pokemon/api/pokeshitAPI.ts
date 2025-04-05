import axios from "axios";

const pokeshitApi = axios.create({
  baseURL: 'http://pokeapi.co/api/v2/pokemon'
})

export {pokeshitApi};