<template>
  <div class="relative overflow-x-auto p-8">
    <h1 class="text-center text-3xl font-bold text-gray-600">
      Tapa King Raffle Data
    </h1>

    <!-- Search -->
    <div class="relative w-full mt-10 mb-6 mx-auto max-w-md">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>

      <input
        type="search"
        v-model="searchQuery"
        id="default-search"
        class="block w-full p-4 ps-10 pe-32 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-100 focus:ring-gray-500 focus:border-gray-500"
        placeholder="Search here"
        required
      />

      <button
        v-if="searchQuery"
        @click="searchQuery = ''"
        type="button"
        class="absolute end-26 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 text-md cursor-pointer"
      >
        ✕
      </button>

      <button
        type="submit"
        class="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer"
        @click="handleSearch"
      >
        Search
      </button>
    </div>

    <!-- Filter by branch -->
    <div class="relative w-full mx-auto max-w-md">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      </div>

      <select
        v-model="selectedBranch"
        id="branch-filter"
        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-100 focus:ring-gray-500 focus:border-gray-500 cursor-pointer"
      >
        <option value="">Filter by branch</option>
        <option v-for="branch in uniqueBranches" :key="branch" :value="branch">
          {{ branch }}
        </option>
      </select>
    </div>

    <!-- Table -->
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 mt-10">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr class="border border-gray-300">
          <th scope="col" class="px-4 py-3">ID</th>
          <th scope="col" class="px-4 py-3">Full Name</th>
          <th scope="col" class="px-4 py-3">Mobile Number</th>
          <th scope="col" class="px-4 py-3">Email Address</th>
          <th scope="col" class="px-4 py-3">Birthdate</th>
          <th scope="col" class="px-4 py-3">Residential Address</th>
          <th scope="col" class="px-4 py-3">Branch</th>
          <th scope="col" class="px-4 py-3">Date of Purchase</th>
          <th scope="col" class="px-4 py-3">Receipt / Invoice Number</th>
          <th scope="col" class="px-4 py-3">Receipt</th>
          <th scope="col" class="px-4 py-3">Date Submitted</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entry, index) in filteredData"
          :key="index"
          class="border border-gray-300"
          :class="{ 'bg-gray-200': index % 2 }"
        >
          <td
            scope="row"
            class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ index + 1 }}
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ entry["Full Name"] }}
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ formatMobileNumber(entry["Mobile Number"]) }}
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ entry["Email Address"] }}
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ entry["Birthdate"] }}
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ entry["Residential Address"] }}
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ entry["Select Branch"] }}
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ entry["Date of Purchase"] }}
          </td>

          <td
            scope="row"
            class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ entry["Receipt / Invoice Number"] }}
          </td>

          <td
            scope="row"
            class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            <button
              class="border border-gray-400 px-2 py-1 rounded-sm cursor-pointer"
              @click="handleViewImage(entry['Upload Receipt'])"
            >
              View
            </button>
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ convertUTCtoPH(entry["Submitted at"]) }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Button to Pick Winner -->
    <div class="text-center my-6">
      <button
        @click="pickRandomWinner"
        class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow cursor-pointer"
      >
        Pick Random Winner
      </button>
    </div>

    <!-- Winner Display -->
    <div
      v-if="winner"
      class="mt-4 border rounded-lg p-4 bg-green-50 max-w-md mx-auto shadow mb-20"
    >
      <h2 class="text-lg font-bold mb-2 text-green-700">🎉 Winner Selected!</h2>
      <p><strong>Full Name:</strong> {{ winner["Full Name"] }}</p>
      <p>
        <strong>Mobile Number:</strong>
        {{ formatMobileNumber(winner["Mobile Number"]) }}
      </p>
      <p><strong>Email Address:</strong> {{ winner["Email Address"] }}</p>
      <p><strong>Birthdate:</strong> {{ winner["Birthdate"] }}</p>
      <p>
        <strong>Residential Address:</strong>
        {{ winner["Residential Address"] }}
      </p>
      <p><strong>Branch:</strong> {{ winner["Select Branch"] }}</p>
      <p><strong>Date of Purchase:</strong> {{ winner["Date of Purchase"] }}</p>
      <p>
        <strong>Receipt / Invoice Number:</strong>
        {{ winner["Receipt / Invoice Number"] }}
      </p>
      <p>
        <strong>Date Submitted</strong>
        {{ convertUTCtoPH(winner["Submitted at"]) }}
      </p>
    </div>
  </div>

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

      <img
        :src="imageSrc"
        alt="popup image"
        class="h-full border border-black"
      />
    </div>
  </div>
</template>

<script setup>
import Papa from "papaparse";
import { onMounted, ref, computed, watch } from "vue";

const sheetData = ref([]);
const filteredData = ref([]);
const searchQuery = ref("");
const selectedBranch = ref("");

onMounted(async () => {
  try {
    const response = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSgh3MPft1AsPXHJ45RmV3gD5OiodemdKO8jGB_KHuz0ESDM0KNENLe_VfxERzTJu-r_77-XqawvidO/pub?gid=0&single=true&output=csv"
    );
    const csvText = await response.text();

    Papa.parse(csvText, {
      header: true, // assumes first row is column names
      skipEmptyLines: true,
      complete: (results) => {
        sheetData.value = results.data;
        filteredData.value = results.data;
        console.log("Parsed data:", sheetData.value);
      },
    });
  } catch (err) {
    console.error("Error fetching/parsing CSV:", err);
  }
});

function convertUTCtoPH(utcDateTimeString) {
  // Add "Z" to make sure JavaScript treats it as UTC
  const utcDate = new Date(utcDateTimeString + "Z");

  // Format as Asia/Manila time in 12-hour format
  const phTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(utcDate);

  return phTime;
}

function formatMobileNumber(number) {
  return number.replace("63", "0");
}

const uniqueBranches = computed(() => {
  const allBranches = sheetData.value.map((entry) => entry["Select Branch"]);
  return [...new Set(allBranches)].filter(Boolean); // remove duplicates and falsy values
});

watch(selectedBranch, (nV, oV) => {
  if (!nV) {
    return (filteredData.value = sheetData.value);
  }

  searchQuery.value = "";

  return (filteredData.value = sheetData.value.filter(
    (entry) => entry["Select Branch"]?.trim() === selectedBranch.value.trim()
  ));
});

watch(searchQuery, (nV, oV) => {
  if (!nV) {
    return (filteredData.value = sheetData.value);
  }
});

const handleSearch = () => {
  const search = searchQuery.value.toLowerCase().trim();

  filteredData.value = sheetData.value.filter((entry) => {
    if (!search) return true;

    const values = Object.values(entry).join(" ").toLowerCase();
    return values.includes(search);
  });
};

const showPopup = ref(false);
const imageSrc = ref("");

function handleViewImage(imgSrc) {
  imageSrc.value = imgSrc;
  showPopup.value = true;
}

const winner = ref(null);

const pickRandomWinner = () => {
  if (!sheetData.value.length) {
    winner.value = null;
    return;
  }

  const randomIndex = Math.floor(Math.random() * sheetData.value.length);
  winner.value = sheetData.value[randomIndex];
};
</script>

<style lang="scss" scoped></style>
