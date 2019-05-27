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

		this.load.image("ball", "assets/ball.png");

		this.load.atlas("mazes-sprites", "assets/mazes-sprites.png", "assets/mazes-sprites.json");
		this.load.json("mazes-tileset", "assets/mazes-tileset.json");
		this.load.json("mazes-shapes", "assets/mazes-shapes.json");

		////////////////////////////////

		this.keys = this.input.keyboard.addKeys({
			left: Phaser.Input.Keyboard.KeyCodes.LEFT,
			right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
		});
	}

	create() {
		var PADDING = 100;
		this.matter.world.setBounds(
			PADDING,
			PADDING,
			this.game.config.width - 2 * PADDING,
			this.game.config.height - 2 * PADDING,
			10
		);

		var level = 2;

		this.maze = new Maze(this, this.game.config.width / 2, this.game.config.height / 2, level);

		this.ball = new Ball(this, this.game.config.width / 2, this.game.config.height / 2);

		this.setBallOutOfBoundsDetection();

		if (this.matter.world.drawDebug === true) this.fpsText = new FpsText(this);
	}

	update() {
		if (this.matter.world.drawDebug === true) this.fpsText.update(this);
	}

	setBallOutOfBoundsDetection() {
		var b = this.matter.world.walls.bottom;
		var t = this.matter.world.walls.top;
		var l = this.matter.world.walls.left;
		var r = this.matter.world.walls.right;

		this.ballOutOfBoundsDetection = this.matterCollision.addOnCollideStart({
			objectA: this.ball.ball,
			objectB: [b, l, r, t],
			callback: (eventData) => {
				// this.scene.restart();
				// console.log("ball collision with walls");
			},
			context: this,
		});

		// this.matter.world.on("collisionstart", this.ballCollisionDetection, this);
	}

	shutdown() {
		this.destroy();
	}

	destroy() {
		console.log("destroying scene");
		this.ballOutOfBoundsDetection();

		// this.matter.world.off("collisionstart", this.ballCollisionDetection, this);
	}

	ballCollisionDetection(event) {
		console.log("ball collision detection");
	}
}
