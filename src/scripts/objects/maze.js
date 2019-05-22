export default class Maze {
	mazeTile;
	scene;

	constructor(scene, x, y, level) {
		this.scene = scene;
		// this.mazeTile = scene.matter.add.sprite(x, y, "emoji", "1f62c", {
		// 	ignoreGravity: true,
		// 	inertia: Infinity,
		// 	isStatic: true,
		// });
		// this.mazeTile = scene.matter.add.sprite(x, y+250, "sheet", "banana", {
		// 	shape: shapes.banana,
		// });
		var shapeName = "maze" + level;
		var shapes = this.scene.cache.json.get("mazes-shapes");
		var shape = shapes[shapeName];
		var options = {
			shape: shape,
		}
		this.mazeTile = scene.matter.add.sprite(x, y, "mazes-sprites", shapeName, options);

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

	destroy(sceneSystem) {
		//Phaser.Scenes.Systems
		console.log("destroying maze");
		this.scene.events.off("update", this.update, this);
		this.scene.events.off("shutdown", this.shutdown, this);
		this.scene.events.off("destroy", this.destroy, this);

		this.mazeTile.destroy();
	}
}
