<template>
  <HeaderComponent v-model="activeTab" />

  <main class="pb-20">
    <div
      class="bg-warm-red mx-4 sm:mx-10 rounded mt-3 p-4 flex gap-x-4 flex-col"
    >
      <SearchInput v-model="searchQuery" @handleSearch="handleSearch" />

      <div class="md:flex-row flex-col flex gap-x-4">
        <FilterByBranch
          v-model="selectedBranch"
          :uniqueBranches="uniqueBranches"
        />
        <FilterByDate v-model="selectedDate" />
      </div>
    </div>

    <TableData
      v-if="activeTab == 0"
      :filteredData="filteredData"
      :keysArray="keysArray"
      :isLoading="isLoading"
    />

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
          <strong>Full Name:</strong> {{ winner['Full Name'] }}
        </p>
        <p class="text-maroon">
          <strong>Mobile Number:</strong>
          {{ formatMobileNumber(winner['Mobile Number']) }}
        </p>
        <p class="text-maroon">
          <strong>Email Address:</strong> {{ winner['Email Address'] }}
        </p>
        <p class="text-maroon">
          <strong>Birthdate:</strong> {{ winner['Birthdate'] }}
        </p>
        <p class="text-maroon">
          <strong>Residential Address:</strong>
          {{ winner['Residential Address'] }}
        </p>
        <p class="text-maroon">
          <strong>Branch:</strong> {{ winner['Branch'] }}
        </p>
        <p class="text-maroon">
          <strong>Date of Purchase:</strong> {{ winner['Date of Purchase'] }}
        </p>
        <p class="text-maroon">
          <strong>Receipt / Invoice Number:</strong>
          {{ winner['Receipt / Invoice Number'] }}
        </p>
        <p class="text-maroon">
          <strong>Date Submitted</strong>
          {{ convertUTCtoPH(winner['Submitted at']) }}
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import SearchInput from './components/SearchInput.vue';
import FilterByBranch from './components/FilterByBranch.vue';
import FilterByDate from './components/FilterByDate.vue';
import TableData from './components/TableData.vue';
import Papa from 'papaparse';
import { onMounted, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import {
  convertUTCtoPH,
  formatDate,
  formatMobileNumber,
} from '../../utils/utils';

const isLoading = ref(true);
const activeTab = ref(0);
const tableData = ref([]);
const filteredData = ref([]);
const searchQuery = ref('');
const selectedBranch = ref('');
const selectedDate = ref(null);

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

onMounted(async () => {
  try {
    const url =
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vQre9rhyGmyxhttVr04BT5dV95Wh5ZxIpz7dgJ9_w3kNiKHsxM4pwZjxC6xbNViSsopdraS1PJrkoGJ/pub?gid=0&single=true&output=csv';

    const response = await fetch(url);
    const csvText = await response.text();

    Papa.parse(csvText, {
      header: true, // assumes first row is column names
      skipEmptyLines: true,
      complete: (results) => {
        tableData.value = results.data;
        filteredData.value = results.data;
        isLoading.value = false;
      },
    });
  } catch (err) {
    console.error('Error fetching/parsing CSV:', err);
  }
});

const uniqueBranches = computed(() => {
  const allBranches = tableData.value.map((entry) => entry['Branch']);
  return [...new Set(allBranches)].filter(Boolean); // remove duplicates and falsy values
});

watch(searchQuery, (nV, oV) => {
  if (!nV) {
    return (filteredData.value = tableData.value);
  }
});

watch(selectedBranch, (nV, oV) => {
  if (!nV) {
    return (filteredData.value = tableData.value);
  }

  searchQuery.value = '';
  selectedDate.value = null;

  return (filteredData.value = tableData.value.filter(
    (entry) => entry['Branch']?.trim() === selectedBranch.value.trim()
  ));
});

watch(selectedDate, (nV, oV) => {
  if (!nV) {
    return (filteredData.value = tableData.value);
  }

  searchQuery.value = '';
  selectedBranch.value = '';

  return (filteredData.value = tableData.value.filter((item) => {
    const submittedDate = convertUTCtoPH(item['Submitted at']).split(' ')[0];
    return submittedDate === formatDate(nV);
  }));
});

const handleSearch = () => {
  const search = searchQuery.value.toLowerCase().trim();

  filteredData.value = tableData.value.filter((entry) => {
    if (!search) return true;

    // selectedBranch.value = "";
    // selectedDate.value = "";

    const values = Object.values(entry).join(' ').toLowerCase();

    return values.includes(search);
  });
};

const router = useRouter();

function handleLogout() {
  router.push('/');
}

const winner = ref(null);

const pickRandomWinner = () => {
  if (!tableData.value.length) {
    winner.value = null;
    return;
  }

  const randomIndex = Math.floor(Math.random() * tableData.value.length);
  winner.value = tableData.value[randomIndex];
};
</script>

<style lang="scss" scoped></style>
