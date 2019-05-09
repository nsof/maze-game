import Ball from "../objects/ball";
import Maze from "../objects/maze";
import FpsText from "../objects/fpsText";

export default class MainScene extends Phaser.Scene {
	fpsText;
	ball;
	maze;

	constructor() {
		super({key: "MainScene"});
	}

	create() {
		// var map = this.add.tilemap("mazesTilemap");
		// var tileset = map.addTilesetImage("mazesTilemapImage");
		this.ball = new Ball(this, this.cameras.main.width / 2, 0);
		this.maze = new Maze(this, this.cameras.main.width / 2, this.cameras.main.height - 200, "mazesTilemapImage");
		this.fpsText = new FpsText(this);

		this.physics.add.collider(this.ball, this.maze);

		// display the Phaser.VERSION
		this.add
			.text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
				color: "#000000",
				fontSize: 40,
			})
			.setOrigin(1, 0);
	}

	update() {
		this.fpsText.update(this);
	}
}
