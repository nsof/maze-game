import Ball from "../objects/Ball";
import FpsText from "../objects/fpsText";

export default class MainScene extends Phaser.Scene {
	fpsText;

	constructor() {
		super({key: "MainScene"});
	}

	create() {
		/**
		 * Delete all the code below to start a fresh scene
		 */
		new Ball(this, this.cameras.main.width / 2, 0);
		this.fpsText = new FpsText(this);

		// display the Phaser.VERSION
		this.add
			.text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
				color: "#000000",
				fontSize: 40,
			})
			.setOrigin(1, 0);
	}

	update() {
		this.fpsText.update(this);
	}
}
