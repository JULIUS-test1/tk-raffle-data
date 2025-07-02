<template>
  <div class="mx-auto">
    <div class="flex">
      <div
        v-for="(item, idx) in keysArray"
        :key="idx"
        class="outline1 px-1 py-3 text-xs shrink-0 font-sb !uppercase leading-5 items-center flex !text-maroon border-b-2 border-maroon"
        :class="formatWidth(item)"
      >
        {{ item == "Submitted at" ? "Date Submitted" : item }}
      </div>
    </div>

    <div class="h-[600px] overflow-y-auto">
      <div
        class="flex shrink-0 my-3 w-fit rounded-md bg-c-white"
        v-for="(entry, index) in paginatedItems"
        :key="index"
      >
        <div
          v-for="(item, idx) in keysArray"
          :key="idx"
          class="outline1 px-1 py-3 text-xs shrink-0 font-sb leading-5 flex text-maroon break-all"
          :class="formatWidth(item)"
        >
          <span
            v-if="item == 'Upload Receipt'"
            class="cursor-pointer"
            @click="handleViewImage(entry['Upload Receipt'])"
          >
            View
          </span>

          {{
            item == "id"
              ? (currentPage - 1) * itemsPerPage + index + 1
              : formatItemDisplay(item, entry)
          }}
        </div>
      </div>
    </div>
  </div>

  <!-- Pagination UI -->
  <div class="flex justify-center items-center gap-1 text-sm">
    <!-- Previous Button -->
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4"
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
        'px-3 py-1 rounded transition',
        page === currentPage
          ? 'bg-blue-600 text-white font-bold'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      ]"
    >
      {{ page }}
    </button>

    <!-- Next Button -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4"
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

  <!-- Popup Modal -->
  <div
    v-if="showPopup"
    class="fixed inset-0 bg-gray-200/30 backdrop-blur-xs backdrop-saturate-150 flex items-center justify-center z-50"
  >
    <div
      class="bg-white py-5 px-12 rounded-lg relative shadow-xl h-[90%] w-[600px] flex items-center justify-center"
    >
      <button
        @click="showPopup = false"
        class="absolute top-3 right-4 text-black text-xl font-bold cursor-pointer"
      >
        ✕
      </button>

      <img :src="imageSrc" alt="popup image" class="max-h-full" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import {
  calculateEntries,
  formatMobileNumber,
  convertUTCtoPH,
  formatToPeso,
} from "../../../utils/utils";

const props = defineProps(["filteredData", "keysArray"]);

const formatItemDisplay = (itemName, entry) => {
  if (itemName == "No. Of Entries") {
    return calculateEntries(entry["Purchase Amount"]);
  }
  if (itemName == "Mobile Number") return formatMobileNumber(entry[itemName]);
  if (itemName == "Purchase Amount") return formatToPeso(entry[itemName]);
  if (itemName == "Submitted at") return convertUTCtoPH(entry[itemName]);
  if (itemName == "Upload Receipt") return "";

  return entry[itemName];
};

const formatWidth = (itemName) => {
  switch (itemName) {
    case "id":
      return "w-[40px] justify-center";
    case "No. Of Entries":
      return "w-[80px] justify-center text-center";
    case "Full Name":
      return "w-[210px]";
    case "Mobile Number":
      return "w-[100px] justify-center";
    case "Email Address":
      return "w-[140px]";
    case "Birthdate":
      return "w-[80px] justify-center";
    case "Residential Address":
      return "w-[200px]";
    case "Branch":
      return "w-[200px]";
    case "Date of Purchase":
      return "w-[80px] justify-center text-center";
    case "Purchase Amount":
      return "w-[130px]";
    case "Receipt / Invoice Number":
      return "w-[120px]";
    case "Upload Receipt":
      return "w-[70px] justify-center text-center text-warm-red";
    case "Submitted at":
      return "w-[150px] justify-center";
  }
};

const showPopup = ref(false);
const imageSrc = ref("");

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
