<template>
    <main>
      <div class="flex center">
        <button style="flex-grow: 0.1; background: green;">hello</button>
      </div>


      <Map></Map>
      
      <div style="margin-top: 2rem;" class="flex nine">
        <template v-for="i in tabsCnt">
          <input v-model="checkedTab" :value="i" :id="'tab-test-'+i" type='radio' name='test' :checked="i==1" style="display: none;">
          <label class="pseudo button toggle" :for="'tab-test-'+i">{{ i }}</label>
        </template>
      </div>
      <div class="tabs">
        <div class="row" :style="{ width: (3*100)+'%', touchAction: 'pan-y'}">
          <City :style="{transform: 'translateX('+translateXCities[i]+'%)', transition: animCities[i]}" v-for="i in [0,1,2]"/>
        </div>
      </div>
      <Transporter></Transporter>
    </main>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import City from '../components/City.vue';
  import Map from '../components/Map.vue';
  import Transporter from '../components/Transporter.vue';
  import interact from 'interactjs'

  /* ---------------- props ------------------- */
  /* ---------------- data -------------------- */
  const tabsCnt           = 17;
  const swipeThreshold    = 25; // in %
  const defaultTransition = 'all 0.3s'; // in %

  /* ---------------- refs -------------------- */
  const checkedTab    = ref(1);
  const animCities    = ref(Array(3).fill(defaultTransition));
  const loadedCities     = ref([tabsCnt, 1, 2]);
  const cityIndex        = ref({left: 0, mid: 1, right: 2});
  const translateXCities = ref([-100, -100, -100]);

  /* ---------------- computed ---------------- */
  /* ---------------- functions --------------- */
  function moveTabsBy(dx) {
    translateXCities.value[0] += dx;
    translateXCities.value[1] += dx;
    translateXCities.value[2] += dx;
  }

  /* ---------------- watchers ---------------- */
  watch(checkedTab, (newTab, oldTab) => {
    if(oldTab > newTab) { // tab on left
      moveTabsBy(-totDx + 100);
      totDx = 0;

      const rightIndex = cityIndex.value.right;
      animCities.value[cityIndex.value.right] = ''
      translateXCities.value[cityIndex.value.right] -= 300;
      setTimeout(() => {
        animCities.value[rightIndex] = defaultTransition;
      }, 1);
      cityIndex.value.right = (cityIndex.value.right+2) % 3; //+2 <-> -1
      cityIndex.value.mid   = (cityIndex.value.mid+2) % 3;
      cityIndex.value.left  = (cityIndex.value.left+2) % 3;
    }
    else if(oldTab < newTab) { // tab on right
      moveTabsBy(-totDx - 100);
      totDx = 0;

      const leftIndex = cityIndex.value.left;
      animCities.value[cityIndex.value.left] = ''
      translateXCities.value[cityIndex.value.left] += 300;
      setTimeout(() => {
        animCities.value[leftIndex] = defaultTransition;
      }, 1);
      cityIndex.value.right = (cityIndex.value.right+1) % 3; 
      cityIndex.value.mid   = (cityIndex.value.mid+1) % 3;
      cityIndex.value.left  = (cityIndex.value.left+1) % 3;
    }
  })

  /* ------------- lifecycle hooks ------------ */
  let totDx = 0;
  onMounted(() => {
    window.addEventListener('resize', () => windowSize.value = { w: window.innerWidth, h: window.innerHeight });
    const dragger = interact('.row').draggable({
      onstart: (ev) => {
        totDx = 0;
        animCities.value = ['','',''];
      },
      onmove: (ev) => {
        let dx = 100 * ev.dx/330; // in %
        moveTabsBy(dx);
        totDx += dx;
      },
      onend: (ev) => {
        animCities.value = Array(3).fill(defaultTransition);
        if(totDx > swipeThreshold) { // tab on left
          checkedTab.value = (checkedTab.value + tabsCnt - 2) % tabsCnt + 1;
        }
        else if(totDx < -swipeThreshold) { // tab on right
          checkedTab.value = (checkedTab.value) % tabsCnt + 1;
        } 
        //TODO swipe based on velocity (dx/dt)
        else {
          moveTabsBy(-totDx);
          totDx = 0;
        }
      },
    });
    dragger.styleCursor(false);
  })
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