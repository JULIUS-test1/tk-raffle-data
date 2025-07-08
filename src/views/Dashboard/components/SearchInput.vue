<template>
  <div class="flex grow flex-col">
    <p class="text-c-beige text-md mb-1">What are you looking for?</p>

    <div class="relative w-full">
      <div
        class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
      >
        <svg
          class="text-c-beige h-4 w-4"
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
        class="text-c-beige placeholder-c-beige bg-red-1 focus:ring-c-beige focus:outline-c-beige block h-[45px] w-full rounded border-transparent px-3 ps-10 pe-26 text-sm focus:outline-1"
        placeholder="Search for name, address etc."
        required
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup.enter="$emit('handleSearch')"
      />

      <div
        v-if="modelValue"
        @click="$emit('update:modelValue', '')"
        class="text-c-beige text-md absolute end-25 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        ✕
      </div>

      <button
        type="submit"
        class="text-warm-red bg-c-beige focus:outline-warm-red absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-xs px-4 py-1 text-sm hover:bg-white focus:ring-1"
        @click="$emit('handleSearch')"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue', 'handleSearch']);
</script>
