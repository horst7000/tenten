import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCityStore = defineStore('cities', () => {
  /* ---------------- data -------------------- */
  const ressourcesCnt = 23;

  /* ---------------- refs -------------------- */
  const all      = ref({});
  const selected = ref('');
  const checked  = ref(0);

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
      id: id,
      ressources: Array(ressourcesCnt).fill(0).map((r,i) => rand(10*(1-i/ressourcesCnt))),
      production: Array(100),
      economy: Array(ressourcesCnt).fill(5),
      population: 1,
      position: { x: 90*Math.random(), y: 90*Math.random() },
      warehouse: {
        ressources: Array(ressourcesCnt).fill(0),
        limit: 0,
        orders: [],
      }
    };
  }

  return { initCities, all, ressourcesCnt, selected, checked }
})