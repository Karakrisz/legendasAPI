<script lang="ts" setup>
import { ProductsOrderByEnum } from '#woo';

const { siteName, description, shortDescription, siteImage } = useAppConfig();

// Initialize with empty arrays and use useAsyncData for SSR compatibility
const { data: categoryData } = await useAsyncData('productCategories', async () => {
  const { data } = await useAsyncGql('getProductCategories', {
    first: 7,
  });
  return data.value?.productCategories?.nodes || [];
});

const { data: saleProductsData } = await useAsyncData('onSaleProducts', async () => {
  const { data } = await useAsyncGql('getProducts', {
    first: 5,
    orderby: ProductsOrderByEnum.POPULARITY,
    where: {
      onSale: true,
    },
  });
  return data.value.products?.nodes || [];
});

// Create computed properties to handle undefined states
const productCategories = computed(() => categoryData.value || []);
const onSaleProducts = computed(() => saleProductsData.value || []);

// SEO meta tags
useSeoMeta({
  title: `Home`,
  ogTitle: siteName,
  description: description,
  ogDescription: shortDescription,
  ogImage: siteImage,
  twitterCard: `summary_large_image`,
});

// Form handling
const form = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
});

const submitForm = () => {
  console.log('Form submitted:', form.value);
  form.value = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };
};

const ajandekutalvany = {
  image: {
    sourceUrl: '/img/svg/SVG_037-certificate.svg',
  },
  name: 'Ajándékutalvány',
};
</script>

