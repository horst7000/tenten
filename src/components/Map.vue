<template>
  <h1>Map</h1>
  <div class="map">
    <div
      class="city"
      :class="{ 'selected': c.id == cities.selected, 'transporter': c.id == transporter.inCity}"
      :style="{ left: c.position.x+'%', top: c.position.y+'%' }"
      @click="() => cities.checked = i"
      v-for="c,i in Object.values(cities.all)">
      <p class="name">{{ i+1 }}</p>
    </div>
  </div>
</template>

<script setup>
/* ---------------- props ------------------- */

import { useCityStore } from '../stores/cities';
import { useTransporterStore } from '../stores/transporter';

/* ---------------- data -------------------- */
const cities      = useCityStore();
const transporter = useTransporterStore();

/* ---------------- refs -------------------- */
/* ---------------- computed ---------------- */
/* ---------------- functions --------------- */
/* ---------------- watchers ---------------- */
</script>

<style scoped>
.map {
  height: 300px;
  background: var(--color-background-soft);
  border-radius: 20px;
}
.city {
  width: 2em;
  height: 2em;
  border: 4px solid var(--color-background);
  border-radius: 2em;
  position: absolute;
  cursor: pointer;
  transition: all 0.3s;
}
.name{
  text-align: center;
  color: rgba(235, 235, 235, 0.81);
}
.transporter {
  border-color: var(--color-background-mute);
  z-index: 999;
}
.selected {
  border-color: var(--color-heading);
  z-index: 999;
}
</style>