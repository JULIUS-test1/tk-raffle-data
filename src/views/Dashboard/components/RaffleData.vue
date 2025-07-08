<template>
  <div class="m-4 sm:mx-10 sm:my-5">
    <div class="flex flex-col justify-center gap-5 md:flex-row">
      <div
        class="bg-warm-red flex min-w-[250px] flex-col items-center rounded-lg px-6 py-4"
      >
        <h2 class="text-c-beige text-center text-2xl">Total Raffle Entries</h2>
        <div class="text-c-beige mt-3 text-2xl">
          {{ totalEntries }}
        </div>
      </div>
      <div
        class="bg-warm-red flex min-w-[250px] flex-col items-center rounded-lg px-6 py-4"
      >
        <h2 class="text-c-beige text-center text-2xl">
          Total Remaining Entries
        </h2>
        <div class="text-c-beige mt-3 text-2xl">
          {{ totalRemainingEntries }}
        </div>
      </div>
      <div
        class="bg-warm-red flex min-w-[250px] flex-col items-center rounded-lg px-6 py-4"
      >
        <h2 class="text-c-beige text-center text-2xl">Total Winners</h2>
        <div class="text-c-beige mt-3 text-2xl">
          {{ totalWinnersCount }}
        </div>
      </div>
    </div>

    <button
      class="bg-warm-red text-c-white mx-auto mt-5 mb-10 block min-w-[150px] cursor-pointer rounded-md px-4 py-2 text-center"
      @click="showEntries = !showEntries"
    >
      {{ showEntries ? 'Hide' : 'Show' }} All Entries
    </button>

    <div v-if="showEntries" class="flex flex-wrap gap-3">
      <div
        v-for="(item, idx) in allEntries"
        :key="idx"
        class="bg-c-white h-fit rounded px-3 py-2"
        :class="formatBg(item.roundName)"
      >
        <template v-if="item.isWin">
          {{ item.winCountId }}. {{ item.name }}
        </template>
        <template v-else>
          {{ item.name }}
        </template>
      </div>
    </div>

    <h2 class="mt-10 mb-5 text-2xl">Consolation Prizes (38 winners)</h2>
    <div class="flex min-h-[360px] flex-col gap-y-10 md:flex-row md:gap-x-10">
      <RaffleCard
        title="10 Winners of Gift Box #9"
        roundName="firstRound"
        :winnersCount="10"
        :roundWinners="firstRound"
        :isLoadingInfo="isLoadingInfo"
        @drawWinners="(n, c) => drawWinners(n, c)"
        @handleViewInfo="handleViewInfo"
      />
      <RaffleCard
        title="10 Winners of 1,000 Gift Certificates"
        roundName="secondRound"
        :winnersCount="10"
        :roundWinners="secondRound"
        :isLoadingInfo="isLoadingInfo"
        @drawWinners="(n, c) => drawWinners(n, c)"
        @handleViewInfo="handleViewInfo"
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
        :isLoadingInfo="isLoadingInfo"
        @drawWinners="(n, c) => drawWinners(n, c)"
        @handleViewInfo="handleViewInfo"
      />
      <RaffleCard
        title="8 Winners of 2,000 Gift Certificates"
        roundName="fourthRound"
        :winnersCount="8"
        :roundWinners="fourthRound"
        :isLoadingInfo="isLoadingInfo"
        @drawWinners="(n, c) => drawWinners(n, c)"
        @handleViewInfo="handleViewInfo"
      />
    </div>

    <h2 class="mt-10 mb-5 text-2xl">Grand Prizes (3 winners)</h2>
    <div class="flex flex-col gap-y-10 md:flex-row md:gap-x-10">
      <RaffleCard
        class="mx-auto !min-h-[200px] w-full md:w-1/2"
        title="Trip to Boracay"
        roundName="finalRound1"
        :winnersCount="1"
        :roundWinners="finalRound1"
        :isLoadingInfo="isLoadingInfo"
        @drawWinners="(n, c) => drawWinners(n, c)"
        @handleViewInfo="handleViewInfo"
      />
      <RaffleCard
        class="mx-auto !min-h-[200px] w-full md:w-1/2"
        title="Trip to Discovery Samal"
        roundName="finalRound2"
        :winnersCount="1"
        :roundWinners="finalRound2"
        :isLoadingInfo="isLoadingInfo"
        @drawWinners="(n, c) => drawWinners(n, c)"
        @handleViewInfo="handleViewInfo"
      />
      <RaffleCard
        class="mx-auto !min-h-[200px] w-full md:w-1/2"
        title="Trip to Hong Kong Disneyland"
        roundName="finalRound3"
        :winnersCount="1"
        :roundWinners="finalRound3"
        :isLoadingInfo="isLoadingInfo"
        @drawWinners="(n, c) => drawWinners(n, c)"
        @handleViewInfo="handleViewInfo"
      />
    </div>

    <UserInfoPopup
      v-model:showUserInfo="showUserInfo"
      :userInfo="userInfo"
      :showImage="showImage"
      @handleViewImage="handleViewImage"
    />

    <ImagePopup v-model:showImage="showImage" :imageSrc="imageSrc" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { db } from '../../../firebase'; // path to your firebase.js
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { keysArray } from '../../../utils/utils';
import RaffleCard from './RaffleCard.vue';
import UserInfoPopup from './UserInfoPopup.vue';
import ImagePopup from './ImagePopup.vue';

