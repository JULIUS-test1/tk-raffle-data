<template>
  <template v-if="!isLoading">
    <div
      v-if="filteredData?.length"
      class="mx-auto w-fit overflow-y-auto px-4 sm:px-10"
    >
      <div class="flex w-fit">
        <div
          v-for="(item, idx) in keysArray"
          :key="idx"
          class="font-sb !text-maroon border-maroon flex shrink-0 items-center border-b-2 px-1 py-3 text-xs leading-5 !uppercase"
          :class="formatWidth(item)"
        >
          {{ item == 'Submitted at' ? 'Date Submitted' : item }}
        </div>
      </div>

      <div class="h-[600px]">
        <div
          class="bg-c-white my-3 flex w-fit rounded-md"
          v-for="(entry, index) in paginatedItems"
          :key="index"
        >
          <div
            v-for="(item, idx) in keysArray"
            :key="idx"
            class="font-sb text-maroon flex shrink-0 px-1 py-3 text-xs leading-5 break-all"
            :class="formatWidth(item)"
          >
            <span
              v-if="item == 'Upload Receipt'"
              class="cursor-pointer underline"
              @click="handleViewImage(entry['Upload Receipt'])"
            >
              view
            </span>

            {{
              item == 'id' ? formatId(index) : formatItemDisplay(item, entry)
            }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="flex h-[600px] flex-col items-center justify-center py-16 text-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="text-warm-red mb-6 h-20 w-20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M21 21l-4.35-4.35m0 0A7 7 0 103.6 9.6a7 7 0 0013.05 7.05z"
        />
      </svg>
      <p class="text-warm-red mb-2 text-3xl">No results found</p>
      <p class="text-maroon text-lg">
        Try adjusting your filters or search term.
      </p>
    </div>

    <!-- Pagination UI -->
    <div
      v-if="filteredData?.length"
      class="flex items-center justify-center gap-1 text-sm"
    >
      <!-- Previous Button -->
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="cursor-pointer rounded bg-gray-100 p-2 hover:bg-gray-200 disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Page Numbers -->
      <button
        v-for="page in pagesToShow"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'flex h-8 w-8 cursor-pointer items-center justify-center rounded pt-[2px] transition',
          page === currentPage
            ? 'bg-warm-red font-bold text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        ]"
      >
        {{ page }}
      </button>

      <!-- Next Button -->
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="cursor-pointer rounded bg-gray-100 p-2 hover:bg-gray-200 disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </template>

  <div v-else class="flex h-[600px] w-full items-center justify-center">
    <div class="loader text-warm-red"></div>
  </div>

  <!-- Popup Modal -->
  <div
    v-if="showPopup"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/30 backdrop-blur-xs backdrop-saturate-150"
  >
    <div
      class="relative flex h-[90%] w-[600px] items-center justify-center rounded-lg bg-white px-12 py-5 shadow-xl"
    >
      <button
        @click="showPopup = false"
        class="absolute top-3 right-4 cursor-pointer text-xl font-bold text-black"
      >
        ✕
      </button>

      <img :src="imageSrc" alt="popup image" class="max-h-full" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  formatDate,
  calculateEntries,
  formatMobileNumber,
  convertUTCtoPH,
  formatToPeso,
} from '../../../utils/utils';

const props = defineProps(['isLoading', 'filteredData']);

const keysArray = ref([
  'id',
  'No. Of Entries',
  'Full Name',
  'Mobile Number',
  'Email Address',
  'Birthdate',
  'Residential Address',
  'Branch',
  'Date of Purchase',
  'Purchase Amount',
  'Receipt / Invoice Number',
  'Upload Receipt',
  'Submitted at',
]);

const formatId = (index) => {
  return (currentPage.value - 1) * itemsPerPage + index + 1;
};

const formatItemDisplay = (itemName, entry) => {
  if (itemName == 'No. Of Entries') {
    return calculateEntries(entry['Purchase Amount']);
  }
  if (itemName == 'Mobile Number') return formatMobileNumber(entry[itemName]);
  if (itemName == 'Birthdate') return formatDate(entry[itemName]);
  if (itemName == 'Purchase Amount') return formatToPeso(entry[itemName]);
  if (itemName == 'Submitted at') return convertUTCtoPH(entry[itemName]);
  if (itemName == 'Upload Receipt') return '';

  return entry[itemName];
};

const formatWidth = (itemName) => {
  switch (itemName) {
    case 'id':
      return 'w-[40px] justify-center';
    case 'No. Of Entries':
      return 'w-[80px] justify-center text-center';
    case 'Full Name':
      return 'w-[210px]';
    case 'Mobile Number':
      return 'w-[100px] justify-center';
    case 'Email Address':
      return 'w-[140px]';
    case 'Birthdate':
      return 'w-[80px] justify-center';
    case 'Residential Address':
      return 'w-[200px]';
    case 'Branch':
      return 'w-[200px]';
    case 'Date of Purchase':
      return 'w-[100px] justify-center text-center';
    case 'Purchase Amount':
      return 'w-[130px]';
    case 'Receipt / Invoice Number':
      return 'w-[110px]';
    case 'Upload Receipt':
      return 'w-[70px] justify-center text-center text-warm-red';
    case 'Submitted at':
      return 'w-[150px] justify-center';
  }
};

const showPopup = ref(false);
const imageSrc = ref('');

const handleViewImage = (imgSrc) => {
  imageSrc.value = imgSrc;
  showPopup.value = true;
};

const itemsPerPage = 10;
const currentPage = ref(1);
const maxVisible = 5;

// Total pages based on filteredData
const totalPages = computed(() =>
  Math.ceil(props.filteredData.length / itemsPerPage)
);

// Slice filteredData for current page
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.filteredData.slice(start, end);
});

// Compute visible page buttons
const pagesToShow = computed(() => {
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(currentPage.value - half, 1);
  let end = start + maxVisible - 1;

  if (end > totalPages.value) {
    end = totalPages.value;
    start = Math.max(end - maxVisible + 1, 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Page changer
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
</script>
