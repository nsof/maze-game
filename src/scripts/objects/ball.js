export default class Ball {
	ball;

	constructor(scene, x, y) {
		this.ball = scene.matter.add.sprite(x, y, "ball");

		this.ball
			.setCircle(this.ball.width / 2, {restitution: 1.0, friction: 0.0})
			.setScale(0.125)
			.setBounce(1)
			.setFriction(0, 0, 0);
	}
}
