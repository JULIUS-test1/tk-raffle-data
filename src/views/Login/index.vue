<template>
  <div class="bg-warm-red flex min-h-screen items-center justify-center px-4">
    <div class="w-full max-w-md rounded-lg bg-[#f4f2ec] p-8 shadow-lg">
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

      <p v-if="error" class="mt-4 text-center text-sm text-red-500">
        {{ error }}
      </p>
    </div>
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

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
  } catch (err) {
    error.value = 'Invalid username or password.';
  }
};
</script>
