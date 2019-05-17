export default class Ball {
	ball;

	constructor(scene, x, y) {
		this.ball = scene.matter.add.sprite(x, y, "ball");
		// scene.add.existing(this.ball);
		// scene.physics.add.existing(this.ball);

		this.ball.setCircle(this.ball.width / 2, { restitution: 1.0, friction: 0.0 })
			.setScale(0.25)
			.setBounce(1)
			.setFriction(0, 0, 0)
			.setDensity(0.1)
			;
	}

}
