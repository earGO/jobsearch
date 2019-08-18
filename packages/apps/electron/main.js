const electron = require('electron');
const path = require('path');
const url = require('url');

const {app, BrowserWindow} = electron;

let mainWindow; // Main app window

/** Listen for the app to be ready */
app.on('ready', () => {
	/** Create new window */
	mainWindow = new BrowserWindow({});
	/** Load HTML into newly created window */
	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'mainWindow.html'),
			protocol: 'file:',
			slashes: true
		})
	);
});
