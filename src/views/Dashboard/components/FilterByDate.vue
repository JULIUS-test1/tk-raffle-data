<template>
  <div class="mt-5 flex flex-1 flex-col">
    <p class="text-c-beige text-md mb-1">Filter by date of purchase</p>

    <div class="relative w-full">
      <VueDatePicker
        :auto-apply="true"
        :model-value="modelValue"
        :enable-time-picker="false"
        placeholder="Pick a date"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '../../../../node_modules/@vuepic/vue-datepicker/dist/main.css';

defineProps({
  modelValue: [Date, String, null],
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
:deep(.dp__input) {
  height: 45px !important;
  background: #dc573c !important;
  color: #f5f5dc !important;
  font-family: 'Squad-Bold' !important;
  font-size: 0.875rem !important;
  outline: none;
  border: none !important;
  border-radius: 4px;
  padding-top: 8px;
}

:deep(.dp__input):hover {
  border: none !important;
}

:deep(.dp__input::placeholder) {
  color: #ede5d2 !important;
  opacity: 1;
}

:deep(.dp__input_icons) {
  color: #ede5d2 !important;
}
</style>
