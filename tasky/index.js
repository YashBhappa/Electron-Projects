const path = require("path");
const electron = require("electron");
const TimerTray = require("./app/timer_tray");
const MainWindow = require("./app/main_window");

const { app, ipcMain, Tray, Menu } = electron;

let mainWindow;
let tray;

app.on("ready", () => {
	mainWindow = new MainWindow(`src/index.html`);

	const iconName =
		process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
	const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

	// tray = new TimerTray(iconPath, mainWindow);
	tray = new Tray(iconPath);

	const menuConfig = Menu.buildFromTemplate([
		{
			label: "Quit",
			click: () => app.quit(),
		},
	]);

	tray.setContextMenu(menuConfig);

	tray.on("click", (event, bounds) => {
		const { x, y } = bounds;
		console.log(x, y);

		// Window height and width
		const { height, width } = mainWindow.getBounds();

		if (mainWindow.isVisible()) {
			mainWindow.hide();
		} else {
			const yPosition = process.platform === "darwin" ? y : y - height;
			mainWindow.setBounds({
				x: x - width / 2,
				y: yPosition,
				height,
				width,
			});
			mainWindow.show();
		}
	});
});

ipcMain.on("update-timer", (event, timeLeft) => {
	tray.setTitle(timeLeft);
});
