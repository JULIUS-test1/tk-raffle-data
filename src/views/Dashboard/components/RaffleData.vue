<template>
  <div class="mt-5 mx-4 sm:mx-10">
    <!-- <template v-if="!isLoading"> -->
    <h2 class="text-center text-4xl my-4">
      Total Raffle Entries: {{ totalEntries }}
    </h2>
    <h2 class="text-center text-4xl my-4">
      Total Remaining Entries: {{ remainingEntries }}
    </h2>
    <h2 class="text-center text-4xl my-4">
      Total Winners: {{ totalWinnersCount }}
    </h2>

    <button
      class="mx-auto block px-4 py-2 bg-warm-red text-white rounded-md cursor-pointer"
      @click="showEntries = !showEntries"
    >
      {{ showEntries ? 'Hide' : 'Show' }} All Entries
    </button>

    <div v-if="showEntries" class="flex gap-3 flex-wrap mt-10">
      <div
        v-for="(item, idx) in allEntries"
        :key="idx"
        class="bg-c-white py-2 px-3 h-fit rounded"
        :class="formatBgColor(item.roundName)"
      >
        {{ item.name }}
      </div>
    </div>

    <h2 class="text-xl mb-4 mt-20">Consolation Prizes (38 winners)</h2>
    <div class="flex gap-y-8 md:flex-row md:gap-x-8 flex-col">
      <div
        class="flex-1 py-3 bg-c-white min-h-[360px] rounded-lg shadow-2xl"
        :class="{ '!bg-first': firstRound }"
      >
        <h2 class="text-center text-maroon mb-4">10 Winners of Gift Box #9</h2>
        <template v-if="firstRound">
          <div
            v-for="(item, idx) in firstRound"
            :key="idx"
            class="flex justify-between px-4 gap-x-3 mb-1"
          >
            <div class="flex">
              <div class="font-mono tabular-nums mr-1">{{ idx + 1 }}.</div>
              <div class="mt-[2px]">{{ item.name }}</div>
            </div>
            <button
              class="cursor-pointer hover:text-warm-red hover:underline"
              @click="handleViewInfo(item.name)"
            >
              view
            </button>
          </div>
        </template>
        <div
          v-else
          class="w-full h-[300px] flex items-center justify-center outline1"
        >
          <div
            class="bg-warm-red-h hover:bg-warm-red text-white font-bold py-2 px-6 rounded-lg shadow cursor-pointer"
            @click="drawWinners('first', 10)"
          >
            Generate 10 Winners
          </div>
        </div>
      </div>
      <div
        class="flex-1 py-3 bg-c-white min-h-[360px] rounded-lg shadow-2xl"
        :class="{ '!bg-second': secondRound }"
      >
        <h2 class="text-center text-maroon mb-4">
          10 Winners of <span class="font-mono pb-0.5">₱</span>1,000 Gift
          Certificates
        </h2>
        <template v-if="secondRound">
          <div
            v-for="(item, idx) in secondRound"
            :key="idx"
            class="flex justify-between px-4 gap-x-3 mb-1"
          >
            <div class="flex">
              <div class="font-mono tabular-nums mr-1">{{ idx + 1 }}.</div>
              <div class="mt-[2px]">{{ item.name }}</div>
            </div>
            <button
              class="cursor-pointer hover:text-warm-red hover:underline"
              @click="handleViewInfo(item.name)"
            >
              view
            </button>
          </div>
        </template>
        <div
          v-else
          class="w-full h-[300px] flex items-center justify-center outline1"
        >
          <div
            class="bg-warm-red-h hover:bg-warm-red text-white font-bold py-2 px-6 rounded-lg shadow cursor-pointer"
            @click="drawWinners('second', 10)"
          >
            Generate 10 Winners
          </div>
        </div>
      </div>
      <div
        class="flex-1 py-3 bg-c-white min-h-[360px] rounded-lg shadow-2xl"
        :class="{ '!bg-third': thirdRound }"
      >
        <h2 class="text-center text-maroon mb-4">
          10 Winners of <span class="font-mono pb-0.5">₱</span>1,500 Gift
          Certificates
        </h2>
        <template v-if="thirdRound">
          <div
            v-for="(item, idx) in thirdRound"
            :key="idx"
            class="flex justify-between px-4 gap-x-3 mb-1"
          >
            <div class="flex">
              <div class="font-mono tabular-nums mr-1">{{ idx + 1 }}.</div>
              <div class="mt-[2px]">{{ item.name }}</div>
            </div>
            <button
              class="cursor-pointer hover:text-warm-red hover:underline"
              @click="handleViewInfo(item.name)"
            >
              view
            </button>
          </div>
        </template>
        <div
          v-else
          class="w-full h-[300px] flex items-center justify-center outline1"
        >
          <div
            class="bg-warm-red-h hover:bg-warm-red text-white font-bold py-2 px-6 rounded-lg shadow cursor-pointer"
            @click="drawWinners('third', 10)"
          >
            Generate 10 Winners
          </div>
        </div>
      </div>
      <div
        class="flex-1 py-3 bg-c-white min-h-[360px] rounded-lg shadow-2xl"
        :class="{ '!bg-fourth': fourthRound }"
      >
        <h2 class="text-center text-maroon mb-4">
          8 Winners of <span class="font-mono pb-0.5">₱</span>2,000 Gift
          Certificates
        </h2>
        <template v-if="fourthRound">
          <div
            v-for="(item, idx) in fourthRound"
            :key="idx"
            class="flex justify-between px-4 gap-x-3 mb-1"
          >
            <div class="flex">
              <div class="font-mono tabular-nums mr-1">{{ idx + 1 }}.</div>
              <div class="mt-[2px]">{{ item.name }}</div>
            </div>
            <button
              class="cursor-pointer hover:text-warm-red hover:underline"
              @click="handleViewInfo(item.name)"
            >
              view
            </button>
          </div>
        </template>
        <div
          v-else
          class="w-full h-[300px] flex items-center justify-center outline1"
        >
          <div
            class="bg-warm-red-h hover:bg-warm-red text-white font-bold py-2 px-6 rounded-lg shadow cursor-pointer"
            @click="drawWinners('fourth', 8)"
          >
            Generate 8 Winners
          </div>
        </div>
      </div>
    </div>

    <!-- <h2 class="text-xl mb-4 mt-20">Grand Prize</h2> -->
    <div
      class="py-3 bg-c-white md:w-[350px] w-full mx-auto mt-20 min-h-[200px] rounded-lg shadow-2xl"
      :class="{ '!bg-winner': finalRound }"
    >
      <h2 class="text-center text-maroon mb-4">Grand Prize</h2>
      <template v-if="finalRound">
        <div
          v-for="(item, idx) in finalRound"
          :key="idx"
          class="flex justify-between px-4 gap-x-3 mb-1"
        >
          <div class="flex">
            <div class="font-mono tabular-nums mr-1">{{ idx + 1 }}.</div>
            <div class="mt-[2px]">{{ item.name }}</div>
          </div>
          <button
            class="cursor-pointer hover:text-warm-red hover:underline"
            @click="handleViewInfo(item.name)"
          >
            view
          </button>
        </div>
      </template>
      <div
        v-else
        class="w-full h-[120px] flex items-center justify-center outline1"
      >
        <div
          class="bg-warm-red-h hover:bg-warm-red text-white font-bold py-2 px-6 rounded-lg shadow cursor-pointer"
          @click="drawWinners('final', 1)"
        >
          Generate Winners
        </div>
      </div>
    </div>
    <!-- </template> -->

    <!-- <div v-else class="h-[600px] w-full flex items-center justify-center">
      <div class="loader text-warm-red"></div>
    </div> -->

    <!-- Popup Modal -->
    <!-- <div
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

        <div>1</div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps(['isLoading', 'tableData']);
