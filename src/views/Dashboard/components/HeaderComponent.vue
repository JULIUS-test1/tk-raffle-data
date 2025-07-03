<template>
  <header
    class="min-h-30 bg-warm-red px-4 sm:px-10 pt-4 flex flex-col justify-between pb-[2px] shadow-2xs w-full"
  >
    <div class="flex justify-between">
      <img src="/src/assets/tpk-logo-white.png" alt="tpk-logo" class="w-40" />

      <button
        @click="handleLogout"
        class="flex items-center space-x-2 text-c-beige cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center gap-x-7 px-3">
      <div
        class="text-c-beige border-b-[3px] px-1 w-fit cursor-pointer pb-1"
        :class="modelValue == 0 ? 'border-c-beige' : 'border-transparent'"
        @click="$emit('update:modelValue', 0)"
      >
        Raffle Entries
      </div>
      <div
        class="text-c-beige border-b-[3px] px-1 w-fit cursor-pointer pb-1"
        :class="modelValue == 1 ? 'border-c-beige' : 'border-transparent'"
        @click="$emit('update:modelValue', 1)"
      >
        Pick Winners
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>
