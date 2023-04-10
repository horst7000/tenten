<template>
  <h1>Trading</h1>
  <div class="flex five" v-for="i in 23" >
    <p class="three-fifth">Ressource {{ i }}</p>
    <div class="two-fifth flex three">
      <button :disabled="Math.random()<0.5" v-if="selected"></button>
      <p>{{ Math.floor(30*Math.random()) }}</p>
      <button :disabled="Math.random()<0.5" v-if="selected"></button>      
    </div>

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
/* ---------------- watchers ---------------- */
</script>

<style scoped>
.flex>* {
  padding-bottom: 0;
}
button {
  background-color: var(--color-background-mute);
}
button:disabled {
  background-color: var(--color-background-soft);
}
</style>