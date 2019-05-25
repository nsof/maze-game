export default class Maze {
	mazeTile;
	scene;

	constructor(scene, x, y, level) {
		this.scene = scene;

		var mazeID = level.toString();

		var options = this.getOptions(mazeID);
		
		this.mazeTile = scene.matter.add.sprite(x, y, "mazes-sprites", mazeID, options);
		// the following fixes the offset of the body
		this.mazeTile.setOriginFromFrame();

		this.scene.events.on("update", this.update, this);
		this.scene.events.once("shutdown", this.destroy, this);
		this.scene.events.once("destroy", this.destroy, this);
	}

	getOptionsFromPE(mazeID) {
		var shapes = this.scene.cache.json.get("mazes-shapes");
		var shape = shapes[mazeID];
		var [dx, dy] = [-75, 0];
		shape.fixtures.forEach(fixture => fixture.vertices.forEach(verticelist => verticelist.forEach(v => (v.x +=dx, v.y -=dy))));
		var options = {
			shape: shape,
		}
		return options;
	}

	getOptions(mazeID) {
		var parts = this.getShapeFromTiledTilesetJSON(mazeID);

		var shape = {
			type: 'fromVertices',
			verts: parts,
		}

		var options = {
			shape: shape,
			ignoreGravity: true,
			isStatic: true,
		}

		return options;
	}

	getShapeFromTiledTilesetJSON(mazeID) {
		var tileset = this.scene.cache.json.get('mazes-tileset');
		var tile = tileset.tiles.find(tile => {
			return tile.properties[0].value == mazeID;
		});

		var parts = tile.objectgroup.objects;

		parts = parts.map(part => part.polygon)

		return parts;
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
