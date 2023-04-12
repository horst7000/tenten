import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCityStore = defineStore('cities', () => {
  /* ---------------- data -------------------- */
  const ressourcesCnt = 23;

  /* ---------------- refs -------------------- */
  const all      = ref({});
  const selected = ref('');

  /* ---------------- computed ---------------- */
  /* ---------------- functions --------------- */
  function rand(max) {
    return Math.floor((max+1)*Math.random());
  }

  function initCities(citiesCnt) {
    for (let i = 0; i < citiesCnt; i++) {
      addCity();
    }
  }

  function addCity() {
    const id = 'c-'+Math.random().toString(36).slice(2);
    all.value[id] = {
      ressources: Array(ressourcesCnt).fill(0).map(() => rand(10)),
      production: Array(100),
      economy: Array(ressourcesCnt).fill(5),
      population: 1,
      position: { x: 0, y: 0 },
      warehouse: {
        ressources: Array(ressourcesCnt).fill(0),
        limit: 0,
        orders: [],
      }
    };
  }

  return { initCities, all, ressourcesCnt, selected }
})