<template>
    <main>
      <div class="flex center">
        <button style="flex-grow: 0.1; background: green;">hello</button>
      </div>

      <Map></Map>
      
      <div @click="switchTab" ref="tabButtons" style="margin-top: 2rem;" class="flex nine">
        <template v-for="i in tabsCnt">
          <input :id="'tab-test-'+i" type='radio' name='test' :checked="i==1" style="display: none;">
          <label class="pseudo button toggle" :for="'tab-test-'+i">{{ i }}</label>
        </template>
      </div>
      <div class="tabs">
        <div ref="tabs" class="row" :style="{width: (tabsCnt*100)+'%'}">
          <City v-for="i in tabsCnt"/>
        </div>
      </div>
      <Transporter></Transporter>
    </main>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import City from '../components/City.vue';
  import Map from '../components/Map.vue';
  import Transporter from '../components/Transporter.vue';

  /* ---------------- props ------------------- */
  /* ---------------- data -------------------- */
  const tabsCnt = 17;

  /* ---------------- refs -------------------- */
  const tabButtons = ref(null);
  const tabs       = ref(null);

  /* ---------------- computed ---------------- */
  /* ---------------- functions --------------- */
  function switchTab() {
    let margin = 0;
    for (let i = 0; i < tabButtons.value.children.length; i = i+2) {
      if(tabButtons.value.children[i].checked)
        break;
      margin = margin - 100;      
    }
    tabs.value.style.marginLeft = margin+'%';
  }

  /* ---------------- watchers ---------------- */
  /* ------------- lifecycle hooks ------------ */
  </script>
  
  <style>
  main {
    width: 330px;
    margin: 0 auto;
  }

  :checked+.toggle, :checked+.toggle:hover {
    box-shadow: inset 0 0 0 99em var(--color-background-soft);
  }

  
  </style>