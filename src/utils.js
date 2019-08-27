const months = [
  "Jenuary",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function parseUnixTime(milliTimestamp) {
  const date = new Date(milliTimestamp * 1000);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes()
  };
}
export function formatUnixTime(milliTimestamp) {
  const { year, month, day, hour, minute } = parseUnixTime(milliTimestamp);

  return `${month}/${day}/${year}, ${hour}:${minute}`;
}

export function formatUserCreatedTime(milliTimestamp) {
  const { year, month, day } = parseUnixTime(milliTimestamp);

  return `${months[month - 1]} ${day}, ${year}`;
}
