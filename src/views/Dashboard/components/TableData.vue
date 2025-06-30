<template>
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 mt-10">
    <thead class="text-xs text-maroon uppercase bg-transparent">
      <tr class="border-b border-maroon">
        <th
          v-for="(item, idx) in keysArray"
          :key="idx"
          scope="col"
          class="px-4 py-3"
        >
          {{ item == "Submitted at" ? "Date Submitted" : item }}
        </th>
      </tr>
    </thead>
    <tbody class="space-y-2">
      <tr
        v-for="(entry, index) in filteredData"
        :key="index"
        :class="index % 2 ? 'bg-c-white' : 'bg-c-beige'"
      >
        <td
          v-for="(item, idx) in keysArray"
          :key="idx"
          scope="row"
          class="px-4 py-4 mb-2 font-medium text-maroon whitespace-nowrap"
        >
          <span
            v-if="item == 'Upload Receipt'"
            class="cursor-pointer"
            @click="handleViewImage(entry['Upload Receipt'])"
          >
            View
          </span>

          {{ item == "id" ? index + 1 : formatItemDisplay(item, entry) }}
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Popup Modal -->
  <div
    v-if="showPopup"
    class="fixed inset-0 bg-gray-200/30 backdrop-blur-xs backdrop-saturate-150 flex items-center justify-center z-50"
  >
    <div
      class="bg-white p-5 rounded-lg relative shadow-xl h-[90%] w-[600px] flex items-center justify-center"
    >
      <!-- Close Button -->
      <button
        @click="showPopup = false"
        class="absolute top-2 right-4 text-black text-xl font-bold cursor-pointer"
      >
        &times;
      </button>

      <img :src="imageSrc" alt="popup image" class="h-full" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  calculateEntries,
  formatMobileNumber,
  convertUTCtoPH,
  formatToPeso,
} from "../../../utils/utils";

defineProps(["filteredData", "keysArray"]);

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

const formatCenter = (itemName) => {
  const itemNameList = ["No. Of Entries", "Upload Receipt"];

  return itemNameList.includes(itemName);
};

const showPopup = ref(false);
const imageSrc = ref("");

const handleViewImage = (imgSrc) => {
  imageSrc.value = imgSrc;
  showPopup.value = true;
};
</script>
