<template>
  <footer class="bg-gray-100 text-gray-800">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center justify-center pt-8">
        <NuxtLink to="/" class="cursor-pointer"> <NuxtImg width="120" src="/img/svg/SVG_Logo-1.svg" alt="Legendás Falatozó Logo" class="mb-6" /></NuxtLink>
        <nav class="mb-6">
          <ul class="flex flex-wrap justify-center gap-[43px] text-xs font-semibold">
            <li v-for="link in mainLinks" :key="link.text">
              <NuxtLink :to="link.url" class="hover:text-gray-600 transition">{{ link.text }}</NuxtLink>
            </li>
          </ul>
        </nav>
        <nav class="mb-6">
          <ul class="flex flex-wrap justify-center gap-[33px] text-xs">
            <li v-for="link in secondaryLinks" :key="link.text">
              <NuxtLink :to="link.url" class="hover:text-gray-600 transition">{{ link.text }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="bg-Dark py-4 text-Light">
      <div class="flex flex-col md:flex-row justify-center gap-[32px] items-center text-sm container">
        <div class="flex items-center mb-2 md:mb-0 gap-2">
          <PhosphorIconPhone weight="fill" class="text-Primary w-4 h-4" />
          <span>+36 30 834 4748</span>
        </div>
        <div class="flex items-center mb-2 md:mb-0 gap-2">
          <PhosphorIconEnvelope weight="fill" class="text-Primary w-4 h-4" />
          <a href="mailto:info@legendasfalatozo.hu" class="hover:text-Primary transition">info@legendasfalatozo.hu</a>
        </div>
        <div class="flex items-center gap-2">
          <PhosphorIconMapPin weight="fill" class="text-Primary w-4 h-4" />
          <span>2400 Dunaújváros, Gyárkapu utca 3.</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const mainLinks = [
  { text: 'Hamburger', url: '/hamburger' },
  { text: 'Menük', url: '/menuk' },
  { text: 'Köretek', url: '/koretek' },
  { text: 'Szószok', url: '/szoszok' },
  { text: 'Tálak', url: '/talak' },
  { text: 'Üdítők', url: '/uditok' },
  { text: 'Desszertek', url: '/desszertek' },
  { text: 'Ajándékutalványok', url: '/ajandekutalvanyok' },
];

const secondaryLinks = [
  { text: 'Allergének', url: '/allergenek' },
  { text: 'Tápértékadatok', url: '/tapertekadatok' },
  { text: 'ÁSZF', url: '/aszf' },
  { text: 'Adatkezelési Tájékoztató', url: '/adatkezeles' },
  { text: 'Kapcsolat', url: '/kapcsolat' },
  { text: 'Impresszum', url: '/impresszum' },
];
</script>
