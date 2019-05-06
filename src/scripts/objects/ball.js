export default class Ball extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "ball");
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.setCollideWorldBounds(true)
			.setBounce(1)
			.setScale(0.125);
	}
}
