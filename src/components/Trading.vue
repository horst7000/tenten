<template>
  <h1>Trading ◯</h1>
  <div class="flex eight resource" v-for="i in resources.length" :key="i" :class="{ 'space': (i) % 3 == 0 }">
    <span class="name half">{{ resourceNames[i-1] }}
      <span class="label" :style="{ backgroundColor: `hsl(${15*(i-1)}, 60%, 50%)`, margin: '0 1em 0 0.5em'}"></span>
    </span>

    <span :style="{ color: transporterIsHere ? 'var(--color-text)' : '#777' }">
      {{ transporter.resources[i-1] ? transporter.resources[i-1].count : '' }}
    </span>
    <button :disabled="!isBuyable(i-1)" class="left" @click="() => buy(i-1)">
      {{ buyPrices[i-1] }}
    </button>
    <button :disabled="!isSellable(i-1)" class="right" :class="{ 'hint': transporter.resources[i-1] }" @click="() => sell(i-1)">
      {{ sellPrices[i-1] }}
    </button>
    <span :style="{ color: `hsl(0, ${(economy[i-1]+1)/(resources[i-1]+1) > 1.5 ? 100 : 0 }%, 70%)` }">
      {{ resources[i-1] }}
    </span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCityStore } from '../stores/cities';
import { useTransporterStore } from '../stores/transporter';
import { usePlayerStore } from '../stores/player';

/* ---------------- props ------------------- */
const props = defineProps({cid: String,})

/* ---------------- data -------------------- */
const cities      = useCityStore();
const transporter = useTransporterStore();
const player      = usePlayerStore();
const resourceNames = [
    "Lunite",
    "Neogold",
    "Planox",
    "Chroniton",
    "Tetryon",
    "Dilithium",
    "Quantumite",
    "Moondust",
    "Cosmium",
    "Hyperfuel",
    "Tritanium",
    "Voidstone",
    "Neutronium",
    "Exotic Gases",
    "Phase Shifters",
    "Neural Cores",
    "Antimatter",
    "Bicubic Chips",
    "Plasma Residue",
    "Neutrino Beams",
    "Fusion Cores",
    "Dark Matter",
    "Singularites",
]


/* ---------------- refs -------------------- */
/* ---------------- computed ---------------- */
const resources = computed(() => cities.all[props.cid].resources);
const economy    = computed(() => cities.all[props.cid].economy);
const buyPrices  = computed(() => {
  return resources.value.map( (r, i) => Math.round(price(i, 0)));
});
const sellPrices = computed(() => {  
  return resources.value.map( (r, i) => Math.round(price(i, 1) * 0.9));
});
const transporterIsHere = computed(() => {
  return transporter.inCity == props.cid
})

/* ---------------- functions --------------- */
function isBuyable(i) {
  return resources.value[i] > 0 && transporterIsHere.value &&  player.money >= buyPrices.value[i];
}

function isSellable(i) {
  return transporter.resources[i] && transporterIsHere.value;
}

function buy(i) {
  player.money -= buyPrices.value[i];
  transporter.load(i, 1, buyPrices.value[i]);
  resources.value[i]--;
}

function sell(i) {
  player.money += sellPrices.value[i];
  resources.value[i]++;  
  transporter.unload(i, 1);
}

function price(i, off) {
  const basePrice = 50 + 20 * Math.pow(Math.floor(i/3),1.6);
  const need = Math.min(Math.max( Math.pow((economy.value[i]+1)/(resources.value[i]+off+1), 0.6), 0.5), 2.5);
  return basePrice * need;
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
.space{
  margin-bottom: 0.4em;
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
  pointer-events: none;
}
.hint:disabled {
  color: #aaa;
}
.resource:hover {
  background-color: #ffffff11;
  transition: background-color 0.4s;
  border-radius: 0.2em;
}
</style>