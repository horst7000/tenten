<template>
  <h1>Trading</h1>
  <div class="flex nine" v-for="i in 23" >
    <span class="label warning" :style="{ backgroundColor: `hsl(${15*i}, 60%, 50%)`}"></span>
    <span>{{ Math.random()<0.2 ? rand(30) : '' }}</span>
    <span class="name two-fifth">Ressource {{ i }}</span>
    <button :disabled="Math.random()<0.5" v-if="selected" style="padding: 0; line-height: 1;">{{ rand(30) }}</button>
    <span>{{ rand(30) }}</span>
    <button :disabled="Math.random()<0.5" v-if="selected" style="padding: 0; line-height: 1;">{{ rand(30) }}</button>
  </div>
</template>

<script setup>
/* ---------------- props ------------------- */
/* ---------------- data -------------------- */

import { ref } from 'vue';

/* ---------------- refs -------------------- */
const selected = ref(true);
/* ---------------- computed ---------------- */
/* ---------------- functions --------------- */
function rand(max) {
  return Math.floor((max+1)*Math.random());
}
/* ---------------- watchers ---------------- */
</script>

<style scoped>
.flex>* {
  padding-bottom: 0;
  padding-left: 0;
}
.name {
  text-align: initial;
}
span {
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
}
button {
  background-color: var(--color-background-mute);
}
button:disabled {
  background-color: var(--color-background-soft);
  color: #777;
}
</style>