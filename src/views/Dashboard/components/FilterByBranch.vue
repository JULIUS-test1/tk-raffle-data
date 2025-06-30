<template>
  <div class="flex flex-col grow mt-5">
    <p class="text-c-beige mb-1 text-md">Filter by branch</p>

    <div class="relative w-full">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-c-beige"
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
        class="block w-full p-3 ps-10 text-sm text-c-beige border border-transparent rounded focus:ring-c-beige focus:outline-none focus:border-c-beige cursor-pointer"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option v-for="branch in uniqueBranches" :key="branch" :value="branch">
          {{ branch }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
defineProps(["modelValue", "uniqueBranches"]);
defineEmits(["update:modelValue"]);
</script>

<style scoped>
select {
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  background: #dc573c;
}
</style>
