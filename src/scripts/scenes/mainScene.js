import Ball from "../objects/ball";
import Maze from "../objects/maze";
import FpsText from "../objects/fpsText";

export default class MainScene extends Phaser.Scene {
	fpsText;
	// ball;
	mazeTile;
	keys;

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
		var ball = this.matter.add.image(this.cameras.main.width / 2, 0, "ball");
		ball.setCircle(ball.width / 2, { restitution: 1.0, friction: 0.0 })
			.setScale(0.25)
			.setBounce(1)
			.setFriction(0, 0, 0);
		
		var map = this.make.tilemap({ key: "maze1Tilemap" });
		// var tileset = map.addTilesetImage("maze1Tileset");
		// var tileOutline = tileset.getTileData(0).objectgroup.objects[0];
		// var mazeTile = map.layers[0].data[0][0];
		// var mazeLayer = map.createDynamicLayer("maze", tileset, 0, 0);
		// var tileData = mazeTile.getTileData();
		var tileSet = map.tilesets[0];
		var tileOutline =  tileSet.tileData[0].objectgroup.objects[0];

		tileOutline.polygon.forEach(o => o.x += 10) // why is this????

		var config = {
			type: 'fromVertices',
			verts: [tileOutline.polygon],
		}

		var options = {
			shape: config,
			ignoreGravity: true,
			isStatic: true,
		}
		this.mazeTile = this.matter.add.image(this.cameras.main.width / 2 - tileSet.tileWidth / 2, 
			this.cameras.main.height -200, "maze1Tileset", undefined, options);
		

		this.fpsText = new FpsText(this);
	}

	update() {
		this.fpsText.update(this);

		var ROTATION_SPEED = 0.1;
		var r = this.mazeTile.rotation;

		if (this.keys.left.isDown) {
			r -= ROTATION_SPEED;
		} else if (this.keys.right.isDown) {
			r += ROTATION_SPEED;
		} else {
		}
		
		r %= Phaser.Math.PI2;
		this.mazeTile.rotation = r;
	}
}
