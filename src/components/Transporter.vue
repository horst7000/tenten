<template>
  <!-- fix chrome mobile bug when hiding top toolbar
   https://www.stevefenton.co.uk/blog/2022/12/mobile-position-sticky-issue/ -->
  <div style="position: fixed;"></div> 

  <div style="
    position: sticky;
    bottom: 0;
    margin: 0 var(--main-margin);
    height: 150px;
    border-top: 3px solid var(--color-border);
    border-bottom: none;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    background: black;
    box-shadow: inset 0 -1em 3em var(--color-background), 0.3em 0.3em 1em var(--color-border);
  ">
    <br style="height: 5rem;"/>
    <div class="flex">
      <div style="flex-grow: 0;">
        <label class="stack">
          <input type="radio" name="source" checked>
          <span class="button toggle pseudo">Ship</span>
        </label>
        <label class="stack">
          <input type="radio" name="source">
          <span class="button toggle pseudo">Warehouse</span>
        </label>
      </div>
    </div>

    <div class="flex center">
      <button style="flex-grow: 0.7; padding: 0; background: var(--color-background-mute); color: var(--color-text);">Move here ...</button>
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