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

	preload() {
		//////move this to PreloadScene.preload() at a later time
		this.load.image("ball", "assets/img/ball.png");

		this.load.tilemapTiledJSON("maze1Tilemap", "assets/tilemaps/maze1Tilemap.json");
		this.load.image("maze1Tileset", "assets/img/maze1.png");
		////////////////////////////////
	}

	create() {
		this.matter.world.setBounds();
		this.ball = this.matter.add.image(this.cameras.main.width / 2, 0, "ball");
		this.ball
			.setCircle(this.ball.width / 2, { restitution: 1, friction: 0.0 })
			.setScale(0.25)
			.setBounce(1)
			.setFriction(0, 0, 0);

		// var map = this.make.tilemap({ key: "maze1Tilemap" });
		// var tile = map.layer.data[0][0];

		// var tileset = map.addTilesetImage("maze1Tileset");
		// var mazeLayer = map.createDynamicLayer("maze", tileset, 
		// 		this.cameras.main.width/2 - tile.width/2, this.cameras.main.height -200);
		// mazeLayer.setCollision(1);
		// this.matter.world.convertTilemapLayer(mazeLayer);
		// this.maze = new Phaser.Physics.Matter.TileBody(this.matter.world, tile, { addToWorld:true });

		this.fpsText = new FpsText(this);

		// this.physics.add.collider(this.ball, this.maze);

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
