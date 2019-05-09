export default class Maze extends Phaser.Physics.Arcade.Sprite {
	MAZE_SCALE = 0.25;

	constructor(scene, x, y, mazeId) {
        super(scene, x, y, mazeId);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.setCollideWorldBounds(true)
			.setImmovable(true)
			.setInteractive();

		this.body.setAllowGravity(false);
	}
}
