import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCityStore } from './cities';

export const useTransporterStore = defineStore('transporter', () => {
  /* ---------------- data -------------------- */
  const cities = useCityStore();

  /* ---------------- refs -------------------- */
  const resources = ref({});
  const inCity     = ref('')

  /* ---------------- computed ---------------- */
  const isInSelectedCity = computed(() => cities.selected == inCity.value);

  /* ---------------- functions --------------- */
  function rand(max) {
    return Math.floor((max+1)*Math.random());
  }

  function load(index, count, price) {
    if(resources.value[index]) {
      const oldCnt = resources.value[index].count;
      const newCnt = oldCnt + count;
      resources.value[index].price = ( oldCnt * resources.value[index].price + count * price ) / newCnt;
      resources.value[index].count += count;
    }
    else {
      resources.value[index] = { count, price, index }
    }
  }

  function unload(index, count) {
    resources.value[index].count -= count;
    if(resources.value[index].count == 0) delete resources.value[index];
  }
  
  return { resources, inCity, isInSelectedCity, load, unload }
})