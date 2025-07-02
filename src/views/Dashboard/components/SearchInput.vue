<template>
  <div class="flex flex-col grow">
    <p class="text-c-beige mb-1 text-md">What are you looking for?</p>

    <div class="relative w-full">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-c-beige"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>

      <input
        type="search"
        :value="modelValue"
        id="default-search"
        class="block w-full px-3 h-[45px] ps-10 pe-26 text-sm text-c-beige placeholder-c-beige border-transparent rounded bg-red-1 focus:ring-c-beige focus:outline-c-beige focus:outline-1"
        placeholder="Search for name, address etc."
        required
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup.enter="$emit('handleSearch')"
      />

      <button
        v-if="modelValue"
        @click="$emit('update:modelValue', '')"
        type="button"
        class="absolute end-25 top-1/2 -translate-y-1/2 text-c-beige text-md cursor-pointer"
      >
        ✕
      </button>

      <button
        type="submit"
        class="text-warm-red absolute end-2 top-1/2 -translate-y-1/2 bg-c-beige hover:bg-white focus:ring-1 focus:outline-none rounded-xs text-sm px-4 py-1 cursor-pointer"
        @click="$emit('handleSearch')"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue", "handleSearch"]);
</script>
