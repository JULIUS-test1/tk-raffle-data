<template>
  <!-- <HeaderPage /> -->

  <header
    class="min-h-30 bg-warm-red px-4 sm:px-10 pt-4 flex flex-col justify-between pb-[2px] shadow-2xs w-full"
  >
    <div class="flex justify-between">
      <img src="/src/assets/tpk-logo-white.png" alt="tpk-logo" class="w-40" />

      <button
        @click="handleLogout"
        class="flex items-center space-x-2 text-c-beige cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center gap-x-7 px-3">
      <div
        class="text-c-beige border-b-[3px] px-1 w-fit cursor-pointer pb-1"
        :class="activeTab == 0 ? 'border-c-beige' : 'border-transparent'"
        @click="activeTab = 0"
      >
        Raffle Entries
      </div>
      <div
        class="text-c-beige border-b-[3px] px-1 w-fit cursor-pointer pb-1"
        :class="activeTab == 1 ? 'border-c-beige' : 'border-transparent'"
        @click="activeTab = 1"
      >
        Pick Winners
      </div>
    </div>
  </header>

  <main class="px-4 sm:px-10">
    <!-- <SearchComponent
        :searchQuery="searchQuery"
        :uniqueBranches="uniqueBranches"
      />

      <TableComponent :filteredData="filteredData" /> -->

    <div
      class="bg-warm-red rounded-lg mt-3 p-4 flex gap-x-4 sm:flex-row flex-col"
      v-if="activeTab == 0"
    >
      <div class="flex flex-col grow">
        <p class="text-c-beige mb-1 text-md">What are you looking for?</p>

        <!-- Search -->
        <div class="relative w-full">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-c-beige"
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
            class="block w-full p-3 ps-10 pe-26 text-sm text-c-beige placeholder-c-beige border-transparent rounded bg-red-1 focus:ring-c-beige focus:border-c-beige"
            placeholder="Search for name, address etc."
            required
          />

          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            type="button"
            class="absolute end-20 top-1/2 -translate-y-1/2 text-c-beige text-md cursor-pointer"
          >
            ✕
          </button>

          <button
            type="submit"
            class="text-warm-red absolute end-2 top-1/2 -translate-y-1/2 bg-c-beige hover:bg-warm-red-h hover:text-c-beige focus:ring-1 focus:outline-none focus:ring-gray-300 rounded text-sm px-2 py-1 cursor-pointer"
            @click.stop="handleSearch"
          >
            Search
          </button>
        </div>
      </div>

      <div class="flex flex-col grow">
        <p class="text-c-beige mb-1 text-md">Branch</p>

        <div class="relative w-full">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-c-beige"
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
            class="block w-full p-3 ps-10 text-sm text-c-beige border border-transparent rounded bg-red-1 focus:ring-c-beige focus:outline-none focus:border-c-beige cursor-pointer"
          >
            <option value="">Filter by branch</option>
            <option
              v-for="branch in uniqueBranches"
              :key="branch"
              :value="branch"
            >
              {{ branch }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex flex-col grow">
        <p class="text-c-beige mb-1 text-md">Date Submitted</p>

        <div class="relative w-full">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <!-- Calendar Icon -->
            <svg
              class="w-4 h-4 text-c-beige"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <input
            type="date"
            v-model="selectedDate"
            class="block w-full p-3 ps-10 text-sm text-c-beige border border-transparent rounded bg-red-1 cursor-pointer appearance-none focus:ring-c-beige focus:border-c-beige"
            placeholder="Filter by Date"
          />
        </div>
      </div>
    </div>

    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 mt-10"
      v-if="activeTab == 0"
    >
      <thead class="text-xs text-maroon uppercase bg-transparent">
        <tr class="border-b border-maroon">
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
      <tbody class="space-y-2">
        <tr
          v-for="(entry, index) in filteredData"
          :key="index"
          :class="index % 2 ? 'bg-c-white' : 'bg-c-beige'"
        >
          <td
            scope="row"
            class="px-4 py-4 mb-2 font-medium text-maroon whitespace-nowrap"
          >
            {{ index + 1 }}
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-maroon whitespace-nowrap"
          >
            {{ entry["Full Name"] }}
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-maroon whitespace-nowrap"
          >
            {{ formatMobileNumber(entry["Mobile Number"]) }}
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-maroon whitespace-nowrap"
          >
            {{ entry["Email Address"] }}
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-maroon whitespace-nowrap"
          >
            {{ entry["Birthdate"] }}
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-maroon whitespace-nowrap"
          >
            {{ entry["Residential Address"] }}
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-maroon whitespace-nowrap"
          >
            {{ entry["Select Branch"] }}
          </td>
          <td
            scope="row"
            class="px-4 py-4 font-medium text-maroon whitespace-nowrap"
          >
            {{ entry["Date of Purchase"] }}
          </td>

          <td
            scope="row"
            class="px-4 py-4 font-medium text-maroon whitespace-nowrap"
          >
            {{ entry["Receipt / Invoice Number"] }}
          </td>

          <td
            scope="row"
            class="px-4 py-4 font-medium text-maroon whitespace-nowrap"
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
            class="px-4 py-4 font-medium text-maroon whitespace-nowrap"
          >
            {{ convertUTCtoPH(entry["Submitted at"]) }}
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

    <div
      class="h-screen flex flex-col items-center justify-center"
      v-if="activeTab == 1"
    >
      <!-- Button to Pick Winner -->
      <div class="text-center my-6">
        <button
          @click="pickRandomWinner"
          class="bg-warm-red hover:bg-warm-red-h text-white font-bold py-2 px-6 rounded-lg shadow cursor-pointer"
        >
          Pick Random Winner
        </button>
      </div>

      <!-- Winner Display -->
      <div
        v-if="winner"
        class="mt-4 rounded-md p-4 bg-green-50 max-w-md mx-auto shadow-2xs mb-20"
      >
        <h2 class="text-lg font-bold mb-2 text-warm-red">
          🎉 Winner Selected!
        </h2>
        <p class="text-maroon">
          <strong>Full Name:</strong> {{ winner["Full Name"] }}
        </p>
        <p class="text-maroon">
          <strong>Mobile Number:</strong>
          {{ formatMobileNumber(winner["Mobile Number"]) }}
        </p>
        <p class="text-maroon">
          <strong>Email Address:</strong> {{ winner["Email Address"] }}
        </p>
        <p class="text-maroon">
          <strong>Birthdate:</strong> {{ winner["Birthdate"] }}
        </p>
        <p class="text-maroon">
          <strong>Residential Address:</strong>
          {{ winner["Residential Address"] }}
        </p>
        <p class="text-maroon">
          <strong>Branch:</strong> {{ winner["Select Branch"] }}
        </p>
        <p class="text-maroon">
          <strong>Date of Purchase:</strong> {{ winner["Date of Purchase"] }}
        </p>
        <p class="text-maroon">
          <strong>Receipt / Invoice Number:</strong>
          {{ winner["Receipt / Invoice Number"] }}
        </p>
        <p class="text-maroon">
          <strong>Date Submitted</strong>
          {{ convertUTCtoPH(winner["Submitted at"]) }}
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import HeaderPage from "../../components/Header.vue";
import SearchComponent from "./components/SearchComponent.vue";
import TableComponent from "./components/TableComponent.vue";
import Papa from "papaparse";
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const activeTab = ref(0);
const sheetData = ref([]);
const filteredData = ref([]);
const searchQuery = ref("");
const selectedBranch = ref("");
const selectedDate = ref("");

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

watch(searchQuery, (nV, oV) => {
  if (!nV) {
    return (filteredData.value = sheetData.value);
  }
});

watch(selectedBranch, (nV, oV) => {
  if (!nV) {
    return (filteredData.value = sheetData.value);
  }

  searchQuery.value = "";
  selectedDate.value = "";

  return (filteredData.value = sheetData.value.filter(
    (entry) => entry["Select Branch"]?.trim() === selectedBranch.value.trim()
  ));
});

watch(selectedDate, (nV, oV) => {
  if (!nV) {
    return (filteredData.value = sheetData.value);
  }

  searchQuery.value = "";
  selectedBranch.value = "";

  return (filteredData.value = sheetData.value.filter((item) => {
    const submittedDate = item["Submitted at"].split(" ")[0]; // Get only YYYY-MM-DD
    return submittedDate === nV;
  }));
});

const handleSearch = () => {
  const search = searchQuery.value.toLowerCase().trim();

  filteredData.value = sheetData.value.filter((entry) => {
    if (!search) return true;

    selectedBranch.value = "";
    selectedDate.value = "";

    const values = Object.values(entry).join(" ").toLowerCase();
    return values.includes(search);
  });
};

function filterByDate(data, targetDate) {}

const showPopup = ref(false);
const imageSrc = ref("");

function handleViewImage(imgSrc) {
  imageSrc.value = imgSrc;
  showPopup.value = true;
}

const router = useRouter();

function handleLogout() {
  router.push("/");
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
