<template>
  <div class="mx-4 mt-5 sm:mx-10">
    <template v-if="!isLoading">
      <h2 class="my-4 text-2xl md:text-4xl">
        Total Raffle Entries: {{ totalEntries }}
      </h2>
      <h2 class="my-4 text-2xl md:text-4xl">
        Total Remaining Entries: {{ totalRemainingEntries }}
      </h2>
      <h2 class="my-4 text-2xl md:text-4xl">
        Total Winners: {{ totalWinnersCount }}
      </h2>

      <button
        class="bg-warm-red min-w-[150px] cursor-pointer rounded-md px-4 py-2 text-center text-white"
        @click="showEntries = !showEntries"
      >
        {{ showEntries ? 'Hide' : 'Show' }} All Entries
      </button>

      <div v-if="showEntries" class="mt-10 flex flex-wrap gap-3">
        <div
          v-for="(item, idx) in allEntries"
          :key="idx"
          class="bg-c-white h-fit rounded px-3 py-2"
          :class="formatBg(item.roundName)"
        >
          <template v-if="item.isWin">
            {{ item.id }}. {{ item.name }}
          </template>
          <template v-else>
            {{ item.name }}
          </template>
        </div>
      </div>

      <h2 class="mt-20 mb-5 text-xl">Consolation Prizes (38 winners)</h2>
      <div class="flex min-h-[360px] flex-col gap-y-10 md:flex-row md:gap-x-10">
        <RaffleCard
          title="10 Winners of Gift Box #9"
          roundName="firstRound"
          :winnersCount="10"
          :roundWinners="firstRound"
          @drawWinners="(n, c) => drawWinners(n, c)"
        />
        <RaffleCard
          title="10 Winners of 1,000 Gift Certificates"
          roundName="secondRound"
          :winnersCount="10"
          :roundWinners="secondRound"
          @drawWinners="(n, c) => drawWinners(n, c)"
        />
      </div>
      <div
        class="mt-10 flex min-h-[360px] flex-col gap-y-10 md:flex-row md:gap-x-10"
      >
        <RaffleCard
          title="10 Winners of 1,500 Gift Certificates"
          roundName="thirdRound"
          :winnersCount="10"
          :roundWinners="thirdRound"
          @drawWinners="(n, c) => drawWinners(n, c)"
        />
        <RaffleCard
          title="8 Winners of 2,000 Gift Certificates"
          roundName="fourthRound"
          :winnersCount="8"
          :roundWinners="fourthRound"
          @drawWinners="(n, c) => drawWinners(n, c)"
        />
      </div>

      <h2 class="mt-20 mb-5 text-xl">Grand Prizes (3 winners)</h2>
      <div class="flex flex-col gap-y-10 md:flex-row md:gap-x-10">
        <RaffleCard
          class="mx-auto !min-h-[200px] w-full md:w-1/2"
          title="Trip to Boracay"
          roundName="finalRound1"
          :winnersCount="1"
          :roundWinners="finalRound1"
          @drawWinners="(n, c) => drawWinners(n, c)"
        />
        <RaffleCard
          class="mx-auto !min-h-[200px] w-full md:w-1/2"
          title="Trip to Discovery Samal"
          roundName="finalRound2"
          :winnersCount="1"
          :roundWinners="finalRound2"
          @drawWinners="(n, c) => drawWinners(n, c)"
        />
        <RaffleCard
          class="mx-auto !min-h-[200px] w-full md:w-1/2"
          title="Trip to Hong Kong Disneyland"
          roundName="finalRound3"
          :winnersCount="1"
          :roundWinners="finalRound3"
          @drawWinners="(n, c) => drawWinners(n, c)"
        />
      </div>
    </template>

    <div v-else class="flex h-[600px] w-full items-center justify-center">
      <div class="loader text-warm-red"></div>
    </div>

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
import { db } from '../../../firebase'; // path to your firebase.js
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import RaffleCard from './RaffleCard.vue';

