<template>
  <header
    class="bg-warm-red flex min-h-30 w-full flex-col justify-between px-4 pt-4 pb-[2px] shadow-2xs sm:px-10"
  >
    <div class="flex justify-between">
      <img src="/src/assets/tpk-logo-white.png" alt="tpk-logo" class="w-40" />

      <button
        @click="handleLogout"
        class="text-c-beige flex cursor-pointer items-center space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
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
        class="text-c-beige w-fit cursor-pointer border-b-[3px] px-1 pb-1 text-sm md:text-base"
        :class="modelValue == 0 ? 'border-c-beige' : 'border-transparent'"
        @click="$emit('update:modelValue', 0)"
      >
        Raffle Entries
      </div>
      <div
        class="text-c-beige w-fit cursor-pointer border-b-[3px] px-1 pb-1 text-sm md:text-base"
        :class="modelValue == 1 ? 'border-c-beige' : 'border-transparent'"
        @click="$emit('update:modelValue', 1)"
      >
        Pick Winners
      </div>
      <div
        class="text-c-beige w-fit cursor-pointer border-b-[3px] px-1 pb-1 text-sm md:text-base"
        :class="modelValue == 2 ? 'border-c-beige' : 'border-transparent'"
        @click="$emit('update:modelValue', 2)"
      >
        Insights
      </div>
    </div>
  </header>
</template>

<script setup>
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase'; // adjust the path to your firebase.js

defineProps(['modelValue']);
defineEmits(['update:modelValue']);

const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>
