import "phaser";
import "@babel/polyfill";

import MainScene from "./scenes/mainScene";
import PreloadScene from "./scenes/preloadScene";

const DEFAULT_WIDTH = 720;
const DEFAULT_HEIGHT = 1280;

const config = {
	backgroundColor: "#A0A0A0",
	scale: {
		parent: "phaser-game",
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: DEFAULT_WIDTH,
		height: DEFAULT_HEIGHT,
	},
	scene: [PreloadScene, MainScene],
	physics: {
		default: "matter",
		// default: "arcade",
		arcade: {
			debug: false,
			gravity: {y: 400},
		},
	},
};

window.addEventListener("load", () => {
	let game = new Phaser.Game(config);
});
