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
  days.sort().forEach(day=> {
    orderedDaysAndEvents[day] = unorderedDaysAndEvents[day]
  })
  return orderedDaysAndEvents;
};
