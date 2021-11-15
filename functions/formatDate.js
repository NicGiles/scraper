const { DateTime } = require("luxon");
const formatDate = (date) => {
  [day, month] = date.split(" ");
  return DateTime.fromFormat(
    [day.substring(0, day.length - 2), month].join(" "),
    "d MMMM"
  );
};

module.exports = formatDate;
