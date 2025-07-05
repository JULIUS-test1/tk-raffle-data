<template>
  <div class="mt-5 flex flex-1 flex-col">
    <p class="text-c-beige text-md mb-1">Filter by branch</p>

    <div class="relative w-full">
      <div
        class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
      >
        <svg
          class="text-c-beige h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      </div>

      <select
        :value="modelValue"
        id="branch-filter"
        class="text-c-beige focus:ring-c-beige focus:border-c-beige block w-full cursor-pointer rounded border border-transparent p-3 ps-8 pe-8 pt-3.5 pb-2.5 text-sm focus:outline-none"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option disabled value="">Select a branch</option>
        <option v-for="branch in uniqueBranches" :key="branch" :value="branch">
          {{ branch }}
        </option>
      </select>

      <button
        v-if="modelValue"
        @click="$emit('update:modelValue', '')"
        type="button"
        class="text-c-beige absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer pt-1 leading-none"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['modelValue', 'uniqueBranches']);
defineEmits(['update:modelValue']);
</script>

<style scoped>
select {
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  background: #dc573c;
}
</style>
