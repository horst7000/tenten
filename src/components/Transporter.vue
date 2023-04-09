<template>
  <!-- fix chrome mobile bug when hiding top toolbar
   https://www.stevefenton.co.uk/blog/2022/12/mobile-position-sticky-issue/ -->
  <div style="position: fixed;"></div> 

  <div style="
    position: sticky;
    bottom: 0;
    margin-left:  -28px;
    margin-right: -28px;
    height: 100px;
    border-top: 3px solid var(--color-border);
    border-bottom: none;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    background: black;
    box-shadow: inset 0 -1em 3em var(--color-background), 0.3em 0.3em 1em var(--color-border);
  ">
  
    <div class="flex center">
      <button style="flex-grow: 0.5; background: var(--color-background-mute); color: var(--color-text);">Move here ...</button>
    </div>
  </div>
</template>

<script setup>
/* ---------------- props ------------------- */
/* ---------------- data -------------------- */
/* ---------------- refs -------------------- */
/* ---------------- computed ---------------- */
/* ---------------- functions --------------- */
/* ---------------- watchers ---------------- */
</script>

<style>
</style>