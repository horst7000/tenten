<template>
  <!-- fix chrome mobile bug when hiding top toolbar
    https://www.stevefenton.co.uk/blog/2022/12/mobile-position-sticky-issue/ -->
    <div style="position: fixed;"></div> 
    
    <div class="transporter">
    <div class="flex center">
      <h3 style="flex-grow: 0;">$ {{ player.money }}</h3>
    </div>
      <!-- <br style="height: 5rem;"/> -->
    <div class="flex" style="flex-wrap: nowrap;">
      <div style="flex-grow: 0;">
        <label class="stack">
          <input type="radio" name="source" checked>
          <span class="button toggle pseudo">Ship</span>
        </label>
        <label class="stack">
          <input type="radio" name="source">
          <span class="button toggle pseudo">Warehouse</span>
        </label>
      </div>

      <div class="flex">
        <span class="res-avail" style="color: #777;">$Ø:</span>
        <span v-for="r in transporter.resources" class="res-avail">
          <span class="label" :style="{background: `hsl(${15*r.index}, 60%, 50%)`}"></span>{{ Math.round(r.price) }}
          <!-- TODO show price instead of stock -->
        </span>
      </div>

    </div>
    <div class="flex center">
      <button class="move-btn" :disabled="transporter.isInSelectedCity" @click="moveToSelected">
        {{ transporter.isInSelectedCity ? "Is here" : "Move here ... ($ -100)" }}
      </button>
    </div>
  </div>
</template>

<script setup>
/* ---------------- props ------------------- */

import { ref, computed } from 'vue';
import { useCityStore } from '../stores/cities';
import { useTransporterStore } from '../stores/transporter';
import { usePlayerStore } from '../stores/player';

/* ---------------- data -------------------- */
const transporter = useTransporterStore();
const cities      = useCityStore();
const player      = usePlayerStore();

/* ---------------- refs -------------------- */
/* ---------------- computed ---------------- */
/* ---------------- functions --------------- */
function moveToSelected() {
  transporter.inCity = cities.selected;
  player.money -= 100;
}
/* ---------------- watchers ---------------- */
</script>

<style scoped>
.transporter {
  position: sticky;
  bottom: 0;
  margin: 0 var(--main-margin);
  border-top: 3px solid var(--color-border);
  border-bottom: none;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  background: black;
  box-shadow: inset 0 -1em 3em var(--color-background), 0.3em 0.3em 1em var(--color-border);
}
.move-btn {
  flex-grow: 0.7;
  padding: 0;
  background: var(--color-background-mute);
  color: var(--color--text);
}
.move-btn:disabled {
  background: var(--color-background-soft);
  color: #777;
}
.res-avail{
  background: var(--color-background);
  border-radius: 0.2em;
  height: 1.6em;
  margin-left: 0.6em;
  margin-bottom: 0.3em;
  flex-grow: 0;
}
.label {
  margin-left: 0;
}
</style>