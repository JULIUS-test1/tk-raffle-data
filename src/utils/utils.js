import dayjs from 'dayjs';

export const columnsData = [
  { label: 'id' },
  { label: 'No. Of Entries', key: 'raffleEntries' },
  { label: 'Full Name', key: 'fullName' },
  { label: 'Mobile Number', key: 'mobileNumber' },
  { label: 'Email Address', key: 'email' },
  { label: 'Birthdate', key: 'birthdate' },
  { label: 'Residential Address', key: 'residentialAddress' },
  { label: 'Branch', key: 'branch' },
  { label: 'Date of Purchase', key: 'dateOfPurchase' },
  { label: 'Purchase Amount', key: 'purchaseAmount' },
  { label: 'Receipt / Invoice Number', key: 'receiptNumber' },
  { label: 'Upload Receipt', key: 'receiptUpload' },
  { label: 'Submitted at', key: 'submittedAt' },
];

export const formatToPeso = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date) => {
  return dayjs(date).format('MM-DD-YYYY');
};

export const convertDate = (dateStr) => {
  const timestamp = {
    seconds: dateStr.seconds,
    nanoseconds: dateStr.nanoseconds,
  };

  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1_000_000
  );

  return dayjs(date).format('MM-DD-YYYY hh:mm:ss A');
};

export const formatItemDisplay = (itemName, entry) => {
  if (itemName == 'Purchase Amount') return formatToPeso(entry);
  if (itemName == 'Submitted at') return convertDate(entry);
  return entry;
};
