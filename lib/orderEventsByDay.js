module.exports = function orderEventsByDay(events) {
  const unorderedDaysAndEvents = {};
  events.forEach(event => {
    const day = new Intl.DateTimeFormat(
      'en-US',
      { timeZone: 'America/Denver' },
    ).format(new Date(event.start));
    unorderedDaysAndEvents[day] = unorderedDaysAndEvents[day] ? unorderedDaysAndEvents[day].concat(event) : [event];
  });

  const days = Object.keys(unorderedDaysAndEvents)
  const orderedDaysAndEvents = {};
  const sortedDays = days.map(day=> new Date(day)).sort((datetimeA, datetimeB) => datetimeA - datetimeB).map(datetime => {
    return `${datetime.getMonth()+1}/${datetime.getDate()}/${datetime.getFullYear()}`
  })
  sortedDays.forEach(day=> {
    orderedDaysAndEvents[day] = unorderedDaysAndEvents[day]
  })
  return orderedDaysAndEvents;
};
