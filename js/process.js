class AutoSplit {

  constructor(raw_data) {
    var data = AutoSplit.parseRawAutoSplit(raw_data);
    this.name = data[0];
    this.value = data[1];
    this.shouldSplit = (data[2] == "True");
  }

  static parseRawAutoSplit(raw_data) {
    var pattern = /<Split Value="([a-zA-Z0-9-, ]+)" ShouldSplit="([a-zA-Z]+)">([a-zA-Z ]+)<\/Split>/g;
    var match = pattern.exec(raw_data);
    return [match[3], match[1], match[2]];
  }

}

class AutoSplitManager {

  constructor() {
    this.reader = new FileReader();
    this.parser = new DOMParser();
    this.loadedFile = null;
    this.initialAutoSplits = [];
    this.currentAutoSplits = [];
  }

  loadFile(file) {
    manager = this;
    manager.reader.readAsText(file, "UTF-8");
    manager.reader.onload = function (evt) {
      manager.loadedFile = manager.parser.parseFromString(evt.target.result, "text/xml");
      var autoSplitterSettings = manager.loadedFile.getElementsByTagName('AutoSplitterSettings');
      var autoSplits = autoSplitterSettings[0].children[3].children;

      for (var i = 0 ; i < autoSplits.length ; i++) {
        manager.initialAutoSplits.push(new AutoSplit(autoSplits[i].outerHTML));
      }
      manager.currentAutoSplits = manager.initialAutoSplits;

    }
    manager.reader.onerror = function (evt) {
      console.log("error reading file");
    }
  }

}
