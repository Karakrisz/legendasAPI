<script setup>
const { cart } = useCart();
const props = defineProps({
  disabled: { type: Boolean, default: false },
  size: { type: String, default: 'md' },
});
const isLoading = ref(false);
const { t } = useI18n();
const addToCartButtonText = computed(() => (isLoading.value ? t('messages.shop.adding') : t('messages.shop.addToCart')));

// stop loading when cart is updated
watch(cart, (val) => {
  isLoading.value = false;
});
</script>

<template>
  <button
    v-if="size === 'md'"
    type="submit"
    class="rounded-lg flex font-bold bg-stone-800 text-white text-center min-w-[150px] p-2.5 gap-4 items-center justify-center focus:outline-none"
    :class="{ disabled: disabled }"
    :disabled="disabled"
    @click="isLoading = true">
    <span>{{ addToCartButtonText }}</span>
    <LoadingIcon v-if="isLoading" stroke="4" size="12" color="#fff" />
  </button>

  <PhosphorIconPlusCircle
    v-if="size === 'sm' && !isLoading"
    type="submit"
    class="w-[48px] h-[48px] hover:text-Primary cursor-pointer transition rounded-lg flex font-bold text-center gap-4 items-center justify-center focus:outline-none"
    :class="{ disabled: disabled }"
    :disabled="disabled"
    @click="isLoading = true">
  </PhosphorIconPlusCircle>
  <LoadingIcon v-if="size === 'sm' && isLoading" stroke="4" size="46" color="#ffad32" />
</template>

<style lang="postcss" scoped>
button {
  outline: none !important;
  transition: all 150ms ease-in;
}

button.disabled {
  @apply cursor-not-allowed bg-stone-400;
}
</style>