const props = defineProps(['isLoading', 'tableData']);
const emit = defineEmits(['update:isLoading']);

const showEntries = ref(false);
const showPopup = ref(false);
const userViewInfo = ref({});
const allEntries = ref([]);
const drawnRounds = ref([]);

const roundList = [
  'firstRound',
  'secondRound',
  'thirdRound',
  'fourthRound',
  'finalRound1',
  'finalRound2',
  'finalRound3',
];

const getWinners = (roundName) => {
  return computed(() => {
    return drawnRounds.value.find((round) => round.round === roundName)
      ?.winners;
  });
};

const firstRound = getWinners('firstRound');
const secondRound = getWinners('secondRound');
const thirdRound = getWinners('thirdRound');
const fourthRound = getWinners('fourthRound');
const finalRound1 = getWinners('finalRound1');
const finalRound2 = getWinners('finalRound2');
const finalRound3 = getWinners('finalRound3');

const totalEntries = computed(() => allEntries.value.length);
const totalRemainingEntries = computed(() => {
  const wonIds = drawnRounds.value.flatMap((r) => r.winners.map((w) => w.id));
  return allEntries.value.filter((e) => !wonIds.includes(e.id))?.length;
});
const totalWinnersCount = computed(() => {
  return drawnRounds.value.reduce((total, round) => {
    return total + (round.winners?.length || 0);
  }, 0);
});

onMounted(() => {
  loadAllWinners();
  // allEntries.value = getRaffleEntries(props.tableData);

  setTimeout(() => {
    allEntries.value = getRaffleEntries(props.tableData);
    emit('update:isLoading', false);
  }, 500);
});

const formatBg = (roundName) => {
  switch (roundName) {
    case 'firstRound':
      return '!bg-first';
    case 'secondRound':
      return '!bg-second';
    case 'thirdRound':
      return '!bg-third';
    case 'fourthRound':
      return '!bg-fourth';
  }
};

const loadAllWinners = async () => {
  try {
    await Promise.all(roundList.map((item) => fetchWinners(item)));
  } catch (error) {
    console.error('❌ Error fetching:', error);
  }
};

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

  let id = 1;

  while (newWinners.length < total && eligible.length > 0) {
    const index = Math.floor(Math.random() * eligible.length);
    const [candidate] = eligible.splice(index, 1);

    // Skip if name already won this round
    if (winnerNames.has(candidate.name)) continue;

    candidate.id = id;
    candidate.isWin = true;
    candidate.roundName = roundName;
    candidate.date = new Date();

    newWinners.push(candidate);
    winnerNames.add(candidate.name);

    id++;
  }

  return newWinners;
};

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

  drawnRounds.value.push({
    round: roundName,
    winners: newWinners,
  });

  saveWinners(roundName, newWinners);
};

const saveWinners = async (roundName, winnersList) => {
  try {
    await addDoc(collection(db, roundName), {
      winnersList: winnersList, // 👈 this is the array
      raffleDate: Timestamp.now(), // optional timestamp
    });
    console.log('✅ Winners list saved!');
  } catch (err) {
    console.error('❌ Error saving winners:', err);
  }
};

const fetchWinners = async (roundName) => {
  try {
    const querySnapshot = await getDocs(collection(db, roundName));

    if (querySnapshot.empty) {
      console.warn(`⚠️ No winners found in '${roundName}'`);
      return [];
    }

    const data = querySnapshot.docs.flatMap((doc) => doc.data().winnersList);

    drawnRounds.value.push({
      round: data[0].roundName,
      winners: data,
    });
  } catch (error) {
    console.error(`❌ Error fetching winners from '${roundName}':`, error);
    return [];
  }
};

const handleViewInfo = (name) => {
  userViewInfo.value = props.tableData.find((_) => _['Full Name'] == name);
  showPopup.value = true;
};
</script>
