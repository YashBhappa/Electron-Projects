const electron = require('electron')

const {app, BrowserWindow} = electron
let win

app.on('ready', ()=>{
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,contextIsolation:false
        },
        width: 700,
        height: 400
    })
    win.loadFile('index.html')
})