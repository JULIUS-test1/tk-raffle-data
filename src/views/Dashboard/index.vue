<template>
  <!-- <HeaderComponent v-model="activeTab" /> -->

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
        @click="handleChangeTab(0)"
      >
        Raffle Entries
      </div>
      <div
        class="text-c-beige border-b-[3px] px-1 w-fit cursor-pointer pb-1"
        :class="activeTab == 1 ? 'border-c-beige' : 'border-transparent'"
        @click="handleChangeTab(1)"
      >
        Pick Winners
      </div>
    </div>
  </header>

  <main class="pb-20">
    <template v-if="activeTab == 0">
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

      <TableData :isLoading="isLoading" :filteredData="filteredData" />
    </template>

    <RaffleData
      v-if="activeTab == 1"
      :isLoading="isLoading"
      :tableData="tableData"
    />
  </main>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import SearchInput from './components/SearchInput.vue';
import FilterByBranch from './components/FilterByBranch.vue';
import FilterByDate from './components/FilterByDate.vue';
import TableData from './components/TableData.vue';
import RaffleData from './components/RaffleData.vue';
import Papa from 'papaparse';
import { onMounted, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { convertUTCtoPH, formatDate } from '../../utils/utils';

const isLoading = ref(true);
const activeTab = ref(0);
const tableData = ref([]);
const filteredData = ref([]);
const searchQuery = ref('');
const selectedBranch = ref('');
const selectedDate = ref(null);

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

const uniqueBranches = computed(() => {
  const allBranches = tableData.value.map((entry) => entry['Branch']);
  return [...new Set(allBranches)].filter(Boolean); // remove duplicates and falsy values
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

const handleViewInfo = (info) => {
  console.log(1);
};

const handleChangeTab = (i) => {
  activeTab.value = i;
  if (isLoading.value) return;
  isLoading.value = true;
};
</script>

<style lang="scss" scoped></style>
