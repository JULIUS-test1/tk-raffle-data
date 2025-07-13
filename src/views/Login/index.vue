<template>
  <div class="bg-warm-red mx-auto flex h-screen w-full max-w-[2100px]">
    <div
      class="hidden h-[800px] w-full items-center justify-center p-4 lg:flex"
    >
      <img
        src="/src/assets/tk-logo.png"
        alt="Tapa King logo"
        class="w-[600px]"
      />
    </div>
    <div class="bg-c-beige min-h-full w-full p-8 lg:w-[1200px] lg:p-18">
      <div class="relative mx-auto w-full max-w-md">
        <img
          src="/src/assets/tpk-logo-red.png"
          alt="tpk-logo"
          class="mx-auto w-60"
        />

        <h1 class="text-warm-red font-sh mt-20 text-5xl">Welcome,</h1>
        <h2 class="font-sh text-maroon mb-12 text-2xl">Glad to see you!</h2>

        <form @submit.prevent="handleLogin">
          <label class="text-maroon mb-2 block font-medium">Email</label>
          <input
            v-model="email"
            type="text"
            required
            class="focus:ring-c-brass text-maroon w-full rounded bg-[#f4f2ec] px-4 py-3 focus:ring-2 focus:outline-none"
            placeholder="you@example.com"
            @input="error = ''"
          />

          <div class="relative mt-7">
            <label class="text-maroon mb-2 block font-medium">Password</label>
            <input
              v-model="password"
              :type="isPasswordVisible ? 'text' : 'password'"
              required
              class="focus:ring-c-brass text-maroon w-full rounded bg-[#f4f2ec] px-4 py-3 focus:ring-2 focus:outline-none"
              placeholder="••••••••••"
              @input="error = ''"
            />

            <!-- Toggle eye icon -->
            <div
              class="absolute top-[45px] right-3 cursor-pointer text-gray-600 focus:outline-none"
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
            class="bg-warm-red text-c-beige outline-warm-red-h mt-10 w-full cursor-pointer rounded py-3 text-xl tracking-wide transition"
          >
            Login
          </button>
        </form>

        <div
          v-if="error"
          class="bg-c-white mt-10 w-full rounded-md p-4 text-center text-red-500"
        >
          Invalid email or password.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const email = ref('');
const password = ref('');
const error = ref('');
const isPasswordVisible = ref(false);

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
  } catch (err) {
    error.value = 'Invalid email or password.';
  }
};
</script>
