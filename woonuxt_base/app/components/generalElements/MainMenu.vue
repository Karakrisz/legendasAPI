<script setup lang="ts">
const { wishlistLink } = useAuth();

const links = [
  { to: '', text: 'Akcióink', class: 'glow-link uppercase text-Primary' },
  { to: '', text: 'Ajándékutalványok' },
  { to: '', text: 'Tápértékadatok', class: '', prefetch: true },
  { to: '', text: 'Allergének', class: '', prefetch: true },
  { to: '/contact', text: 'Kapcsolat', class: '', prefetch: true },
];
</script>

<template>
  <nav class="flex flex-wrap items-center justify-center gap-[50px] p-4">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      :class="[
        'relative cursor-pointer text-lg transition hover:text-Primary',
        link.class
      ]"
      active-class="text-white"
      :prefetch="link.prefetch"
    >
      {{ link.text }}
    </NuxtLink>
  </nav>
</template>

<style scoped>
.glow:hover {
  text-shadow: #FC0 2px 0 10px;
}
</style>