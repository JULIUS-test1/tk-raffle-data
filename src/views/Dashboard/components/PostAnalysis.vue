<template>
  <!-- <template v-if="!isLoading"> -->
  <div class="m-4">
    <h1 class="mb-6 text-2xl font-bold md:text-3xl">
      📊 Insights
    </h1>

    <section class="mb-10">
      <h2 class="mb-3 text-xl font-semibold">Entries per Branch</h2>
      <Bar :data="entriesPerBranch" :options="barOptions" />
    </section>

    <section class="mb-10">
      <h2 class="mb-2 text-xl font-semibold">
        Submission per Participant (Full Name)
      </h2>
      <Bar :data="entriesPerPerson" :options="barOptions" />
    </section>

    <section class="mb-10">
      <h2 class="mb-2 text-xl font-semibold">Total Purchase per Date</h2>
      <Line :data="totalPurchasePerDate" :options="barOptions" />
    </section>

    <section class="mb-10">
      <h2 class="mb-2 text-xl font-semibold">
        4. Total & Average Purchase per Branch
      </h2>
      <Bar :data="purchasePerBranch" :options="barOptions" />
    </section>

    <section class="mb-10">
      <h2 class="mb-2 text-xl font-semibold">Total Sales per Branch</h2>
      <Bar :data="totalSalesPerBranch" :options="barOptions" />
    </section>
  </div>
  <!-- </template> -->

  <!-- <div v-else class="flex h-[600px] w-full items-center justify-center">
    <div class="loader text-warm-red"></div>
  </div> -->
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { Bar, Line, Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

// ✅ Props
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  tableData: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:isLoading']);

onMounted(() => {
  setTimeout(() => {
    emit('update:isLoading', false);
  }, 1000);
});

// ✅ Shared chart options
const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true, // ✅ show the legend
      position: 'top', // optional: top, bottom, left, right
    },
  },
  scales: {
    y: {
      ticks: {
        precision: 0,
        // stepSize: 1,
        callback: (val) => (Number.isInteger(val) ? val : null),
      },
    },
  },
};

// ✅ 1. Entries per Branch
const entriesPerBranch = computed(() => {
  const count = {};
  props.tableData.forEach((row) => {
    const branch = row.Branch || 'Unknown';
    count[branch] = (count[branch] || 0) + 1;
  });

  return {
    labels: Object.keys(count),
    datasets: [
      {
        label: 'Entries',
        data: Object.values(count),
        backgroundColor: '#3b82f6',
      },
    ],
  };
});

// ✅ 2. Entries per Participant (Full Name)
const entriesPerPerson = computed(() => {
  const count = {};
  props.tableData.forEach((row) => {
    const name = row['Full Name'] || row.Name || 'Unknown';
    count[name] = (count[name] || 0) + 1;
  });

  return {
    labels: Object.keys(count),
    datasets: [
      {
        label: 'Entries',
        data: Object.values(count),
        backgroundColor: '#34d399',
      },
    ],
  };
});

// ✅ 3. Total Purchase per Date
const totalPurchasePerDate = computed(() => {
  const map = {};

  props.tableData.forEach((row) => {
    const date = row['Date of Purchase'] || 'Unknown';
    const amount = parseFloat(row['Purchase Amount'] || '0') || 0;
    if (!map[date]) map[date] = 0;
    map[date] += amount;
  });

  const sortedDates = Object.keys(map).sort();

  return {
    labels: sortedDates,
    datasets: [
      {
        label: 'Total Purchase',
        data: sortedDates.map((date) => map[date]),
        backgroundColor: '#facc15',
        borderColor: '#facc15',
      },
    ],
  };
});

// ✅ 4. Total & Average Purchase per Branch
const purchasePerBranch = computed(() => {
  const total = {};
  const count = {};

  props.tableData.forEach((row) => {
    const branch = row.Branch || 'Unknown';
    const amount = parseFloat(row['Purchase Amount'] || '0') || 0;

    total[branch] = (total[branch] || 0) + amount;
    count[branch] = (count[branch] || 0) + 1;
  });

  const branches = Object.keys(total);

  return {
    labels: branches,
    datasets: [
      {
        label: 'Total Purchase',
        data: branches.map((b) => total[b]),
        backgroundColor: '#6366f1',
      },
      {
        label: 'Average Purchase',
        data: branches.map((b) => (total[b] / count[b]).toFixed(2)),
        backgroundColor: '#f472b6',
      },
    ],
  };
});

// ✅ 5. Branch Share (Pie Chart)
const branchShare = computed(() => {
  const count = {};

  props.tableData.forEach((row) => {
    const branch = row.Branch || 'Unknown';
    count[branch] = (count[branch] || 0) + 1;
  });

  return {
    labels: Object.keys(count),
    datasets: [
      {
        data: Object.values(count),
        backgroundColor: [
          '#60a5fa',
          '#34d399',
          '#f87171',
          '#facc15',
          '#a78bfa',
        ],
      },
    ],
  };
});

// ✅ 6. Total Sales per Branch (Bar Chart)
const totalSalesPerBranch = computed(() => {
  const total = {};

  props.tableData.forEach((row) => {
    const branch = row.Branch || 'Unknown';
    const amount = parseFloat(row['Purchase Amount'] || '0') || 0;
    total[branch] = (total[branch] || 0) + amount;
  });

  const branches = Object.keys(total);

  return {
    labels: branches,
    datasets: [
      {
        label: 'Total Sales (₱)',
        data: branches.map((b) => total[b]),
        backgroundColor: '#10b981',
      },
    ],
  };
});
</script>
