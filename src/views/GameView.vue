<template>
    <main>
      <div class="flex center">
        <button style="flex-grow: 0.1; background: green;">hello</button>
      </div>


      <Map></Map>
      
      <div style="margin-top: 2rem;" class="flex nine">
        <template v-for="cid,i in Object.keys(cities.all)">
          <input v-model="checkedTab" :value="i" :id="'tab-city-'+i" type='radio' name='citytabs' style="display: none;">
          <label class="pseudo button toggle" :class="{ 'here': cid==transporter.inCity }" :for="'tab-city-'+i">{{ i+1 }}</label>
        </template>
      </div>
      <div class="tabs" style="margin: 0 var(--main-margin);">
        <div class="row" :style="{ width: (3*100)+'%', touchAction: 'pan-y'}">
          <City :cid="cid" :style="{transform: 'translateX('+tabTranslatesX[i]+'%)', transition: tabTransitions[i]}" v-for="cid,i in loadedCities"/>
        </div>
      </div>
      <Transporter></Transporter>
    </main>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, computed } from 'vue';
  import City from '../components/City.vue';
  import Map from '../components/Map.vue';
  import Transporter from '../components/Transporter.vue';
  import interact from 'interactjs'
  import { useCityStore } from '../stores/cities';
  import { useTransporterStore } from '../stores/transporter';

  /* ---------------- props ------------------- */
  /* ---------------- data -------------------- */
  const tabsCnt           = 5;
  const swipeThreshold    = 25; // in %
  const defaultTransition = 'all 0.3s'; // in %
  const cities      = useCityStore();
  const transporter = useTransporterStore();

  /* ---------------- refs -------------------- */
  const tabTransitions  = ref(Array(3).fill(defaultTransition));
  const tabIndex        = ref({left: 0, mid: 1, right: 2});
  const tabTranslatesX  = ref([-100, -100, -100]);
  const tabWidth        = ref(0);
  
  /* ---------------- computed ---------------- */
  const checkedTab     = computed({
    get: () => {
      return cities.checked;
    },
    set: (newVal) => {
      cities.checked = newVal;
    },
  })
  const checkedTabLeft = computed(() => {
    return (checkedTab.value + tabsCnt - 1) % tabsCnt;
  })

  const checkedTabRight = computed(() => {
    return (checkedTab.value + 1) % tabsCnt;
  })

  const loadedCities = computed(() => {
    const cityIds = Object.keys(cities.all);    
    if(cityIds.length == 0) return [];
    let loadedIds = [];
    loadedIds[tabIndex.value.left]  = cityIds[checkedTabLeft.value];
    loadedIds[tabIndex.value.mid]   = cityIds[checkedTab.value];
    loadedIds[tabIndex.value.right] = cityIds[checkedTabRight.value];
    return loadedIds;
  })

  /* ---------------- functions --------------- */
  function moveTabsBy(dx) {
    tabTranslatesX.value[0] += dx;
    tabTranslatesX.value[1] += dx;
    tabTranslatesX.value[2] += dx;
  }

  /* ---------------- watchers ---------------- */
  watch(checkedTab, (newTab, oldTab) => {
    cities.selected = Object.keys(cities.all)[newTab];

    if( -tabsCnt/2 <= newTab - oldTab && newTab - oldTab < 0 || newTab - oldTab > tabsCnt/2 ) { // tab on left
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
    else if( 0 < newTab - oldTab && newTab - oldTab <= tabsCnt/2 || newTab - oldTab < -tabsCnt/2) { // tab on right
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
    
    Object.keys(cities.all).length == 0 && cities.initCities(tabsCnt);
    transporter.inCity  = Object.keys(cities.all)[0];
    cities.selected = Object.keys(cities.all)[0];

    const dragger = interact('.row').draggable({
      onstart: (ev) => {
        totDx = 0;
        tabTransitions.value = ['','',''];
      },
      onmove: (ev) => {
        // stabilize scroll-y
        if(totDx == 0 && Math.abs(ev.dx) < 6) return;

        let dx = 100 * ev.dx/tabWidth.value; // in %
        moveTabsBy(dx);
        totDx += dx;
      },
      onend: (ev) => {
        tabTransitions.value = Array(3).fill(defaultTransition);
        if(totDx > swipeThreshold) { // tab on left
          checkedTab.value = checkedTabLeft.value;
        }
        else if(totDx < -swipeThreshold) { // tab on right
          checkedTab.value = checkedTabRight.value;
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

  .here, .here:hover {
    border: 2px solid var(--color-background-mute);
    transition: none;
    margin: calc(0.3em - 2px) 0px;
  }

  /* :checked+.toggle, :checked+.toggle:hover {
    box-shadow: initial;
  } */
  
  </style>