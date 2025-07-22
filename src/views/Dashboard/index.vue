<template>
  <HeaderComponent v-model="activeTab" />

  <div class="mx-auto w-full max-w-[1600px]">
    <main v-if="!isLoading" class="pb-20">
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

            <DownloadBtn :data="tableData" />
          </div>
        </div>

        <TableData :tableData="tableData" :filteredData="filteredData" />
      </template>

      <RaffleData
        v-if="activeTab == 1"
        :tableData="tableData"
        @stopLoading="() => (isLoading = false)"
        @update:isLoading="isLoading = $event"
      />

      <Insights v-if="activeTab == 2" :tableData="tableData" />
    </main>

    <div v-else class="flex h-screen w-full items-center justify-center">
      <div class="loader text-warm-red"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { formatDate } from '../../utils/utils';
import HeaderComponent from './components/HeaderComponent.vue';
import SearchInput from './components/SearchInput.vue';
import FilterByBranch from './components/FilterByBranch.vue';
import FilterByDate from './components/FilterByDate.vue';
import DownloadBtn from './components/DownloadBtn.vue';
import TableData from './components/TableData.vue';
import RaffleData from './components/RaffleData.vue';
import Insights from './components/Insights.vue';

const isLoading = ref(false);
const activeTab = ref(0);
const tableData = ref([]);
const filteredData = ref([]);
const searchQuery = ref('');
const selectedBranch = ref('');
const selectedDate = ref(null);

let timeoutId = null;

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  isLoading.value = true;
  clearTimeout(timeoutId);

  const querySnapshot = await getDocs(collection(db, 'submissions'));
  const data = querySnapshot.docs.map((doc) => ({ ...doc.data() }));

  if (data) {
    tableData.value = data;
    filteredData.value = data;
  }

  timeoutId = setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};

watch(activeTab, (nV, oV) => {
  if (nV == 0) {
    fetchData();
  }
  if (nV == 1 || nV == 2) {
    startLoading();
  }
});

watch(searchQuery, (nV, oV) => {
  if (!nV && !selectedBranch.value && !selectedDate.value) {
    return (filteredData.value = tableData.value);
  }
});

watch(selectedBranch, (nV, oV) => {
  if (!nV && !searchQuery.value && !selectedDate.value) {
    return (filteredData.value = tableData.value);
  }

  searchQuery.value = '';
  selectedDate.value = null;

  filteredData.value = tableData.value.filter((item) => {
    return item.branch?.trim() === selectedBranch.value.trim();
  });
});

watch(selectedDate, (nV, oV) => {
  if (!nV && !searchQuery.value && !selectedBranch.value) {
    return (filteredData.value = tableData.value);
  }

  searchQuery.value = '';
  selectedBranch.value = '';

  filteredData.value = tableData.value.filter((item) => {
    return formatDate(item.dateOfPurchase) === formatDate(nV);
  });
});

const uniqueBranches = computed(() => {
  const allBranches = tableData.value.map((entry) => entry.branch);
  return [...new Set(allBranches)].filter(Boolean); // remove duplicates and falsy values
});

const startLoading = () => {
  isLoading.value = true;

  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    isLoading.value = false;
  }, 1500);
};

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
</script>
