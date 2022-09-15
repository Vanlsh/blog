export const getRandomColor = () => {
  const hex = Math.floor(Math.random() * 0xffffff);
  return "#" + hex.toString(16);
};

export const getData = (date) => {
  const newDate = new Date(date);
  const month = [
    "January",
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
    "December",
  ][newDate.getMonth()];
  return newDate.getDay() + " " + month + " " + newDate.getFullYear();
};
