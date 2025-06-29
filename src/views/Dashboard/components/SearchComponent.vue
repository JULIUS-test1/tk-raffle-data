<template>
  <div class="bg-warm-red rounded-lg mt-3 p-4 flex sm:flex-col gap-x-4">
    <div class="flex flex-col grow">
      <p class="text-c-beige mb-1 text-md">What are you looking for?</p>

      <!-- Search -->
      <div class="relative w-full">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-c-beige"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="search"
          v-model="searchQuery"
          id="default-search"
          class="block w-full p-3 ps-10 pe-26 text-sm text-c-beige placeholder-c-beige border-transparent rounded bg-red-1 focus:ring-c-beige focus:border-c-beige"
          placeholder="Search for name, address etc."
          required
        />

        <button
          @click="searchQuery = ''"
          type="button"
          class="absolute end-20 top-1/2 -translate-y-1/2 text-c-beige text-md cursor-pointer"
        >
          ✕
        </button>

        <button
          type="submit"
          class="text-warm-red absolute end-2 top-1/2 -translate-y-1/2 bg-c-beige hover:bg-warm-red-h hover:text-c-beige focus:ring-1 focus:outline-none focus:ring-gray-300 rounded text-sm px-2 py-1 cursor-pointer"
          @click="handleSearch"
        >
          Search
        </button>
      </div>
    </div>

    <div class="flex flex-col grow">
      <p class="text-c-beige mb-1 text-md">Branch</p>

      <div class="relative w-full">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-c-beige"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </div>

        <select
          v-model="selectedBranch"
          id="branch-filter"
          class="block w-full p-3 ps-10 text-sm text-c-beige border border-transparent rounded bg-red-1 focus:ring-c-beige focus:outline-none focus:border-c-beige cursor-pointer"
        >
          <option value="">Filter by branch</option>
          <option
            v-for="branch in uniqueBranches"
            :key="branch"
            :value="branch"
          >
            {{ branch }}
          </option>
        </select>
      </div>
    </div>

    <div class="flex flex-col grow">
      <p class="text-c-beige mb-1 text-md">Date Submitted</p>

      <div class="relative w-full">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <!-- Calendar Icon -->
          <svg
            class="w-4 h-4 text-c-beige"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <input
          type="date"
          v-model="selectedDate"
          class="block w-full p-3 ps-10 text-sm text-c-beige border border-transparent rounded bg-red-1 cursor-pointer appearance-none focus:ring-c-beige focus:border-c-beige"
          placeholder="Filter by Date"
        />
      </div>
    </div>

    <button
      type="submit"
      class="text-white bg-red-1 mt-auto hover:bg-warm-red-h focus:ring-1 focus:outline-none focus:ring-c-beige font-medium rounded text-sm px-10 py-3 cursor-pointer"
    >
      Search
    </button>
  </div>
</template>

<script setup></script>
