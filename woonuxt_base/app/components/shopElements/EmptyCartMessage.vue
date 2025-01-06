<script setup lang="ts">
const { toggleCart } = useCart();
</script>

<template>
  <div class="flex flex-col items-center justify-center flex-1 mb-20 ">
    <Icon name="ion:cart-outline text-gray-400" size="96" class="opacity-75 mb-5" />
    <div class="mb-2 text-xl font-semibold text-gray-600">{{ $t('messages.shop.cartEmpty') }}</div>
    <span class="mb-8">{{ $t('messages.shop.addProductsInYourCart') }}</span>
    <NuxtLink
      to="/products"
      @click="toggleCart(false)"
      class="px-6 py-3 bg-Primary items-center font-semibold rounded-full hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-300 flex gap-2">
      {{ $t('messages.shop.browseOurProducts') }}
    </NuxtLink>
  </div>
</template>
