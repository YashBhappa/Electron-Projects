const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      height: 500,
      width: 300,
      frame: false,
      resizable: false,
      show: false,
      webPreferences: { backgroundThrottling: false, nodeIntegration: true, contextIsolation: false }
    });

    this.loadFile(url);
    this.on('blur', () => this.onBlur());
  }

  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;
