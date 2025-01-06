<script setup lang="ts">
const { toggleMobileMenu } = useHelpers();
</script>

<template>
  <div class="bg-Light flex flex-col max-w-lg shadow-lg top-0 bottom-0 left-0 w-11/12 z-50 fixed overflow-x-hidden">
    <Icon
      name="ion:close-outline"
      class="absolute p-1 rounded-lg shadow-lg top-6 left-6 md:left-8 cursor-pointer hover:text-Primary transition"
      size="34"
      @click="toggleMobileMenu(false)" />

    <NuxtLink to="/" class="cursor-pointer">
      <NuxtImg src="/img/svg/SVG_Logo-1.svg" class=" mx-auto pt-10" />
    </NuxtLink>
    <MainMenu class="mt-10 grid p-4 text-Dark gap-4 uppercase text-center" />
  </div>
</template>
