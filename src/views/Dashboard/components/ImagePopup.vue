<template>
  <div
    v-if="showImage"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/30 backdrop-blur-xs backdrop-saturate-150"
  >
    <div
      class="relative flex h-[90%] w-[600px] items-center justify-center rounded-lg bg-white px-12 py-5 shadow-xl"
    >
      <button
        @click="emit('update:showImage', false)"
        class="absolute top-3 right-4 cursor-pointer text-xl font-bold text-black"
      >
        ✕
      </button>

      <img
        v-if="imageSrc"
        :src="imageSrc"
        alt="Receipt image"
        class="max-h-full"
      />

      <div v-else class="flex h-full flex-col gap-y-8 overflow-y-auto">
        <img
          v-for="(item, idx) in imageSrcList"
          :key="idx"
          :src="item"
          alt="Receipt image"
          class="max-h-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

const props = defineProps(['showImage', 'imageSrc', 'imageSrcList']);
const emit = defineEmits(['update:showImage']);

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && props.showImage) {
    emit('update:showImage', false);
  }
};
</script>