<template>
  <main>
    <HeroBanner />

    <section class="py-[50px] bg-Dark">
      <div class="container grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CategoryCard 
          v-for="(category, i) in productCategories" 
          :key="category?.id || i" 
          class="w-full" 
          :node="category" 
        />
        <CategoryCard :node="ajandekutalvany"/>
      </div>
    </section>

    <section v-if="onSaleProducts.length" class="bg-Primary pb-[57px] pt-[40px]">
      <div class="container">
        <h2 class="font-bold text-2xl uppercase text-center tracking-[0.72px] font-rockwell">E havi akcióink</h2>
        <ProductRow 
          :products="onSaleProducts" 
          class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8" 
        />
      </div>
    </section>

    <section class="bg-Dark relative overflow-hidden">
      <NuxtImg class="absolute top-0 w-screen object-cover" src="/img/IMG_LegendaBG.png" />

      <div class="container pt-16 z-10 relative mb-[81px]">
        <h2 class="uppercase font-bold text-2xl text-center text-Primary pb-8 font-rockwell">A ház legendája</h2>
        <div class="w-full bg-Primary h-0.5"/>
        <div class="text-Light space-y-6 px-6 lg:px-24 py-8 text-justify">
          <p>
            Üdvözlégy, nemes utazó! Lépj be Dunaújváros szívébe, ahol a Legendás Falatok fogad kegyelmedet, mint a város legízletesebb lakomáinak otthona! Mióta
            2019-ben szélesre tártuk kapuinkat, vendégeinket a legfinomabb falatokkal kényeztetjük, melyek méltóak lennének a legnagyobb királyok asztalára is.
          </p>
          <p>
            Konyhánk hű szolgálói nem csupán szakácsok, hanem valódi mesterei a gasztronómia nemes művészetének. Csak a legkiválóbb alapanyagokkal dolgozunk,
            miként a régi idők mesterei is tették: friss, roppanó zöldségekkel, fűszeres húsokkal és kézműves szeretettel készített péksüteményeinkkel. Nálunk
            nincs helye kompromisszumnak, hiszen tudjuk: a legendák alapja a minőség.
          </p>
          <p>
            Ha gyomrod éhes, ne habozz, jó lovag vagy derék asszony! Látogass el hozzánk, vagy rendelj otthonod kényelmébe, és engedd, hogy ízletes, királyi
            fogásaink elvarázsoljanak, mint a legszebb mesékben! Nálunk minden falat egy történet, és minden vendég királyi fogadtatásban részesül.
          </p>
          <p class="font-semibold">Legendás Falatok – ahol a hagyomány és az ízek legendái életre kelnek!</p>
        </div>
        <div class="w-full bg-Primary h-0.5"/>
      </div>

      <div class="container max-w-6xl bg-Light px-10 lg:px-14 py-10 rounded-[50px] relative z-10 mb-[122px]">
        <h2 class="uppercase font-bold text-2xl text-center pb-8 font-rockwell tracking-wider">Írjon nekünk</h2>

        <form class="space-y-6" @submit.prevent="submitForm">
          <div class="space-y-4">
            <input
              v-model="form.name"
              type="text"
              placeholder="Név"
              class="w-full px-4 py-3 rounded-full border border-Grey-Inactive focus:outline-none focus:ring-2 focus:ring-Primary"
              required >
            <input
              v-model="form.email"
              type="email"
              placeholder="E-mail cím"
              class="w-full px-4 py-3 rounded-full border border-Grey-Inactive focus:outline-none focus:ring-2 focus:ring-Primary"
              required >
            <input
              v-model="form.phone"
              type="tel"
              placeholder="Telefonszám"
              class="w-full px-4 py-3 rounded-full border border-Grey-Inactive focus:outline-none focus:ring-2 focus:ring-Primary"
              required >
            <textarea
              v-model="form.message"
              placeholder="Üzenet"
              rows="6"
              class="w-full px-4 py-3 rounded-3xl border border-Grey-Inactive focus:outline-none focus:ring-2 focus:ring-Primary"
              required/>
          </div>

          <div class="flex items-center justify-end gap-7">
            <p class="">
              A küldés gombra kattintva elfogadja az
              <a href="#" class="underline hover:text-Primary transition">Adatvédelmi Nyilatkozatot</a>.
            </p>
            <button
              type="submit"
              class="px-6 py-3 bg-Primary items-center font-semibold rounded-full hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-300 flex gap-2">
              <span>Küldés</span>
              <PhosphorIconPaperPlaneTilt :size="20" />
            </button>
          </div>
        </form>
      </div>
    </section>

    <section>
      <div class="bg-primary py-6 sm:py-10 bg-Primary">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center relative">
            <h1 class="uppercase font-maiden-orange text-4xl sm:text-6xl lg:text-[96px] leading-[87.41%] text-center lg:text-left mb-4 lg:mb-0">
              Királyi<br >Lakoma
            </h1>
            <p class="text-justify text-sm sm:text-base flex-1">
              Lepd meg családtagjaid és barátaid egy igazi fejedelmi élménnyel! Ajándékozz Legendás Falatok ajándékutalványt, hogy ők is élvezhessék a középkori
              ízek világát és a vendégszeretet varázsát. Legyen szó ünnepről vagy meglepetésről, egy ízletes falat mindig tökéletes ajándék. Válaszd a
              legkiválóbb meglepetést, amely minden éhes gyomrot elégedetté tesz!
            </p>
            <div class="lg:w-[340px] hidden lg:block"/>
            <div class="mt-6 lg:absolute lg:-space-y-32 lg:right-0 lg:w-[350px] lg:mt-20">
              <NuxtImg class="w-full max-w-[250px] mx-auto lg:max-w-full" src="img/svg/SVG_Ticket1.svg" alt="Ticket 1" />
              <NuxtImg class="w-full max-w-[250px] mx-auto lg:max-w-full mt-4 lg:-mt-32 hidden lg:block" src="img/svg/SVG_Ticket2.svg" alt="Ticket 2" />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-[#E2921A]">
        <div
          class="container mx-auto px-4 sm:px-6 lg:px-8 py-2.5 font-semibold flex items-center justify-center lg:justify-start gap-1 cursor-pointer hover:text-Dark/70 transition">
          <span class="text-sm sm:text-base">Ugrás az ajándékutalványokhoz</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block">
            <path d="M12 19L19 12M19 12L12 5M19 12L5 12" stroke="#0B0B0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}
</style>