import "phaser";
import "@babel/polyfill";

import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin/src";

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
		matter: {
			debug: true,
		},
	},
	plugins: {
		scene: [
			{
				plugin: PhaserMatterCollisionPlugin, // The plugin class
				key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
				mapping: "matterCollision", // Where to store in the Scene, e.g. scene.matterCollision
			},
		],
	},
};

window.addEventListener("load", () => {
	let game = new Phaser.Game(config);
});
