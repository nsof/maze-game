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
		
		// var map = this.make.tilemap({ key: "maze1Tilemap" });
		// var tileSet = map.tilesets[0];
		// var tileOutline =  tileSet.tileData[0].objectgroup.objects[0];

		// tileOutline.polygon.forEach(o => o.x += 10) // why is this????

		// var config = {
		// 	type: 'fromVertices',
		// 	verts: [tileOutline.polygon],
		// }

		// var options = {
		// 	shape: config,
		// 	ignoreGravity: true,
		// 	isStatic: true,
		// }
		// this.mazeTile = this.matter.add.image(this.cameras.main.width / 2 - tileSet.tileWidth / 2, 
		// 	this.cameras.main.height -200, "maze1Tileset", undefined, options);
		

		this.fpsText = new FpsText(this);
	}

	update() {
		this.fpsText.update(this);
		this.maze.update(this);

		// var ROTATION_SPEED = 0.1;
		// var r = this.mazeTile.rotation;

		// if (this.keys.left.isDown) {
		// 	r -= ROTATION_SPEED;
		// } else if (this.keys.right.isDown) {
		// 	r += ROTATION_SPEED;
		// } else {
		// }
		
		// r %= Phaser.Math.PI2;
		// this.mazeTile.rotation = r;
	}
}
