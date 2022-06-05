/**
 * If the last character of the date is 1, and the date is not 11, add "st" to the end of the date. If
 * the last character of the date is 2, and the date is not 12, add "nd" to the end of the date. If the
 * last character of the date is 3, and the date is not 13, add "rd" to the end of the date. Otherwise,
 * add "th" to the end of the date
 * @returns The date with the appropriate suffix.
 */
const addDate = (date) => {
  let dateToString = date.toString();

  const lastChar = dateToString.charAt(dateToString.length - 1);

  if (lastChar === "1" && dateToString !== "11") {
    dateToString = `${dateToString}st`;
  } else if (lastChar === "2" && dateToString !== "12") {
    dateToString = `${dateToString}nd`;
  } else if (lastChar === "3" && dateToString !== "13") {
    dateToString = `${dateToString}rd`;
  } else {
    dateToString = `${dateToString}th`;
  }

  return dateToString;
};

/* This is a default parameter. */
module.exports = (
  timestamp,
  { timeLength = "short", dateSuffix = true } = {}
) => {
  /* Creating an object with the timeMonths of the year. */
  let timeMonths;

  if (timeLength === "short") {
    timeMonths = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };
  } else {
    timeMonths = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };
  }

  /* Creating a new date object. */
  const dateTime = new Date(timestamp);

  /* Getting the month from the date object and then using that month to get the month from the
    timeMonths object. */
  const MonthFormat = timeMonths[dateTime.getMonth()];

  let dayMonth;

  /* This is a ternary operator. It is a shorthand way of writing an if/else statement. */
  if (dateSuffix) {
    dayMonth = addDate(dateTime.getDate());
  } else {
    dayMonth = dateTime.getDate();
  }

  /* Getting the year from the date object. */
  const year = dateTime.getFullYear();

  let hour;

  /* This is converting the time from 24 hour time to 12 hour time. */
  if (dateTime.getHours > 12) {
    hour = Math.floor(dateTime.getHours() / 2);
  } else {
    hour = dateTime.getHours();
  }

  if (hour === 0) {
    hour = 12;
  }

  /* Getting the minutes from the date object. */
  const minutes = dateTime.getMinutes();

  let dayTime;

  /* This is a ternary operator. It is a shorthand way of writing an if/else statement. */
  if (dateTime.getHours() >= 12) {
    dayTime = "pm";
  } else {
    dayTime = "am";
  }

  const formattedTimeStamp = `${MonthFormat} ${dayMonth}, ${year} at ${hour}:${minutes} ${dayTime}`;

  return formattedTimeStamp;
};
