<template>
  <div class="mt-5 flex min-w-fit flex-col">
    <p class="text-c-beige text-md mb-1">CSV File</p>

    <button
      @click="downloadCSV"
      class="text-c-beige focus:ring-c-beige focus:border-c-beige bg-red-1 flex h-[45px] w-full cursor-pointer items-center gap-2 rounded border border-transparent p-3 pt-3.5 pb-2.5 text-sm focus:outline-none"
    >
      <span>Download</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-5 w-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { columnsData } from '../../../utils/utils';

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  filename: {
    type: String,
    default: 'raffle-data.csv',
  },
});

const convertToCSV = (arr) => {
  if (!arr.length || !columnsData.slice(1).length) return '';
  const keys = columnsData.slice(1).map((col) => col.key);
  const header = columnsData
    .slice(1)
    .map((col) => col.label)
    .join(',');
  const csvRows = [header];
  for (const row of arr) {
    const values = keys.map((k) => {
      let val = row[k] ?? '';
      if (typeof val === 'string') {
        val = '"' + val.replace(/"/g, '""') + '"';
      }
      return val;
    });
    csvRows.push(values.join(','));
  }
  return csvRows.join('\r\n');
};

const downloadCSV = () => {
  const csv = convertToCSV(props.data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', props.filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>
