<template>
  <div class="flex flex-col grow mt-5">
    <p class="text-c-beige mb-1 text-md">Filter by date submitted</p>

    <VueDatePicker
      :auto-apply="true"
      :model-value="modelValue"
      :enable-time-picker="false"
      placeholder="Pick a date"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "../../../../node_modules/@vuepic/vue-datepicker/dist/main.css";

defineProps({
  modelValue: [Date, String, null],
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
:deep(.dp__input) {
  height: 45px !important;
  background: #dc573c !important;
  color: #f5f5dc !important;
  font-family: "Squad-Bold" !important;
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
