<template>
  <div class="bg-warm-red flex min-h-screen items-center justify-center px-4">
    <div class="bg-c-white relative w-full max-w-md rounded-lg p-8 shadow-lg">
      <img
        src="/src/assets/tpk-logo-red.png"
        alt="tpk-logo"
        class="mx-auto mb-5 w-50"
      />

      <form @submit.prevent="handleLogin">
        <div class="mb-6">
          <label class="text-maroon mb-2 block font-medium">Email</label>
          <input
            v-model="email"
            type="text"
            required
            class="focus:ring-c-brass text-maroon w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            placeholder="you@example.com"
            @input="error = ''"
          />
        </div>

        <div class="relative mb-6">
          <label class="text-maroon mb-2 block font-medium">Password</label>
          <input
            v-model="password"
            :type="isPasswordVisible ? 'text' : 'password'"
            required
            class="focus:ring-c-brass text-maroon w-full rounded border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:outline-none"
            placeholder="••••••••••"
            @input="error = ''"
          />

          <!-- Toggle eye icon -->
          <div
            class="absolute top-[40px] right-3 cursor-pointer text-gray-600 focus:outline-none"
            @click="isPasswordVisible = !isPasswordVisible"
          >
            <!-- Eye Icon (Show) -->
            <svg
              v-if="!isPasswordVisible"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
              />
            </svg>

            <!-- Eye-Off Icon (Hide) -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.96 9.96 0 012.341-4.118M6.423 6.423A9.96 9.96 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.972 9.972 0 01-4.21 5.233M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 3l18 18"
              />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          class="bg-maroon text-c-beige hover:bg-warm-red focus:outline-warm-red-h w-full cursor-pointer rounded py-2 transition"
        >
          Sign In
        </button>
      </form>

      <div
        v-if="error"
        class="bg-c-white absolute -top-16 left-0 w-full rounded-md p-3 text-center text-red-500"
      >
        Invalid email or password.
      </div>
    </div>
  </div>

  <div
    v-if="isChecking"
    class="fixed inset-0 flex h-screen w-full items-center justify-center bg-gray-200/30 backdrop-blur-xs backdrop-saturate-150"
  >
    <div class="loader-spin"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const isPasswordVisible = ref(false);
const isChecking = ref(false);

const handleLogin = async () => {
  isChecking.value = true;
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    setTimeout(() => {
      isChecking.value = false;
    }, 1000);
  } catch (err) {
    setTimeout(() => {
      error.value = 'Invalid email or password.';
      isChecking.value = false;
    }, 1000);
  }
};
</script>

<style scoped>
.loader-spin {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  -webkit-mask: conic-gradient(from 15deg, #0000, #000);
  animation: l26 1s infinite steps(12);
}
.loader-spin,
.loader-spin:before,
.loader-spin:after {
  background:
    radial-gradient(closest-side at 50% 12.5%, #d14124 96%, #0000) 50% 0/20% 80%
      repeat-y,
    radial-gradient(closest-side at 12.5% 50%, #d14124 96%, #0000) 0 50%/80% 20%
      repeat-x;
}
.loader-spin:before,
.loader-spin:after {
  content: '';
  grid-area: 1/1;
  transform: rotate(30deg);
}
.loader-spin:after {
  transform: rotate(60deg);
}

@keyframes l26 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
