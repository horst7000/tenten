import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCityStore = defineStore('cities', () => {
  /* ---------------- data -------------------- */
  const resourcesCnt = 23;

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
      resources: Array(resourcesCnt).fill(0).map((r,i) => rand(10*(1-i/resourcesCnt))),
      production: Array(100),
      economy: Array(resourcesCnt).fill(5),
      population: 1,
      position: { x: 90*Math.random(), y: 90*Math.random() },
      warehouse: {
        resources: Array(resourcesCnt).fill(0),
        limit: 0,
        orders: [],
      }
    };
  }

  return { initCities, all, resourcesCnt, selected, checked }
})