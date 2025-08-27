import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  //variables
  state: () => ({
    count: 0
  }),
  //like methods
  actions: {
    increment() {
      this.count ++
    }
  },
  getters: {
    double: (state) => state.count * 2
  } 
})
