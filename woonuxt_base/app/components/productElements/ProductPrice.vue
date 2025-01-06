<script setup lang="ts">
interface ProductPriceProps {
  regularPrice?: string | null;
  salePrice?: string | null;
}

const { regularPrice, salePrice } = defineProps<ProductPriceProps>();
</script>

<template>
  <div v-if="regularPrice" class="flex font-semibold flex-col font-mono">
    <span class="text-xl" :class="{ 'line-through font-normal': salePrice }" v-html="regularPrice" />
    <span v-if="salePrice" class="text-Sale font-semibold text-xl pt-[5px]" v-html="salePrice" />
  </div>
</template>
