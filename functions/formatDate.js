

const {DateTime} = require('luxon');
const formatDate = (date) => {
  [day, month] = date.split(' ');
  return DateTime.fromFormat([day.substring(0, day.length -2), month].join(' '), 'd MMMM')
};

// working date function.
//const {DateTime} = require('luxon');
//const formatDate = (date) => {
//  [day, month] = date.split(' ');
//
// return DateTime.fromFormat([day.substring(0, day.length -2), month].join(' '), 'd MMMM').toSQLDate();
//};






module.exports = formatDate;

