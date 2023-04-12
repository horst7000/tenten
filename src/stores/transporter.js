import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCityStore } from './cities';

export const useTransporterStore = defineStore('transporter', () => {
  /* ---------------- data -------------------- */
  const cities = useCityStore();

  /* ---------------- refs -------------------- */
  const ressources = ref({});
  const inCity     = ref('')

  /* ---------------- computed ---------------- */
  const isInCity = computed(() => cities.selected == inCity.value);

  /* ---------------- functions --------------- */
  function rand(max) {
    return Math.floor((max+1)*Math.random());
  }

  function load(index, count, price) {
    if(ressources.value[index]) {
      const oldCnt = ressources.value[index].count;
      const newCnt = oldCnt + count;
      ressources.value[index].price = ( oldCnt * ressources.value[index].price + count * price ) / newCnt;
      ressources.value[index].count += count;
    }
    else {
      ressources.value[index] = { count, price, index }
    }
  }

  function unload(index, count) {
    ressources.value[index].count -= count;
    if(ressources.value[index].count == 0) delete ressources.value[index];
  }
  
  return { ressources, inCity, isInCity, load, unload }
})