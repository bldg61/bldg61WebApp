module.exports = (objectA, objectB) => {
  const nameA = objectA.name.toUpperCase();
  const nameB = objectB.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}
