import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  /* ---------------- data -------------------- */
  /* ---------------- refs -------------------- */
  const money = ref(1000);
  /* ---------------- computed ---------------- */
  /* ---------------- functions --------------- */
  return { money }
})