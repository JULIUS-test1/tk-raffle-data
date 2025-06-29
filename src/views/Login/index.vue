<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const handleLogin = () => {
  if (username.value === "admin" && password.value === "admin123") {
    router.push("/dashboard");
  } else {
    error.value = "Invalid username or password.";
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center bg-warm-red justify-center px-4">
    <div class="w-full max-w-md bg-[#f4f2ec] rounded-lg shadow-lg p-8">
      <img
        src="/src/assets/tpk-logo-red.png"
        alt="tpk-logo"
        class="w-50 mx-auto mb-3"
      />

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-maroon font-medium mb-2">Username</label>
          <input
            v-model="username"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-c-brass text-maroon"
            placeholder="admin"
          />
        </div>

        <div class="mb-6">
          <label class="block text-maroon font-medium mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-c-brass text-maroon"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-maroon text-c-beige py-2 rounded hover:bg-warm-red-h transition cursor-pointer"
        >
          Sign In
        </button>
      </form>

      <p v-if="error" class="text-red-500 text-sm mt-4 text-center">
        {{ error }}
      </p>
    </div>
  </div>
</template>
