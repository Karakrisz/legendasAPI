<script setup lang="ts">
const { setProducts, updateProductList } = useProducts();
const route = useRoute();
const { storeSettings } = useAppConfig();
const { isQueryEmpty } = useHelpers();

const { data } = await useAsyncGql('getProducts');

const allProducts = ref<Product[]>([]);

const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  const { data } = await useAsyncGql('getProducts');
  allProducts.value = (data.value?.products?.nodes || []) as Product[];
  setProducts(allProducts.value);
  isLoading.value = false;

  if (!isQueryEmpty.value) updateProductList();
});

watch(
  () => route.query,
  () => {
    if (route.name !== 'products') return;
    updateProductList();
  },
);

useHead({
  title: `Products`,
  meta: [{ hid: 'description', name: 'description', content: 'Products' }],
});
</script>

<template>
  <div v-if="!isLoading">
    <div class="container flex items-start gap-16" v-if="allProducts.length">
      <Filters v-if="storeSettings.showFilters" />
      <div class="w-full">
        <div class="flex items-center justify-between w-full gap-4 mt-8 md:gap-8">
          <ProductResultCount />
          <OrderByDropdown class="hidden md:inline-flex" v-if="storeSettings.showOrderByDropdown" />
          <ShowFilterTrigger v-if="storeSettings.showFilters" class="md:hidden" />
        </div>
        <ProductGrid />
      </div>
    </div>
    <NoProductsFound v-else>Could not fetch products from your store. Please check your configuration.</NoProductsFound>
  </div>
  <div v-else class="container flex items-start gap-16 animate-pulse" v-if="isLoading">
    <div class="bg-gray-200 w-[124px] h-[300px] mt-6"></div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <div v-for="n in 3" :key="n" class="bg-white rounded-lg p-6 shadow-sm">
        <!-- Product Image -->
        <div class="aspect-square mb-4 bg-gray-200 rounded-lg"></div>

        <!-- Product Title -->
        <div class="h-8 bg-gray-200 rounded mb-4"></div>

        <!-- Product Description -->
        <div class="space-y-2 mb-4">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        <!-- Price and Add Button -->
        <div class="flex items-center justify-between">
          <div class="h-6 w-24 bg-gray-200 rounded"></div>
          <div class="h-10 w-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>
