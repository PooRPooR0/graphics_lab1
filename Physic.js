import Object from "./Object.js";

export default class Physic extends Object {
	weight = 10
	speed = 0
	a = 0
	ground = 0

	constructor(props) {
		super(props);
	}

	jump(f) {
		this.speed = f / this.weight
		this.ground = this.y
	}

	restore() {
		super.restore()
		this.speed = 0
		this.a = 0
		this.ground = 0
	}

	live() {
		if (this.y >= this.ground) {
			this.a = this.a - 10
			this.speed = this.speed + this.a * 0.016
			this.move(0, this.speed / 16, 0)
		} else if (this.a < 0) {
			this.speed = 0
			this.a = 0
		}

		this.render()
	}
}