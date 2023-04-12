<template>
  <h1>Trading</h1>
  <div class="flex eight" v-for="i in ressources.length" >
    <span class="name half">Ressource {{ i }}
      <span class="label" :style="{ backgroundColor: `hsl(${15*i}, 60%, 50%)`, margin: '0 1em 0 0.5em'}"></span>
    </span>

    <span :style="{ color: transporter.isInCity ? 'var(--color-text)' : '#777' }">
      {{ transporter.ressources[i-1]||'' }}
    </span>
    <button :disabled="!isBuyable(i-1)" class="left" @click="() => buy(i-1)">
      {{ prices[i-1] }}
    </button>
    <button :disabled="!isSellable(i-1)" v-if="selected" class="right" @click="() => sell(i-1)">
      {{ Math.floor(prices[i-1] * 0.8) }}
    </button>
    <span :style="{ color: `hsl(0, ${(economy[i-1]+1)/(ressources[i-1]+1) > 1.5 ? 100 : 0 }%, 70%)` }">
      {{ ressources[i-1] }}
    </span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCityStore } from '../stores/cities';
import { useTransporterStore } from '../stores/transporter';

/* ---------------- props ------------------- */
const props = defineProps({cid: String,})

/* ---------------- data -------------------- */
const cities      = useCityStore();
const transporter = useTransporterStore();

/* ---------------- refs -------------------- */
const selected = ref(true);

/* ---------------- computed ---------------- */
const ressources = computed(() => cities.all[props.cid].ressources);
const economy    = computed(() => cities.all[props.cid].economy);
const prices     = computed(() => {  
  return ressources.value.map( (r, i) => {
    const basePrice = 50 + 20 * Math.pow(Math.floor(i/3),1.6);
    const need = Math.min(Math.max( Math.pow((economy.value[i]+1)/(ressources.value[i]+1), 0.6), 0.5), 3);
    return Math.round(basePrice * need);
  })
});

/* ---------------- functions --------------- */
function isBuyable(i) {
  return ressources.value[i] > 0 && transporter.isInCity;
}

function isSellable(i) {
  return transporter.ressources[i] > 0 && transporter.isInCity;
}

function buy(i) {
  ressources.value[i]--;
  transporter.ressources[i]++;
}

function sell(i) {
  ressources.value[i]++;  
  transporter.ressources[i]--;
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
  border-radius: 0.2em;
  border-top-left-radius: 0.6em;
  border-bottom-left-radius: 0.6em;
}
.right {
  border-radius: 0.2em;
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