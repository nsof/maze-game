import Ball from "../objects/ball";
import Maze from "../objects/maze";
import FpsText from "../objects/fpsText";

export default class MainScene extends Phaser.Scene {
	fpsText;
	ball;
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
		var PADDING = 100;
		this.matter.world.setBounds(PADDING, PADDING, this.cameras.main.width - 2*PADDING, 
			this.cameras.main.height - 2*PADDING, 10);

		this.ball = new Ball(this, this.cameras.main.width / 2, this.cameras.main.height / 2);

		this.maze = new Maze(this, this.cameras.main.width / 2, this.cameras.main.height / 2, "maze1");

		this.setBallOutOfBoundsDetection();

		if (this.matter.world.drawDebug === true)
			this.fpsText = new FpsText(this);
	}

	update() {
		if (this.matter.world.drawDebug === true)
			this.fpsText.update(this);

		//this.maze.update(this);
	}

	setBallOutOfBoundsDetection() {
		var b = this.matter.world.walls.bottom;
		var t = this.matter.world.walls.top;
		var l = this.matter.world.walls.left;
		var r = this.matter.world.walls.right;

		this.ballOutOfBoundsDetection = this.matterCollision.addOnCollideStart({
			objectA: this.ball.ball,
			objectB: [b, l, r, t],
			callback: eventData => {
				this.scene.restart();
			},
			context: this
		});
	}

	shutdown () {
		this.destroy();
	}


	destroy () {
		console.log("destroying scene");
		this.ballOutOfBoundsDetection();
	}
}
