export default class Maze  {
	mazeTile;

	constructor(scene, x, y, mazeId) {
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
	}

	update(scene) {
	
		var ROTATION_SPEED = 0.1;
		var r = this.mazeTile.rotation;

		if (scene.keys.left.isDown) {
			r -= ROTATION_SPEED;
		} else if (scene.keys.right.isDown) {
			r += ROTATION_SPEED;
		} else {
		}

		r %= Phaser.Math.PI2;
		this.mazeTile.rotation = r;
	}


}
