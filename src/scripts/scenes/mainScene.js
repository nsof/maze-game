import Ball from "../objects/ball";
import Maze from "../objects/maze";
import FpsText from "../objects/fpsText";

export default class MainScene extends Phaser.Scene {
	fpsText;
	ball;
	mazeTile;
	keys;
	maze;

	constructor() {
		super({key: "MainScene"});
	}

	preload() {
		//////move this to PreloadScene.preload() at a later time
		this.load.image("ball", "assets/img/ball.png");

		this.load.tilemapTiledJSON("maze1Tilemap", "assets/tilemaps/maze1Tilemap.json");
		this.load.image("maze1Tileset", "assets/img/maze1.png");
		////////////////////////////////

		this.keys = this.input.keyboard.addKeys({
			left: Phaser.Input.Keyboard.KeyCodes.LEFT,
			right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
		});

	}

	create() {
		this.matter.world.setBounds();

		this.ball = new Ball(this, this.cameras.main.width / 2, this.cameras.main.height / 2);

		this.maze = new Maze(this, this.cameras.main.width / 2, this.cameras.main.height / 2, "maze1");

		if (this.matter.world.drawDebug === true)
			this.fpsText = new FpsText(this);
	}

	update() {
		if (this.matter.world.drawDebug === true)
			this.fpsText.update(this);

		this.maze.update(this);
	}
}
