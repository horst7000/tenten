<template>
  <div ref="board" :style="{ height: lineLength*itemSize*spaceFactor + 'px'}">
    <div
      :style="{
        position: 'absolute',
        left: (i-1)%lineLength * spaceFactor * itemSize +'px',
        top: Math.floor((i-1)/lineLength) * spaceFactor * itemSize +'px',
        background: colors[i-1] || '#222',
        width:  itemSize+'px',
        height: itemSize+'px',
        borderRadius: itemSize*0.1+'px',
      }"
      v-for="i in totalItems">
    </div>
  </div>

  <div :style="{ marginTop: 20 + 'px'}">
    <GameItem v-for="i in currentItems"
      :lines="i.lines"
      :color="i.color"
      :itemSize="itemSize*itemStartFactor"
      :spaceFactor="spaceFactor"/>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import GameItem from './GameItem.vue';
import interact from 'interactjs'
/* ---------------- props ------------------- */
/* ---------------- data -------------------- */
const lineLength = 10;
const totalItems = lineLength*lineLength;
const spaceFactor = 1.5;
const itemSize    = 22;
const itemStartFactor  = 0.6;
const itemDraggedScale = 1/itemStartFactor;
const itemTypes = [
  { color: 'red', variants: [
    [1, 1, 1, 1, 1],
    [5],]
  },
  { color: '#348AA7', variants: [ // light blue
    [3, 1, 1],
    [1, 1, 3],
    [[3], [3], 3],
    [3, [3], [3]]],
  },
  { color: 'green', variants: [[2, 2]], },
  { color: 'lightgreen', variants: [[1]], },
  { color: '#DDE6DB', variants: [[3,3,3]], }, // white
  { color: 'orange', variants: [
    [2, 1],
    [1, 2],
    [[2],2],
    [2,[2]]]
  },
  { color: 'purple', variants: [
    [3],
    [1, 1, 1]],
  },
  { color: '#F68D92', variants: [ // pink
    [2],
    [1, 1]],
  },
]
/* ---------------- refs -------------------- */
const currentItems = ref([])
const board        = ref(null)
const colors       = ref(Array(totalItems).fill(''));

/* ---------------- computed ---------------- */
const boardBoundingRects = computed(() => {
  console.log("computed boardRects");
  return Array.from(board.value.children).map(el => el.getBoundingClientRect());
});

/* ---------------- functions --------------- */
let gameItemCount = 0;
function selectNewItems() {
  currentItems.value = [];
  for (let i = 0; i < 3; i++) {
    const newIndex      = Math.floor(itemTypes.length * Math.random());
    const itemType      = itemTypes[newIndex];
    const variantIndex  = Math.floor(itemType.variants.length * Math.random());
    const variant       = itemType.variants[variantIndex];
    currentItems.value.push({ color: itemType.color, lines: variant});
    gameItemCount++;
  }
  showItems();
}

function showItems() {
  document.querySelectorAll(".item").forEach((el) => {
    el.style.visibility = "";
  })  
}

function transformTarget(target, dx, dy, scale) {
    let x = (parseFloat(target.dataset.x) || 0) + dx
    let y = (parseFloat(target.dataset.y) || 0) + dy
    target.dataset.x = x
    target.dataset.y = y
    target.dataset.scaled = "true";
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(' + scale + ')'
}

function colorizeBoard(gameItemEl) {
  let indices = [];
  for (let i = 0; i < gameItemEl.children.length; i++) {
    // inner item rects
    const itemRect = gameItemEl.children[i].getBoundingClientRect();
    const centerX = itemRect.x + itemRect.width  / 2;
    const centerY = itemRect.y + itemRect.height / 2;
    for (let j = 0; j < boardBoundingRects.value.length; j++) {
      // inner board rects
      const boardRect = boardBoundingRects.value[j];
      if(boardRect.left < centerX && centerX < boardRect.right &&
         boardRect.top  < centerY && centerY < boardRect.bottom &&
         !colors.value[j]) {
        indices.push(j);
        break;
      }
    }
  }
  // legal?
  const legal = indices.length == gameItemEl.children.length;
  legal && indices.forEach(i => colors.value[i] = gameItemEl.firstElementChild.style.background)
  
  return legal;
}

function clearFullAxes() {
  let fullRow, fullColumn;
  for (let i = 0; i < 10; i++) {
    fullRow = true, fullColumn = true;
    for (let j = 0; j < 10; j++) {
      fullRow    = fullRow && colors.value[10 * i + j]
      fullColumn = fullColumn && colors.value[i + 10 * j]
    }
    fullRow && clearRow(i);
    fullColumn && clearColumn(i);
  }
}

function clearRow(i) {
  for (let j = 0; j < 10; j++) {
    setTimeout(() => colors.value[10 * i + j] = "", 180+j*40);
  }
}

function clearColumn(i) {
  for (let j = 0; j < 10; j++) {
    setTimeout(() => colors.value[i + 10 * j] = "", 180+j*40);
  }
}

/* ---------------- watchers ---------------- */
/* ------------- lifecycle hooks ------------ */
onMounted(() => {
  selectNewItems();

  interact('.item')
    .draggable({
      listeners: {
        start (event) {
          const dy = event.target.dataset.scaled ? 0 : -100;
          transformTarget(event.target, 0, dy, itemDraggedScale);
        },
        move (event) {
          transformTarget(event.target, event.dx, event.dy, itemDraggedScale);
        },
        end (event) {
          transformTarget(event.target, 0, 0, itemDraggedScale);

          const done = colorizeBoard(event.target);
          if(done) {
            clearFullAxes();
            // reset and hide item
            event.target.dataset.x = 0;
            event.target.dataset.y = 0;
            event.target.dataset.scaled  = "";
            event.target.style.transform = "";
            event.target.style.visibility = "hidden";
            gameItemCount--;
            if(gameItemCount == 0) {
              selectNewItems();
            }
          };
        }
      },
    })
})

</script>

<style>
</style>