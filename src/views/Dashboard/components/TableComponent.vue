<template>
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 mt-10">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr class="border border-gray-300">
        <th scope="col" class="px-4 py-3">ID</th>
        <th scope="col" class="px-4 py-3">Full Name</th>
        <th scope="col" class="px-4 py-3">Mobile Number</th>
        <th scope="col" class="px-4 py-3">Email Address</th>
        <th scope="col" class="px-4 py-3">Birthdate</th>
        <th scope="col" class="px-4 py-3">Residential Address</th>
        <th scope="col" class="px-4 py-3">Branch</th>
        <th scope="col" class="px-4 py-3">Date of Purchase</th>
        <th scope="col" class="px-4 py-3">Receipt / Invoice Number</th>
        <th scope="col" class="px-4 py-3">Receipt</th>
        <th scope="col" class="px-4 py-3">Date Submitted</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(entry, index) in filteredData"
        :key="index"
        class="border border-gray-300"
        :class="{ 'bg-gray-200': index % 2 }"
      >
        <td
          scope="row"
          class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {{ index + 1 }}
        </td>
        <td
          scope="row"
          class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {{ entry["Full Name"] }}
        </td>
        <td
          scope="row"
          class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {{ formatMobileNumber(entry["Mobile Number"]) }}
        </td>
        <td
          scope="row"
          class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {{ entry["Email Address"] }}
        </td>
        <td
          scope="row"
          class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {{ entry["Birthdate"] }}
        </td>
        <td
          scope="row"
          class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {{ entry["Residential Address"] }}
        </td>
        <td
          scope="row"
          class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {{ entry["Select Branch"] }}
        </td>
        <td
          scope="row"
          class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {{ entry["Date of Purchase"] }}
        </td>

        <td
          scope="row"
          class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {{ entry["Receipt / Invoice Number"] }}
        </td>

        <td
          scope="row"
          class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <button
            class="border border-gray-400 px-2 py-1 rounded-sm cursor-pointer"
            @click="handleViewImage(entry['Upload Receipt'])"
          >
            View
          </button>
        </td>
        <td
          scope="row"
          class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {{ convertUTCtoPH(entry["Submitted at"]) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  uniqueBranches: {
    type: Array,
    default: () => [],
  },
});
</script>
