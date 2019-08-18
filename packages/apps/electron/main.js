const electron = require('electron');
const path = require('path');
const url = require('url');

const {app, BrowserWindow, Menu} = electron;

let mainWindow; // Main app window
let addWindow; // Window for adding items in list

/**  Create menu template */
const mainMenuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Add item',
				click() {
					createAddWindow();
				}
			},
			{
				label: 'Clear items'
			},
			{
				label: 'Quit',
				accelerator:
					process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click() {
					app.quit();
				}
			}
		]
	}
];

/** If mac add empty menu item in main menu array */

if (process.platform == 'darwin') {
	mainMenuTemplate.unshift({});
}

/** Add devTools item if in production */
if (process.env.NODE_ENV !== 'production') {
	mainMenuTemplate.push({
		label: 'DevTools',
		submenu: [
			{
				label: 'Toggle DevTools',
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				},
				accelerator:
					process.platform == 'darwin' ? 'Command+I' : 'Ctrl+Shift+I'
			},
			{
				role: 'reload'
			}
		]
	});
}

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
	/** Build menu from template */
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	/** Insert menu */
	Menu.setApplicationMenu(mainMenu);

	/** Quit app when main window closed */
	mainWindow.on('closed', () => {
		app.quit();
	});
});
/** Handle createAddWindow */
const createAddWindow = () => {
	addWindow = new BrowserWindow({
		width: 300,
		height: 200,
		title: 'Add item to list'
	});
	/** Load HTML into newly created window */
	addWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'addWindow.html'),
			protocol: 'file:',
			slashes: true
		})
	);
	/** Garbage collection handle */
	addWindow.on('close', () => {
		addWindow = null;
	});
};
