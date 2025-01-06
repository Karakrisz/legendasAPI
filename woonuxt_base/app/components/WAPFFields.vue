<script lang="ts" setup>
interface WAPFChoice {
  slug: string;
  label: string;
  selected: boolean;
  pricing_type: string;
  pricing_amount: number;
}

interface WAPFField {
  id: string;
  label: string;
  description: string | null;
  type: string;
  required: boolean;
  class: string | null;
  width: string | null;
  options: {
    choices: WAPFChoice[];
  };
  conditionals: any[];
  pricing: {
    type: string;
    amount: number;
    enabled: boolean;
  };
}

interface WAPFConfig {
  id: string;
  type: string;
  layout: {
    labels_position: string;
    instructions_position: string;
    mark_required: boolean;
  };
  fields: WAPFField[];
  rule_groups: any[];
}

const props = defineProps<{
  metadata: string;
}>();

const emit = defineEmits(['field-change', 'price-change']);

const wapfConfig = computed<WAPFConfig>(() => {
  try {
    return JSON.parse(props.metadata);
  } catch (e) {
    console.error('Failed to parse WAPF metadata:', e);
    return {} as WAPFConfig;
  }
});

const selectedValues = ref<Record<string, any>>({});

onMounted(() => {
  if (wapfConfig.value.fields) {
    wapfConfig.value.fields.forEach(field => {
      if (field.type === 'checkboxes') {
        selectedValues.value[field.id] = [];
      } else if (field.type === 'radio') {
        const defaultOption = field.options.choices.find(choice => choice.selected)?.slug || '';
        selectedValues.value[field.id] = defaultOption;
      }
    });
    calculateTotalPrice();
  }
});

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const calculateTotalPrice = () => {
  let totalAdditionalPrice = 0;

  wapfConfig.value.fields?.forEach(field => {
    if (field.type === 'checkboxes') {
      const selectedSlugs = selectedValues.value[field.id] || [];
      field.options.choices.forEach(choice => {
        if (selectedSlugs.includes(choice.slug) && choice.pricing_type === 'fixed') {
          totalAdditionalPrice += choice.pricing_amount;
        }
      });
    } else if (field.type === 'radio') {
      const selectedSlug = selectedValues.value[field.id];
      const selectedChoice = field.options.choices.find(choice => choice.slug === selectedSlug);
      if (selectedChoice?.pricing_type === 'fixed') {
        totalAdditionalPrice += selectedChoice.pricing_amount;
      }
    }
  });

  emit('price-change', totalAdditionalPrice);
  return totalAdditionalPrice;
};

const updateField = (fieldId: string, value: any) => {
  selectedValues.value[fieldId] = value;
  emit('field-change', selectedValues.value);
  calculateTotalPrice();
};

const getFieldClass = (field: WAPFField) => {
  const classes = ['wapf-field'];
  if (field.required) classes.push('required');
  if (field.class) classes.push(field.class);
  if (wapfConfig.value.layout.labels_position) {
    classes.push(`labels-${wapfConfig.value.layout.labels_position}`);
  }
  return classes.join(' ');
};
</script>

<template>
  <div v-if="wapfConfig.fields" class="wapf-fields-container mt-4 space-y-6">
    <div
      v-for="field in wapfConfig.fields"
      :key="field.id"
      :class="getFieldClass(field)"
    >
      <label :class="{ required: field.required }" class="block mb-2 font-medium text-gray-900">
        {{ field.label }}
        <span v-if="field.required" class="text-red-500">*</span>
      </label>
      
      <div v-if="field.description" class="text-sm text-gray-600 mb-2">
        {{ field.description }}
      </div>

      <!-- Checkbox group -->
      <div v-if="field.type === 'checkboxes'" class="space-y-2">
        <div
          v-for="choice in field.options.choices"
          :key="choice.slug"
          class="flex items-center"
        >
          <input
            :id="`${field.id}-${choice.slug}`"
            type="checkbox"
            :value="choice.slug"
            :checked="selectedValues[field.id]?.includes(choice.slug)"
            class=""
            @change="(e) => {
              const value = [...(selectedValues[field.id] || [])];
              if (e.target.checked) {
                value.push(choice.slug);
              } else {
                const index = value.indexOf(choice.slug);
                if (index > -1) value.splice(index, 1);
              }
              updateField(field.id, value);
            }"
          >
          <label
            :for="`${field.id}-${choice.slug}`"
            class="ml-2 text-sm font-medium text-gray-900 flex items-center gap-2"
          >
            {{ choice.label }}
            <span
              v-if="choice.pricing_type !== 'none' && choice.pricing_amount > 0"
              class="text-sm font-normal text-gray-500"
            >
              (+ {{ formatPrice(choice.pricing_amount) }})
            </span>
          </label>
        </div>
      </div>

      <!-- Radio group -->
      <div v-if="field.type === 'radio'" class="space-y-2">
        <div
          v-for="choice in field.options.choices"
          :key="choice.slug"
          class="flex items-center"
        >
          <input
            :id="`${field.id}-${choice.slug}`"
            v-model="selectedValues[field.id]"
            type="radio"
            :name="field.id"
            :value="choice.slug"
            :checked="choice.selected"
            class="w-4 h-4 border-gray-300 text-primary-600 focus:ring-primary-500"
            @change="(e) => updateField(field.id, e.target.value)"
          >
          <label
            :for="`${field.id}-${choice.slug}`"
            class="ml-2 text-sm font-medium text-gray-900 flex items-center gap-2"
          >
            {{ choice.label }}
            <span
              v-if="choice.pricing_type !== 'none' && choice.pricing_amount > 0"
              class="text-sm font-normal text-gray-500"
            >
              (+ {{ formatPrice(choice.pricing_amount) }})
            </span>
          </label>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.wapf-fields-container {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

.wapf-field.required label::after {
  content: "*";
  color: #ef4444;
  margin-left: 0.25rem;
}

.wapf-field + .wapf-field {
  margin-top: 1.5rem;
}

/* Custom radio button styling */
input[type="radio"] {
  border-radius: 100%;
}

input[type="radio"]:checked {
  background-color: currentColor;
  border-color: currentColor;
}

/* Custom checkbox styling */
input[type="checkbox"] {
  border-radius: 0.25rem;
}

input[type="checkbox"]:checked {
  background-color: currentColor;
  border-color: currentColor;
}
</style>