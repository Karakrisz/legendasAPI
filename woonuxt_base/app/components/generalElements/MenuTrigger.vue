<script setup lang="ts">
const { toggleMobileMenu } = useHelpers();
</script>

<template>
  <div>
    <Icon name="ion:menu-outline" size="26" class="cursor-pointer text-white" @click="toggleMobileMenu" />
  </div>
</template>
