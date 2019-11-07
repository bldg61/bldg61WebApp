module.exports = function orderEventsByDay(events) {
  const days = {};
  events.forEach(event => {
    const day = new Intl.DateTimeFormat(
      'en-US',
      { timeZone: 'America/Denver' }
    ).format(new Date(event.start));
    console.log("this day is: ", day);
    days[day] = days[day] ? days[day].concat(event) : [event];
  });
  return days;
};
