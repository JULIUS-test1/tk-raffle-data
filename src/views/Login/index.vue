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
          <label class="text-maroon mb-2 block font-medium">Username</label>
          <input
            v-model="username"
            type="text"
            required
            class="focus:ring-c-brass text-maroon w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            placeholder="admin"
          />
        </div>

        <div class="mb-6">
          <label class="text-maroon mb-2 block font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="focus:ring-c-brass text-maroon w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          class="bg-maroon text-c-beige hover:bg-warm-red-h w-full cursor-pointer rounded py-2 transition"
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
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleLogin = () => {
  if (username.value === 'admin' && password.value === 'admin123') {
    router.push('/dashboard');
  } else {
    error.value = 'Invalid username or password.';
  }
};
</script>
