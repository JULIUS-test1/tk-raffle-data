<template>
  <main>
    <router-view />
    <div
      v-if="isChecking"
      class="fixed inset-0 flex h-screen w-full items-center justify-center bg-gray-200/30 backdrop-blur-xs backdrop-saturate-150"
    >
      <div class="loader-spinner"></div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const router = useRouter();
const isChecking = ref(false);

onAuthStateChanged(auth, (user) => {
  isChecking.value = true;

  if (user) {
    setTimeout(() => {
      router.push('/dashboard');
      isChecking.value = false;
    }, 1000);
  } else {
    setTimeout(() => {
      router.push('/');
      isChecking.value = false;
    }, 1000);
  }
});
</script>

<style scoped>
.loader-spinner {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  -webkit-mask: conic-gradient(from 15deg, #0000, #000);
  animation: l26 1s infinite steps(12);
}
.loader-spinner,
.loader-spinner:before,
.loader-spinner:after {
  background:
    radial-gradient(closest-side at 50% 12.5%, #d14124 96%, #0000) 50% 0/20% 80%
      repeat-y,
    radial-gradient(closest-side at 12.5% 50%, #d14124 96%, #0000) 0 50%/80% 20%
      repeat-x;
}
.loader-spinner:before,
.loader-spinner:after {
  content: '';
  grid-area: 1/1;
  transform: rotate(30deg);
}
.loader-spinner:after {
  transform: rotate(60deg);
}

@keyframes l26 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
