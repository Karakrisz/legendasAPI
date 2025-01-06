<script setup lang="ts">
const route = useRoute();
const { storeSettings } = useAppConfig();
const { addToCart, isUpdatingCart } = useCart();

const props = defineProps({
  node: { type: Object as PropType<Product>, required: true },
  index: { type: Number, default: 1 },
});

const imgWidth = 164;
const imgHeight = Math.round(imgWidth * 1.125);

// example: ?filter=pa_color[green,blue],pa_size[large]
const filterQuery = ref(route.query?.filter as string);
const paColor = ref(filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || []);

// watch filterQuery
watch(
  () => route.query,
  () => {
    filterQuery.value = route.query.filter as string;
    paColor.value = filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || [];
  },
);

const mainImage = computed<string>(() => props.node?.image?.producCardSourceUrl || props.node?.image?.sourceUrl || '/images/placeholder.jpg');
const imagetoDisplay = computed<string>(() => {
  if (paColor.value.length) {
    const activeColorImage = props.node?.variations?.nodes.filter((variation) => {
      const hasMatchingAttributes = variation.attributes?.nodes.some((attribute) => paColor.value.some((color) => attribute?.value?.includes(color)));
      const hasMatchingSlug = paColor.value.some((color) => variation.slug?.includes(color));
      return hasMatchingAttributes || hasMatchingSlug;
    });
    if (activeColorImage?.length) return activeColorImage[0]?.image?.producCardSourceUrl || activeColorImage[0]?.image?.sourceUrl || mainImage.value;
  }
  return mainImage.value;
});
</script>

<template>
  <div class="relative group pt-[100px] px-8 pb-8 rounded-[50px] bg-Light-Grey mt-14">
    <NuxtLink v-if="node.slug" :to="`/product/${decodeURIComponent(node.slug)}`" :title="node.name">
      <!-- <SaleBadge :node class="absolute top-2 right-2" /> -->
      <NuxtImg
        v-if="imagetoDisplay"
        :width="imgWidth"
        :height="imgHeight"
        :src="imagetoDisplay"
        :alt="node.image?.altText || node.name || 'Product image'"
        :title="node.image?.title || node.name"
        :loading="index <= 3 ? 'eager' : 'lazy'"
        :sizes="`sm:${imgWidth / 2}px md:${imgWidth}px`"
        class="absolute inset-0 left-1/2 -translate-x-1/2 -top-[80px] z-10"
        placeholder
        placeholder-class="blur-xl" />
    </NuxtLink>

    <NuxtImg
        v-if="imagetoDisplay"
        :width="imgWidth"
        :height="imgHeight"
        :src="imagetoDisplay"
        :alt="node.image?.altText || node.name || 'Product image'"
        :title="node.image?.title || node.name"
        :loading="index <= 3 ? 'eager' : 'lazy'"
        :sizes="`sm:${imgWidth / 2}px md:${imgWidth}px`"
        class="absolute inset-0 left-1/2 -translate-x-1/2 top-[50px] rotate-180 transform scaleX(-1) z-0"
        style="maskImage: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.1))"
        placeholder
        placeholder-class="blur-xl" />

    
    <div class="p-2 flex flex-col h-full relative z-20">
      <!-- <StarRating v-if="storeSettings.showReviews" :rating="node.averageRating" :count="node.reviewCount" /> -->
      <NuxtLink v-if="node.slug" :to="`/product/${decodeURIComponent(node.slug)}`" :title="node.name">
        <h2 class="mb-2 text-[28px] font-semibold font-rockwell hover:text-Primary transition">{{ node.name }}</h2>
      </NuxtLink>
      <div class="flex-1" v-html="node.shortDescription"></div>
      <div class="flex justify-between items-end pt-[32px]">
        <ProductPrice class="text-sm" :sale-price="node.salePrice" :regular-price="node.regularPrice" />
        <!-- <PhosphorIconPlusCircle class="w-[48px] h-[48px] hover:text-Primary cursor-pointer transition"></PhosphorIconPlusCircle> -->
        <div @click.prevent="addToCart({ productId: node.databaseId, quantity: 1 })">
          <AddToCartButton  size="sm" :class="{ loading: isUpdatingCart }"></AddToCartButton>
        </div>
      </div>
    </div>
  </div>
</template>