const emit = defineEmits(['update:isLoading']);

const showEntries = ref(false);
const showPopup = ref(false);
const userViewInfo = ref({});
const allEntries = ref([]);
const drawnRounds = ref([]); // ⬅️ This stores all draw batches

const getRaffleEntries = (data) => {
  const entries = [];
  let id = 1;

  data.forEach((entry) => {
    const name = entry['Full Name'];
    const amount = Number(entry['Purchase Amount']) || 0;
    const raffleCount = Math.floor(amount / 750);

    Array.from({ length: raffleCount }).forEach(() => {
      entries.push({ id: id++, name, roundName: '-', isWin: false });
    });
  });

  return entries;
};

const pickWinners = (entries, previousWinners = [], roundName, count) => {
  const previousIds = new Set(previousWinners.map((w) => w.id));
  const eligible = entries.filter((e) => !previousIds.has(e.id));

  const newWinners = [];
  const winnerNames = new Set(); // Track names already chosen in this round
  const total = Math.min(count, eligible.length);

  while (newWinners.length < total && eligible.length > 0) {
    const index = Math.floor(Math.random() * eligible.length);
    const [candidate] = eligible.splice(index, 1);

    // Skip if name already won this round
    if (winnerNames.has(candidate.name)) continue;

    candidate.isWin = true;
    candidate.roundName = roundName;
    newWinners.push(candidate);
    winnerNames.add(candidate.name);
  }

  return newWinners;
};

onMounted(() => {
  console.log('test');

  allEntries.value = getRaffleEntries(props.tableData);
  emit('update:isLoading', false);
});

// 🔄 Draw 10 winners into a named round
const drawWinners = (roundName, totalCount) => {
  const previousWinners = drawnRounds.value.flatMap((round) => round.winners);
  const newWinners = pickWinners(
    allEntries.value,
    previousWinners,
    roundName,
    totalCount
  );

  if (newWinners.length === 0) {
    console.warn('No more eligible entries to draw.');
    return;
  }

  console.log(newWinners);

  drawnRounds.value.push({
    round: roundName,
    winners: newWinners,
    date: new Date(),
  });
};

const totalEntries = computed(() => allEntries.value.length);
const remainingEntries = computed(() => {
  const wonIds = drawnRounds.value.flatMap((r) => r.winners.map((w) => w.id));
  return allEntries.value.filter((e) => !wonIds.includes(e.id))?.length;
});
const totalWinnersCount = computed(() => {
  return allEntries.value.filter((entry) => entry.isWin).length;
});

const firstRound = computed(() => {
  return drawnRounds.value.find((round) => round.round === 'first')?.winners;
});
const secondRound = computed(() => {
  return drawnRounds.value.find((round) => round.round === 'second')?.winners;
});
const thirdRound = computed(() => {
  return drawnRounds.value.find((round) => round.round === 'third')?.winners;
});
const fourthRound = computed(() => {
  return drawnRounds.value.find((round) => round.round === 'fourth')?.winners;
});
const finalRound = computed(() => {
  return drawnRounds.value.find((round) => round.round === 'final')?.winners;
});

const formatBgColor = (roundName) => {
  console.log(roundName);

  switch (roundName) {
    case 'first':
      return '!bg-first';
    case 'second':
      return '!bg-second';
    case 'third':
      return '!bg-third';
    case 'fourth':
      return '!bg-fourth';
    case 'final':
      return '!bg-winner';
  }
};

const handleViewInfo = (name) => {
  userViewInfo.value = props.tableData.find((_) => _['Full Name'] == name);
  showPopup.value = true;
};
</script>
