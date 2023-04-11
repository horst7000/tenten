<template>
  <h1>Trading</h1>
  <div class="flex eight" v-for="i in 23" >
    <span class="name half">Ressource {{ i }}
      <span class="label" :style="{ backgroundColor: `hsl(${15*i}, 60%, 50%)`, margin: '0 1em 0 0.5em'}"></span></span>
    <span>{{ Math.random()<0.2 ? rand(30) : '' }}</span>
    <button :disabled="Math.random()<0.5" v-if="selected" class="left">{{ rand(30) }}</button>
    <button :disabled="Math.random()<0.5" v-if="selected" class="right">{{ rand(3000) }}</button>
    <span>{{ rand(30) }}</span>
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
  text-align: right;
}
.left {
  border-top-left-radius: 0.6em;
  border-bottom-left-radius: 0.6em;
}
.right {
  border-top-right-radius: 0.6em;
  border-bottom-right-radius: 0.6em;
}
span {
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
}
button {
  background-color: var(--color-background-mute);
  padding: 0;
  line-height: 1;
}
button:disabled {
  background-color: var(--color-background-soft);
  color: #777;
}
</style>