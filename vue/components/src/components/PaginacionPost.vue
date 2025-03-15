<script setup>

defineProps({
  start: Number,
  end: Number,
  disableNext: Boolean,
  disableBack: Boolean,
})

const emit = defineEmits('back', 'next')

</script>

<template>
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-outlined" @click="emit('back')" :disabled="disableBack">Back {{ start }}</button>
    <button type="button" class="btn btn-outlined" @click="emit('next')" :disabled="disableNext">Next {{ end }}</button>
  </div>
</template>