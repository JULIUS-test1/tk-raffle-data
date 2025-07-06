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

export const keysArray = [
  'Full Name',
  'Mobile Number',
  'Email Address',
  'Birthdate',
  'Residential Address',
  'Branch',
  'Date of Purchase',
  'Purchase Amount',
  'Receipt / Invoice Number',
  'Upload Receipt',
  'Submitted at',
];

export const formatItemDisplay = (itemName, entry) => {
  if (itemName == 'No. Of Entries') {
    return calculateEntries(entry['Purchase Amount']);
  }
  if (itemName == 'Mobile Number') return formatMobileNumber(entry[itemName]);
  if (itemName == 'Purchase Amount') return formatToPeso(entry[itemName]);
  if (itemName == 'Submitted at') return convertUTCtoPH(entry[itemName]);
  if (itemName == 'Upload Receipt') return '';
  if (['Birthdate', 'Date of Purchase'].includes(itemName)) {
    return formatDate(entry[itemName]);
  }

  return entry[itemName];
};
