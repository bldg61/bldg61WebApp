async function signupCompiler(ev) {
  console.log("event: ", ev);

  const sheets = window.myCSVs.map(myCSV => Papa.parse(myCSV).data)

  const masterDate = new Date(sheets[0][2][1].split(',')[2])
  const warningColor = 'pink-text'
  let laserCutoffTime
  let titles = []
  let error = false

  const signupSeshes = sheets.map(sheet => {
    const thisTitle = sheet[1][1]
    if (!titles.includes(thisTitle)) {
      titles.push(thisTitle)
    }
    const dateTime = sheet[2][1]
    const thisDate = new Date(sheet[2][1].split(',')[2])

    if (masterDate - thisDate !== 0) {
      error = true
      const mismatchedDatesError = document.createElement('h2')
      mismatchedDatesError.className = warningColor
      mismatchedDatesError.innerHTML = 'OH DEAR THESE SHEETS HAVE DIFFERENT DATES 🤦🏽‍♀️'
      document.getElementById('signupCompiler').prepend(mismatchedDatesError)
    }

    laserCutoffTime = thisTitle === 'Laser Cutting Guided Access' ? dateTime.split(' - ')[1].split(',')[0] : laserCutoffTime
    const studentsDetailed = sheet.slice(10, sheet.length)
    const students = studentsDetailed.map(student => {
      return [student[0], student[1]]
    })
    return [
      [thisTitle],
      [dateTime],
      ['First Name', 'Last Name']
    ].concat(
      students
    )
  })

  if (error) {
    return
  }


  const today = new Date(new Intl.DateTimeFormat('en-US').format(new Date))
  const warning = masterDate - today !==0 ? 'WARNING - These signup sheets are not for today.' : ''
  const laserMessage1 = laserCutoffTime ? `
    <h4 class="${warningColor}">FOR EXTRA TIME</h4>
    <h4 class="${warningColor}">PLEASE SEE STAFF</h4>
  ` : ''
  const laserMessage2 = laserCutoffTime ? `<h4 class="${warningColor}">LASERS OFF AT ${laserCutoffTime}</h4>` : ''
  const sessions = titles.length > 1 ?
    signupSeshes.flat() :
    signupSeshes.map( session => session.slice(1, session.length)).flat()

  const newFileContent = `
  ${warning}
  <h3>${titles.join(' AND ')}</h3>
  ${laserMessage1}
  ${sessions}
  ${laserMessage2}
  `

  document.getElementById('signupCompiler').innerHTML = newFileContent
}
