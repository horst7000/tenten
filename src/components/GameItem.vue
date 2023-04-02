<template>
  <div ref="itemEl" class="item">
    <template v-for="line, j in lines">
      <div
        :style="{
          position: 'absolute',
          left: (i-1) * spaceFactor*itemSize +'px',
          top: j * spaceFactor*itemSize +'px',
          background: color,
          width:  itemSize+'px',
          height: itemSize+'px',
          borderRadius: itemSize*0.1+'px',
        }"
        v-for="i in line">
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';

/* ---------------- props ------------------- */
const props = defineProps({
    lines : Array,
    color : String,
    itemSize: Number,
    spaceFactor: Number,
});
/* ---------------- data -------------------- */
/* ---------------- refs -------------------- */
const itemEl = ref(null);
/* ---------------- computed ---------------- */
/* ---------------- functions --------------- */
/* ---------------- watchers ---------------- */
/* ------------- lifecycle hooks ------------ */
</script>

<style>
.item  {
  background-color: #00000044;
  touch-action: none;
  user-select: none;
  transform-origin: 0 0;
  border-radius: 10px;
  display:  inline-block;
  width:  100px;
  height: 100px;
}
</style>