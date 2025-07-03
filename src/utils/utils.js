import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date) => {
  return date ? dayjs(date).format('MM-DD-YYYY') : '';
};

export const convertUTCtoPH = (utcString) => {
  return dayjs.utc(utcString).tz('Asia/Manila').format('MM-DD-YYYY hh:mm:ss A');
};

export const formatMobileNumber = (number) => {
  return number.replace('63', '0');
};

export const calculateEntries = (amount, base = 750) => {
  return Math.floor(amount / base);
};

export const formatToPeso = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: 2,
  }).format(amount);
};
