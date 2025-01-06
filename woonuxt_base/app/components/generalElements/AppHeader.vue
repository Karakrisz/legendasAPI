<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { isShowingSearch } = useSearching()
const route = useRoute()

const scrollY = ref(0)
const snapThreshold = 50

// Check if current route is index page
const isIndexPage = computed(() => route.path === '/' || route.path === '')

// Modified to always return true for non-index pages
const isScrolled = computed(() => {
  if (!isIndexPage.value) return true
  return scrollY.value > snapThreshold
})

const logoHeight = computed(() => {
  const minHeight = 60
  const maxHeight = 109
  
  // Always return minHeight for non-index pages
  if (!isIndexPage.value) return minHeight
  
  const scrollThreshold = 100
  if (scrollY.value <= snapThreshold) return maxHeight
  if (scrollY.value >= scrollThreshold) return minHeight
  
  return maxHeight - (((scrollY.value - snapThreshold) / (scrollThreshold - snapThreshold)) * (maxHeight - minHeight))
})

const handleScroll = () => {
  // Only track scroll on index page
  if (isIndexPage.value) {
    scrollY.value = window.scrollY
  }
}

onMounted(() => {
  // Set initial scroll position
  scrollY.value = isIndexPage.value ? window.scrollY : snapThreshold + 1
  
  // Only add scroll listener on index page
  if (isIndexPage.value) {
    window.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (isIndexPage.value) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <header 
    class="sticky top-0 z-40 transition-all duration-300 ease-in-out" 
    :class="{ 'bg-Dark/75 backdrop-blur-sm': isScrolled }"
  >
    <div class="container flex items-start justify-between py-4">
      <div class="flex items-center">
        <MenuTrigger class="lg:hidden" />
        <NuxtLink to="/" class="cursor-pointer">
          <NuxtImg
            src="/img/svg/SVG_Logo.svg"
            :style="{ height: `${logoHeight}px`, width: 'auto' }"
            class="transition-all duration-300 ease-in-out hidden lg:block"
          />
        </NuxtLink>
      </div>
      <div class="flex justify-end items-center md:w-[160px] flex-1 ml-auto gap-4 md:gap-6">
        <div class="flex gap-[50px] items-center">
          <MainMenu class="items-center hidden gap-6 text-sm lg:flex lg:px-4 text-Light" />
          <CartTrigger />
        </div>
      </div>
    </div>
    <Transition name="scale-y" mode="out-in">
      <div class="container mb-3 -mt-1 sm:hidden" v-if="isShowingSearch">
        <ProductSearch class="flex w-full" />
      </div>
    </Transition>
  </header>
</template>