import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  /* ---------------- data -------------------- */
  /* ---------------- refs -------------------- */
  const money = ref(0);
  /* ---------------- computed ---------------- */
  /* ---------------- functions --------------- */
  return { money }
})