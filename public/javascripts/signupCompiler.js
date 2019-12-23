async function signupCompiler() {
  const sheets = window.myCSVs.map(myCSV => Papa.parse(myCSV).data);

  const masterDate = new Date(sheets[0][2][1].split(',')[2]);
  const warningColor = 'pink-text';
  let laserCutoffTime;
  let titles = [];
  let error = false;

  const signupSeshes = sheets.map(sheet => {
    const thisTitle = sheet[1][1];
    if (!titles.includes(thisTitle)) {
      titles.push(thisTitle);
    }
    const dateTime = sheet[2][1];
    const thisDate = new Date(sheet[2][1].split(',')[2]);

    if (masterDate - thisDate !== 0) {
      error = true;
      const mismatchedDatesError = document.createElement('h2');
      mismatchedDatesError.className = warningColor;
      mismatchedDatesError.innerHTML = 'OH DEAR THESE SHEETS HAVE DIFFERENT DATES 🤦🏽‍♀️';
      document.getElementById('signupCompiler').prepend(mismatchedDatesError);
    }

    laserCutoffTime = thisTitle === 'Laser Cutting Guided Access' ? dateTime.split(' - ')[1].split(',')[0] : laserCutoffTime;
    const studentsDetailed = sheet.slice(10, sheet.length);
    const students = studentsDetailed.filter(student => {
      const studentRecord = student.length > 1;
      return studentRecord;
    }).map(student => [`<tr><td>${student[0]}</td><td>${student[1]}</td><td></td></tr>`]);

    return [
      [`<h5>${thisTitle}</h5>`],
      [`<h5>${dateTime}</h5>`],
      ['<table class="striped font-size1pt5em">'],
      ['<thead>'],
      ['<tr>'],
      ['<th>First Name</th><th>Last Name</th><th>Arrived</th>'],
      ['</tr>'],
      ['</thead>'],
      ['<tbody>'],
      students.join(''),
      ['</tbody>'],
      ['</table>'],
    ];
  });

  if (error) {
    return;
  }

  const laserMessage1 = laserCutoffTime
    ? `<h5 class="${warningColor}">FOR EXTRA TIME PLEASE SEE STAFF</h5>`
    : '';
  const laserMessage2 = laserCutoffTime ? `<h5 class="${warningColor}">LASERS OFF AT ${laserCutoffTime}</h5>` : '';
  const sessions = titles.length > 1
    ? signupSeshes.flat().join('')
    : signupSeshes.map(session => session.slice(1, session.length)).flat().join('');

  const newFileContent = `
  <h4>${titles.join(' AND ')}</h4>
  ${laserMessage1}
  ${sessions}
  ${laserMessage2}
  `;
  const today = new Date(new Intl.DateTimeFormat('en-US').format(new Date()));
  if (masterDate - today !== 0) {
    M.toast({
      classes: warningColor,
      html: 'WARNING - These signup sheets are not for today.',
    });
  }

  document.getElementById('signupCompiler').innerHTML = newFileContent;
}
