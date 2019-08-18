const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Cria uma janela de navegação.
  let win = new BrowserWindow({
    width: 800,
    height: 650,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  
  //win.removeMenu();
  win.loadFile('app/index.html');
}

function closeWindow() {
  app.quit()
}

app.on('ready', createWindow);
app.on('window-all-closed', closeWindow);
