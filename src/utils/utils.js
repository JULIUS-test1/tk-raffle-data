import dayjs from "dayjs";

// Custom format function using dayjs
export const formatDate = (date) => {
  return date ? dayjs(date).format("YYYY-MM-DD") : "";
};

// export const convertUTCtoPH = (utcDateTimeString) => {
//   // Add "Z" to make sure JavaScript treats it as UTC
//   const utcDate = new Date(utcDateTimeString + "Z");

//   // Format as Asia/Manila time in 12-hour format
//   const phTime = new Intl.DateTimeFormat("en-US", {
//     timeZone: "Asia/Manila",
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: true,
//   }).format(utcDate);

//   return phTime;
// };

export const convertUTCtoPH = (utcDateTimeString) => {
  const utcDate = new Date(utcDateTimeString + "Z");

  const parts = new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // ✅ 12-hour format
  }).formatToParts(utcDate);

  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;
  const hour = parts.find((p) => p.type === "hour")?.value;
  const minute = parts.find((p) => p.type === "minute")?.value;
  const second = parts.find((p) => p.type === "second")?.value;
  const period = parts.find((p) => p.type === "dayPeriod")?.value; // ✅ AM/PM

  return `${year}-${month}-${day} ${hour}:${minute}:${second} ${period}`;
};

export const formatMobileNumber = (number) => {
  return number.replace("63", "0");
};

export const calculateEntries = (amount, base = 750) => {
  return Math.floor(amount / base);
};

export const formatToPeso = (amount) => {
  return new Intl.NumberFormat("en-PH", {
    minimumFractionDigits: 2,
  }).format(amount);
};
