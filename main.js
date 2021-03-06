// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');
const fs = require('fs');

/*app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'Syslite Monitor',
    description: 'Open Syslite'
  }
])*/

function createWindow () {

  let conf = {
    width: 290,
    height: 150,
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
    frame: false,
    transparent: true,
    resizable: false,
    maximizable: false,
    icon: 'src/images/icon.png',
    center: true
  };

  let rawdata = fs.readFileSync('config.json');
  let data = JSON.parse(rawdata);

  let numWidgets = 0;

  for (i in data.display) {
    if (data.display[i]) {
      numWidgets++;
    }
  }

  conf = Object.assign(conf,data.window);

  // Create the browser window.
  const mainWindow = new BrowserWindow(conf);

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html')
  mainWindow.removeMenu();
  mainWindow.setIcon(path.join(__dirname, 'src/images/icon.png'));
  mainWindow.setSize(150+((numWidgets-1) * 125),150);

  //mainWindow.openDevTools();

  /*mainWindow.on('close', function(e) {
  const choice = require('electron').dialog.showMessageBoxSync(this,
    {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Are you sure you want to quit?'
    });
  if (choice === 1) {
    e.preventDefault();
  }
});*/

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
