var manager = new AutoSplitManager();

function onDragOver(ev) {
    ev.preventDefault();
}

function onDrop(ev) {

  ev.preventDefault();

  var files = []
  if (ev.dataTransfer.items) {
    for(var i = 0; i < ev.dataTransfer.items.length; i++) {
      files[i] = ev.dataTransfer.items[i].getAsFile();
    }
  } else {
    files = ev.dataTransfer.files
  }

  if (files.length > 1) {
    alert("You cannot drop more than one file");
  } else {
    name = files[0].name;
    if (name.split('.').pop() != 'lss') {
      alert("You need to drop a LiveSplit Split file (.lss)");
    } else {
      manager.loadFile(files[0]);
    }
  }
  removeDroppedData(ev)
}

function removeDroppedData(ev) {
  if (ev.dataTransfer.items) {
    ev.dataTransfer.items.clear();
  } else {
    ev.dataTransfer.clearData();
  }
}
