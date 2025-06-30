<template>
  <div class="flex flex-col grow mt-5">
    <p class="text-c-beige mb-1 text-md">Filter by date submitted</p>

    <DatePicker
      text-input
      auto-apply
      :model-value="modelValue"
      class="block w-full p-3 text-sm text-c-beige border border-transparent rounded bg-red-1 cursor-pointer focus:ring-c-beige focus:border-c-beige placeholder:text-c-beige"
      placeholder="Pick a date"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup>
import DatePicker from "vue3-datepicker";

defineProps({
  modelValue: [Date, String, null],
});

defineEmits(["update:modelValue"]);
</script>
