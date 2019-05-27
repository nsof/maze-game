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
		// if (parts.length > 1) {
			parts.forEach(part => {
				part.polygon.forEach(p => {
					p.x += part.x;
					p.y += part.y;
				})
			})
		// }
		parts = parts.map(part => part.polygon)

		return parts;
	}

	update(time, delta) {
		var r = this.mazeTile.rotation + this.getInputRotatationDelta();
		r = Phaser.Math.Angle.Wrap(r);
		this.mazeTile.setRotation(r);
	}

	getInputRotatationDelta() {
	//return rotation speed 
		var MAX_ROTATION_SPEED = 0.1;
		var d = 0;

		if (this.scene.keys.left.isDown) {
			d = -MAX_ROTATION_SPEED;
		} else if (this.scene.keys.right.isDown) {
			d = MAX_ROTATION_SPEED;
		} else if (this.scene.input.activePointer.isDown) {
			if (this.scene.input.activePointer.downX > this.scene.game.config.width/2) {
				d = MAX_ROTATION_SPEED;
			} else {
				d = -MAX_ROTATION_SPEED;
			}
		}

		return d;
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
