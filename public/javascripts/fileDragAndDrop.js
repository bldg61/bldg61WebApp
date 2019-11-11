var reader = new FileReader();
window.myCSVs = []

async function dropHandler(ev) {
  ev.preventDefault();
  let incomingFiles = []

  if (ev.dataTransfer.items) {
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      if (ev.dataTransfer.items[i].kind === 'file') {
        const file = ev.dataTransfer.items[i].getAsFile();
        incomingFiles.push(file)
        addFileToList(file)
      }
    }
  } else {
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      const file = ev.dataTransfer.files[i]
      incomingFiles.push(file)
      addFileToList(file)
    }
  }

  const readFiles = await Promise.all(incomingFiles.map(file => {
    return file.text()
  }))
  window.myCSVs = [ ...window.myCSVs, ...readFiles]

  const numberFilesAdded = document.getElementById('numberFilesAdded')
  numberFilesAdded.innerHTML = window.myCSVs.length === 1 ? `${window.myCSVs.length} file` : `${window.myCSVs.length} files`
}

function dragOverHandler(ev) {
  ev.preventDefault();
}

function addFileToList(file) {
  const newFileLI = document.createElement('li')
  newFileLI.className = 'collection-item'
  newFileLI.innerHTML = file.name

  const addedFileList = document.getElementById('addedFileList')
  addedFileList.append(newFileLI)

  const mungeButton = document.getElementById('mungeButton')
  mungeButton.className = mungeButton.className.split('disabled').join('')
}
