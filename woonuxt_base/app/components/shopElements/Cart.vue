<script setup lang="ts">
const { cart, toggleCart, isUpdatingCart } = useCart();
</script>

<template>
  <div class="fixed top-0 bottom-0 right-0 z-50 flex flex-col w-11/12 max-w-lg overflow-x-hidden bg-white shadow-lg">
    <EmptyCart v-if="cart && !cart.isEmpty" class=" absolute top-6 md:left-8 left-6 rounded-lg shadow-lg p-1.5 w-fit hover:bg-red-400 hover:text-white" />

    <Icon name="ion:close-outline" class="absolute p-1 rounded-lg shadow-lg top-6 right-6 md:right-8 cursor-pointer hover:text-Primary transition" size="34" @click="toggleCart(false)" />

    <div class="mt-8 text-center">
      {{ $t('messages.shop.cart') }}
      <span v-if="cart?.contents?.productCount"> ({{ cart?.contents?.productCount }}) </span>
    </div>

    <ClientOnly>
      <template v-if="cart && !cart.isEmpty">
        <ul class="flex flex-col flex-1 gap-4 p-6 overflow-y-scroll md:p-8">
          <CartCard v-for="item in cart.contents?.nodes" :key="item.key" :item />
        </ul>
        <div class="px-8 mb-8">
          <NuxtLink
            class="block p-3 text-lg text-center text-white bg-stone-800 rounded-lg shadow-md justify-evenly hover:bg-stone-900"
            to="/checkout"
            @click.prevent="toggleCart()">
            <span class="mx-2">{{ $t('messages.shop.checkout') }}</span>
            <span v-html="cart.total" />
          </NuxtLink>
        </div>
      </template>
      <!-- Empty Cart Message -->
      <EmptyCartMessage v-else-if="cart && cart.isEmpty" />
      <!-- Cart Loading -->
      <div v-else class="flex flex-col items-center justify-center flex-1 mb-20">
        <LoadingIcon />
      </div>
    </ClientOnly>
    <!-- Cart Loading Overlay -->
    <div v-if="isUpdatingCart" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-25">
      <LoadingIcon />
    </div>
  </div>
</template>