const props = defineProps(['tableData']);
const emit = defineEmits(['stopLoading']);

const keysArrayRaffle = ['No. Of Entries', ...keysArray];

const showEntries = ref(false);
const allEntries = ref([]);
const drawnRounds = ref([]);
const isLoadingInfo = ref(false);
const showUserInfo = ref(false);
const userInfo = ref({});

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
const totalWinnersCount = computed(() => {
  return drawnRounds.value.reduce((total, round) => {
    return total + (round.winners?.length || 0);
  }, 0);
});
const totalRemainingEntries = computed(() => {
  return totalEntries.value - totalWinnersCount.value;
});

onMounted(async () => {
  allEntries.value = getRaffleEntries(props.tableData);

  nextTick(() => {
    loadAllWinners();
  });
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
  isLoadingInfo.value = true;

  try {
    await Promise.all(roundList.map((item) => fetchWinners(item)));
  } catch (error) {
    console.error('❌ Error fetching:', error);
  } finally {
    emit('stopLoading');

    setTimeout(() => {
      isLoadingInfo.value = false;
    }, 1000);
  }
};

const getRaffleEntries = (data) => {
  const entries = [];
  let id = 1;

  data.forEach((entry) => {
    const name = entry['Full Name'];
    const amount = Number(entry['Purchase Amount']) || 0;
    const invoiceNumber = entry['Receipt / Invoice Number'];
    const raffleCount = Math.floor(amount / 750);

    Array.from({ length: raffleCount }).forEach(() => {
      entries.push({
        id: id++,
        name,
        invoiceNumber,
        roundName: '-',
        isWin: false,
      });
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

    candidate.winCountId = id;
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
      // console.warn(`⚠️ No winners found in '${roundName}'`);
      return [];
    }

    const data = querySnapshot.docs.flatMap((doc) => doc.data().winnersList);

    drawnRounds.value.push({
      round: data[0].roundName,
      winners: data,
    });

    allEntries.value = allEntries.value.map((item) => {
      const update = data.find((u) => u.id == item.id);
      return update ? update : item;
    });
  } catch (error) {
    console.error(`❌ Error fetching winners from '${roundName}':`, error);
    return [];
  }
};

const filterUserData = (data) => {
  return data.map((entry) => {
    const filtered = {};
    keysArrayRaffle.forEach((key) => {
      if (entry[key] !== undefined) {
        filtered[key] = entry[key];
      }
    });
    return filtered;
  });
};

const handleViewInfo = (invoiceNumber) => {
  const data = props.tableData.filter((_) => {
    return _['Receipt / Invoice Number'] == invoiceNumber;
  });
  userInfo.value = filterUserData(data);

  showUserInfo.value = true;
};

const showImage = ref(false);
const imageSrc = ref('');

const handleViewImage = (imgSrc) => {
  imageSrc.value = imgSrc;
  showImage.value = true;
};

// const insights = ref(null);
// const API_KEY = import.meta.env.VITE_TALLY_API_KEY;

// const fetchTallyInsight = async () => {
//   const formId = 'wvVaGg';
//   const res = await fetch(`https://api.tally.so/forms/wvVaGg/insights`, {
//     headers: { Authorization: `Bearer ${API_KEY}` },
//     'Content-Type': 'application/json',
//   });
//   // const res = await fetch(`https://api.tally.so/forms/${formId}/submissions`, {
//   //   headers: { Authorization: `Bearer ${API_KEY}` },
//   // });
//   insights.value = await res.json();
//   console.log(insights.value, 333);
// };
</script>
