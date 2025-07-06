<template>
  <div
    v-if="showUserInfo"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/30 backdrop-blur-xs backdrop-saturate-150"
  >
    <div
      class="relative min-h-fit w-[600px] rounded-lg bg-white px-6 py-5 shadow-xl"
    >
      <button
        @click="emit('update:showUserInfo', false)"
        class="absolute top-3 right-4 cursor-pointer text-xl font-bold text-black"
      >
        ✕
      </button>
      <h2 class="mb-4 text-center text-2xl">Winner Information</h2>
      <template v-for="(entry, index) in userInfo" :key="index">
        <div
          class="border1 flex min-h-12 w-full items-center"
          v-for="(item, idx) in keysArrayRaffle"
          :key="idx"
        >
          <div class="flex-1/2">{{ item }}:</div>
          <div class="flex-1/2">
            <span
              v-if="item == 'Upload Receipt'"
              class="hover:text-warm-red cursor-pointer underline"
              @click="emit('handleViewImage', entry['Upload Receipt'])"
            >
              view receipt
            </span>
            <template v-else>{{ formatItemDisplay(item, entry) }}</template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
import { keysArray, formatItemDisplay } from '../../../utils/utils';

const props = defineProps(['showUserInfo', 'userInfo', 'showImage']);
const emit = defineEmits(['update:showUserInfo', 'handleViewImage']);

const keysArrayRaffle = ['No. Of Entries', ...keysArray];

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && !props.showImage) {
    emit('update:showUserInfo', false);
  }
};
</script>
