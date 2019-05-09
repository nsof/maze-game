export default class Ball extends Phaser.Physics.Arcade.Sprite {
	BALL_SCALE = 0.25;
	BALL_SIZE = 144;

	constructor(scene, x, y) {
		super(scene, x, y, "ball");

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.setCollideWorldBounds(true)
			.setBounce(1)
			.setScale(this.BALL_SCALE)
			.setVelocityX(0);
	}
}
