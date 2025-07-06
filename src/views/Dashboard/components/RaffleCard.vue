<template>
  <div
    v-if="isLoadingInfo"
    class="bg-c-white flex min-h-[450px] flex-1/2 items-center justify-center rounded-lg"
  >
    <div class="loader-spin"></div>
  </div>
  <div
    v-else
    class="bg-c-white min-h-[400px] flex-1/2 rounded-lg p-5"
    :class="formatBg()"
  >
    <h2 class="text-maroon mb-5 text-center text-lg">{{ title }}</h2>

    <template v-if="roundWinners">
      <div
        v-for="(item, idx) in roundWinners"
        :key="idx"
        class="mb-1 flex justify-between gap-x-3 px-4"
      >
        <div class="flex">
          <div v-if="winnersCount != 1" class="mr-1 font-mono tabular-nums">
            {{ idx + 1 }}.
          </div>
          <div class="mt-[2px]">{{ item.name }}</div>
        </div>
        <div
          class="hover:text-warm-red cursor-pointer hover:underline"
          @click="$emit('handleViewInfo', item.invoiceNumber)"
        >
          view
        </div>
      </div>

      <h2 class="mt-10 text-center">
        Raffle Date: {{ formatDate(roundWinners[0].date) }}
      </h2>
    </template>
    <div
      v-else
      class="flex h-[150px] w-full items-center justify-center md:h-[calc(100%-50px)]"
    >
      <div
        class="bg-warm-red-h hover:bg-warm-red cursor-pointer rounded-lg px-6 py-2 font-bold text-white shadow"
        @click="$emit('drawWinners', roundName, winnersCount)"
      >
        Generate {{ winnersCount }}
        {{ winnersCount == 1 ? 'Winner' : 'Winners' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';

const props = defineProps([
  'title',
  'roundName',
  'winnersCount',
  'roundWinners',
  'isLoadingInfo',
]);

defineEmits(['drawWinners', 'handleViewInfo']);

const formatBg = () => {
  if (!props.roundWinners) return;

  switch (props.roundName) {
    case 'firstRound':
      return '!bg-first';
    case 'secondRound':
      return '!bg-second';
    case 'thirdRound':
      return '!bg-third';
    case 'fourthRound':
      return '!bg-fourth';
    case 'finalRound1':
    case 'finalRound2':
    case 'finalRound3':
      return '!bg-winner';
  }
};

const formatDate = (dateStr) => {
  if (dateStr instanceof Date) {
    return dayjs(dateStr).format('MM-DD-YYYY hh:mm:ss A');
  }

  const timestamp = {
    seconds: dateStr.seconds,
    nanoseconds: dateStr.nanoseconds,
  };

  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1_000_000
  );

  return dayjs(date).format('MM-DD-YYYY hh:mm:ss A');
};
</script>

<style scoped>
.loader-spin {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #d14124 94%, #0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, #d14124);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: l13 1s infinite linear;
}
@keyframes l13 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
