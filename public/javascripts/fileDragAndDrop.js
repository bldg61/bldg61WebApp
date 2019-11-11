var reader = new FileReader();
window.myCSVs = []

async function dropHandler(ev) {
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();

        window.myCSVs.push(await file.text())

        const newFileLI = document.createElement('li')
        newFileLI.className = 'collection-item'
        newFileLI.innerHTML = file.name

        const addedFileList = document.getElementById('addedFileList')
        addedFileList.append(newFileLI)

        const numberFilesAdded = document.getElementById('numberFilesAdded')
        numberFilesAdded.innerHTML = window.myCSVs.length === 1 ? `${window.myCSVs.length} file` : `${window.myCSVs.length} files`

        const mungeButton = document.getElementById('mungeButton')
        mungeButton.className = mungeButton.className.split('disabled').join('')
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log("OH MY YOU ARE TRIGGERING THE ELSE STATEMENT...");
      console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
    }
  }
}

function dragOverHandler(ev) {
  ev.preventDefault();
}
