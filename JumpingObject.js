import Object from "./Object.js";

export default class JumpingObject extends Object {
	constructor(props) {
		super(props);
	}

	jump() {
		const len = 1000

		const start = Date.now();

		const timer = setInterval(() => {
			const delta = Date.now() - start

			if (delta >= len) {
				clearInterval(timer)
				return;
			}

			this.move(0, (len / 2 - delta) / 136, 0);
		}, 17)
	}
}