<script setup>
import { RouterLink, RouterView } from "vue-router";
import Menu from "./components/Menu.vue"

</script>

<template>
  <div class="h-screen v-screen flex items-center justify-center">
    <div class="flex gap-5 w-full h-full">
      <div class="max-w-md min-w-[350px] bg-zinc-100 shadow-md ">
        <Menu />
      </div>
      <div class="w-full bg-white overflow-y-auto">
        <RouterView />
      </div>

    </div>
  </div>
</template>

<style>

</style>
