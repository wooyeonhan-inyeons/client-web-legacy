export const getFormattedDate = (date: Date) => {
  return [
    date.getFullYear().toString().substring(2, 4),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}
