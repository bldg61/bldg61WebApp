module.exports = function orderEventsByDay(events) {
  const days = {};
  events.forEach(event => {
    const day = new Intl.DateTimeFormat('en-US').format(new Date(event.start))
    days[day] = days[day] ? days[day].concat(event) : [ event ]
  })
  return days
}
