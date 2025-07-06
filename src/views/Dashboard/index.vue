<template>
  <div class="mx-auto w-full max-w-[1600px]">
    <HeaderComponent v-model="activeTab" />

    <main class="pb-20">
      <template v-if="activeTab == 0">
        <div
          class="bg-warm-red mx-4 mt-4 flex flex-col gap-x-4 rounded p-4 sm:mx-10"
        >
          <SearchInput v-model="searchQuery" @handleSearch="handleSearch" />

          <div class="flex flex-col gap-x-4 md:flex-row">
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
        @update:isLoading="isLoading = $event"
      />
    </main>
  </div>
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
import { convertUTCtoPH, formatDate } from '../../utils/utils';

const isLoading = ref(false);
const activeTab = ref(0);
const tableData = ref([]);
const filteredData = ref([]);
const searchQuery = ref('');
const selectedBranch = ref('');
const selectedDate = ref(null);

onMounted(() => {
  fetchData();
});

watch(activeTab, (nV, oV) => {
  if (nV == 0) {
    fetchData();
  }
  if (nV == 1) {
    isLoading.value = true;
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

  filteredData.value = tableData.value.filter((entry) => {
    return entry['Branch']?.trim() === selectedBranch.value.trim();
  });
});

watch(selectedDate, (nV, oV) => {
  if (!nV) {
    return (filteredData.value = tableData.value);
  }

  searchQuery.value = '';
  selectedBranch.value = '';

  filteredData.value = tableData.value.filter((item) => {
    const submittedDate = convertUTCtoPH(item['Submitted at']).split(' ')[0];
    return submittedDate === formatDate(nV);
  });
});

const fetchData = async () => {
  isLoading.value = true;

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
    isLoading.value = false;
    console.error('Error fetching/parsing CSV:', err);
  }
};

const uniqueBranches = computed(() => {
  const allBranches = tableData.value.map((entry) => entry['Branch']);
  return [...new Set(allBranches)].filter(Boolean); // remove duplicates and falsy values
});

const handleSearch = () => {
  const search = searchQuery.value.toLowerCase().trim();

  filteredData.value = tableData.value.filter((entry) => {
    if (!search) return true;

    selectedBranch.value = '';
    selectedDate.value = null;

    const values = Object.values(entry).join(' ').toLowerCase();

    return values.includes(search);
  });
};

const handleViewInfo = (info) => {
  console.log(1);
};
</script>

<style lang="scss" scoped></style>
