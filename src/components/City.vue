<template>
  <div style="padding: 0 var(--main-padding); border: 2px solid var(--color-background-soft); border-top: none; border-bottom: none;" >
    <Trading :cid="props.cid"></Trading>
    <Production :cid="props.cid"></Production>
  </div>
</template>

<script setup>
import Production from './Production.vue';
import Trading from './Trading.vue';
/* ---------------- props ------------------- */
const props = defineProps({cid: String,})
/* ---------------- data -------------------- */
/* ---------------- refs -------------------- */
/* ---------------- computed ---------------- */
/* ---------------- functions --------------- */
/* ---------------- watchers ---------------- */
</script>

<style>
</style>