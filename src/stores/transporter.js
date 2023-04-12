import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCityStore } from './cities';

export const useTransporterStore = defineStore('transporter', () => {
  /* ---------------- data -------------------- */
  const cities = useCityStore();

  /* ---------------- refs -------------------- */
  const ressources = ref(Array(cities.ressourcesCnt).fill(0).map(() => Math.random()<0.2 ? rand(30) : 0))
  const inCity     = ref('')

  /* ---------------- computed ---------------- */
  const isInCity = computed(() => cities.selected == inCity.value);

  /* ---------------- functions --------------- */
  function rand(max) {
    return Math.floor((max+1)*Math.random());
  }
  
  return { ressources, inCity, isInCity }
})