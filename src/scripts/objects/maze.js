export default class Maze  {
	mazeTile;
	scene;

	constructor(scene, x, y, mazeId) {
		this.scene = scene;

		var map = scene.make.tilemap({ key: "maze1Tilemap" });
		var tileSet = map.tilesets[0];
		var tileOutline = tileSet.tileData[0].objectgroup.objects[0];
		//for some reason the matter body is somewhat offset 
		tileOutline.polygon.forEach(o => o.x += 10)

		var config = {
			type: 'fromVertices',
			verts: [tileOutline.polygon],
		}

		var options = {
			shape: config,
			ignoreGravity: true,
			isStatic: true,
		}
		this.mazeTile = scene.matter.add.sprite(x, y, "maze1Tileset", undefined, options);

		this.scene.events.on("update", this.update, this);
		this.scene.events.once("shutdown", this.destroy, this);
		this.scene.events.once("destroy", this.destroy, this);
	}

	update(time, delta) {
	
		var ROTATION_SPEED = 0.1;
		var r = this.mazeTile.rotation;

		if (this.scene.keys.left.isDown) {
			r -= ROTATION_SPEED;
		} else if (this.scene.keys.right.isDown) {
			r += ROTATION_SPEED;
		} else {
		}

		r %= Phaser.Math.PI2;
		this.mazeTile.rotation = r;
	}

	shutdown(sceneSystem, data) {
		console.log("shutting down");
		destroy();
	}

	destroy(sceneSystem) { //Phaser.Scenes.Systems
		console.log("destroying maze");
		this.scene.events.off("update", this.update, this);
		this.scene.events.off("shutdown", this.shutdown, this);
		this.scene.events.off("destroy", this.destroy, this);

		this.mazeTile.destroy();
	}
}
