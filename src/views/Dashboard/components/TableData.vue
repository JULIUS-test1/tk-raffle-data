<template>
  <div
    v-if="!filteredData?.length && !tableData?.length"
    class="flex h-[570px] flex-col items-center justify-center py-16 text-center"
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
        d="M4.5 4.5l15 15M12 3a9 9 0 019 9c0 2.21-.8 4.24-2.13 5.8m-2.26 1.94A8.966 8.966 0 0112 21a9 9 0 010-18"
      />
    </svg>

    <p class="text-warm-red mb-2 text-3xl">No Data found</p>
  </div>

  <template v-else>
    <div v-if="filteredData?.length" class="mx-auto overflow-auto px-2">
      <div class="mx-auto flex w-fit">
        <div
          v-for="(item, idx) in columnsData"
          :key="idx"
          class="font-sb !text-maroon border-maroon flex shrink-0 items-center border-b-2 px-1 py-3 text-xs leading-5 !uppercase"
          :class="formatWidth(item.label)"
        >
          {{ item.key == 'submittedAt' ? 'Date Submitted' : item.label }}
        </div>
      </div>
      <div class="mx-auto h-[570px] w-fit">
        <div
          class="bg-c-white my-3 flex w-fit rounded-md"
          v-for="(entry, index) in paginatedItems"
          :key="index"
        >
          <div
            v-for="(item, idx) in columnsData"
            :key="idx"
            class="font-sb text-maroon flex shrink-0 px-1 py-3 text-xs leading-5 break-all"
            :class="formatWidth(item.label)"
          >
            <span
              v-if="item.label == 'Upload Receipt'"
              class="cursor-pointer hover:underline"
              @click="handleViewImage(entry[item.key])"
            >
              view
            </span>
            <template v-else>
              {{
                item.label == 'id'
                  ? formatId(index)
                  : formatItemDisplay(item.label, entry[item.key])
              }}
            </template>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="flex h-[570px] flex-col items-center justify-center py-16 text-center"
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
      class="mt-5 flex items-center justify-center gap-1 text-sm"
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

  <ImagePopup
    v-model:showImage="showImage"
    :imageSrc="imageSrc"
    :imageSrcList="imageSrcList"
  />
</template>

<script setup>
import { ref, computed } from 'vue';
import { columnsData, formatItemDisplay } from '../../../utils/utils';
import ImagePopup from './ImagePopup.vue';

const props = defineProps(['tableData', 'filteredData']);

const formatId = (index) => {
  return (currentPage.value - 1) * itemsPerPage + index + 1;
};

const formatWidth = (itemName) => {
  switch (itemName) {
    case 'id':
      return 'w-[40px] justify-center';
    case 'No. Of Entries':
      return 'w-[60px] justify-center text-center';
    case 'Full Name':
      return 'w-[160px]';
    case 'Mobile Number':
      return 'w-[100px] justify-center';
    case 'Email Address':
      return 'w-[160px]';
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
      return 'w-[110px] justify-center text-center';
    case 'Upload Receipt':
      return 'w-[70px] justify-center text-center text-warm-red';
    case 'Submitted at':
      return 'w-[150px] justify-center';
  }
};

const showImage = ref(false);
const imageSrc = ref('');
const imageSrcList = ref([]);

const handleViewImage = (imgSrc) => {
  if (imgSrc.length == 1) {
    imageSrc.value = imgSrc;
  } else {
    imageSrcList.value = imgSrc;
  }

  showImage.value = true;
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

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>
