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
      <div class="tabs" style="margin: 0 var(--main-margin);">
        <div class="row" :style="{ width: (3*100)+'%', touchAction: 'pan-y'}">
          <City :style="{transform: 'translateX('+tabTranslatesX[i]+'%)', transition: tabTransitions[i]}" v-for="i in [0,1,2]"/>
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
  const loadedCities    = ref([tabsCnt, 1, 2]);
  const checkedTab      = ref(1);
  const tabTransitions  = ref(Array(3).fill(defaultTransition));
  const tabIndex        = ref({left: 0, mid: 1, right: 2});
  const tabTranslatesX  = ref([-100, -100, -100]);
  const tabWidth        = ref(0);

  /* ---------------- computed ---------------- */
  /* ---------------- functions --------------- */
  function moveTabsBy(dx) {
    tabTranslatesX.value[0] += dx;
    tabTranslatesX.value[1] += dx;
    tabTranslatesX.value[2] += dx;
  }

  /* ---------------- watchers ---------------- */
  watch(checkedTab, (newTab, oldTab) => {
    if(oldTab > newTab) { // tab on left
      moveTabsBy(-totDx + 100);
      totDx = 0;

      const rightIndex = tabIndex.value.right;
      tabTransitions.value[tabIndex.value.right] = ''
      tabTranslatesX.value[tabIndex.value.right] -= 300;
      setTimeout(() => {
        tabTransitions.value[rightIndex] = defaultTransition;
      }, 50);
      tabIndex.value.right = (tabIndex.value.right+2) % 3; //+2 <-> -1
      tabIndex.value.mid   = (tabIndex.value.mid+2) % 3;
      tabIndex.value.left  = (tabIndex.value.left+2) % 3;
    }
    else if(oldTab < newTab) { // tab on right
      moveTabsBy(-totDx - 100);
      totDx = 0;

      const leftIndex = tabIndex.value.left;
      tabTransitions.value[tabIndex.value.left] = ''
      tabTranslatesX.value[tabIndex.value.left] += 300;
      setTimeout(() => {
        tabTransitions.value[leftIndex] = defaultTransition;
      }, 50);
      tabIndex.value.right = (tabIndex.value.right+1) % 3; 
      tabIndex.value.mid   = (tabIndex.value.mid+1) % 3;
      tabIndex.value.left  = (tabIndex.value.left+1) % 3;
    }
  })

  /* ------------- lifecycle hooks ------------ */
  let totDx = 0;
  onMounted(() => {
    tabWidth.value = document.querySelector('.tabs').offsetWidth
    window.addEventListener('resize', () => tabWidth.value = document.querySelector('.tabs').offsetWidth);

    const dragger = interact('.row').draggable({
      onstart: (ev) => {
        totDx = 0;
        tabTransitions.value = ['','',''];
      },
      onmove: (ev) => {
        let dx = 100 * ev.dx/tabWidth.value; // in %
        moveTabsBy(dx);
        totDx += dx;
      },
      onend: (ev) => {
        tabTransitions.value = Array(3).fill(defaultTransition);
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
    --main-padding: 1.3rem;
    --main-margin: calc(-1*var(--main-padding));    
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 0 var(--main-padding);
  }

  /* :checked+.toggle, :checked+.toggle:hover {
    box-shadow: initial;
  } */
  
  </style>