import Object from "./Object.js";
import {clearCanvas} from "./helper.js";
import JumpingObject from "./JumpingObject.js";

const axis = new Object([
	[
		{x: 0, y: 0, z: 0},
		{x: 400, y: 0, z: 0}
	],
	[
		{x: 0, y: 0, z: 0},
		{x: 0, y: 400, z: 0}
	],
	[
		{x: 0, y: 0, z: 0},
		{x: 0, y: 0, z: 2000}
	],
])

const k = new JumpingObject([
	[
		{x: 0, y: 0, z: 0},
		{x: 0, y: 100, z: 0},
	],
	[
		{x: 0, y: 100, z: 0},
		{x: 20, y: 100, z: 0},
	],
	[
		{x: 20, y: 100, z: 0},
		{x: 20, y: 65, z: 0},
	],
	[
		{x: 20, y: 65, z: 0},
		{x: 65, y: 100, z: 0},
	],
	[
		{x: 65, y: 100, z: 0},
		{x: 95, y: 100, z: 0},
	],
	[
		{x: 95, y: 100, z: 0},
		{x: 25, y: 50, z: 0},
	],
	[
		{x: 25, y: 50, z: 0},
		{x: 95, y: 0, z: 0},
	],
	[
		{x: 95, y: 0, z: 0},
		{x: 65, y: 0, z: 0},
	],
	[
		{x: 65, y: 0, z: 0},
		{x: 20, y: 30, z: 0},
	],
	[
		{x: 20, y: 30, z: 0},
		{x: 20, y: 0, z: 0},
	],
	[
		{x: 20, y: 0, z: 0},
		{x: 0, y: 0, z: 0},
	],
	///
	[
		{x: 0, y: 0, z: 20},
		{x: 0, y: 100, z: 20},
	],
	[
		{x: 0, y: 100, z: 20},
		{x: 20, y: 100, z: 20},
	],
	[
		{x: 20, y: 100, z: 20},
		{x: 20, y: 65, z: 20},
	],
	[
		{x: 20, y: 65, z: 20},
		{x: 65, y: 100, z: 20},
	],
	[
		{x: 65, y: 100, z: 20},
		{x: 95, y: 100, z: 20},
	],
	[
		{x: 95, y: 100, z: 20},
		{x: 25, y: 50, z: 20},
	],
	[
		{x: 25, y: 50, z: 20},
		{x: 95, y: 0, z: 20},
	],
	[
		{x: 95, y: 0, z: 20},
		{x: 65, y: 0, z: 20},
	],
	[
		{x: 65, y: 0, z: 20},
		{x: 20, y: 30, z: 20},
	],
	[
		{x: 20, y: 30, z: 20},
		{x: 20, y: 0, z: 20},
	],
	[
		{x: 20, y: 0, z: 20},
		{x: 0, y: 0, z: 20},
	],
	///
	[
		{x: 0, y: 0, z: 0},
		{x: 0, y: 0, z: 20},
	],
	[
		{x: 0, y: 100, z: 0},
		{x: 0, y: 100, z: 20},
	],
	[
		{x: 20, y: 100, z: 0},
		{x: 20, y: 100, z: 20},
	],
	[
		{x: 20, y: 65, z: 0},
		{x: 20, y: 65, z: 20},
	],
	[
		{x: 65, y: 100, z: 0},
		{x: 65, y: 100, z: 20},
	],
	[
		{x: 95, y: 100, z: 0},
		{x: 95, y: 100, z: 20},
	],
	[
		{x: 25, y: 50, z: 0},
		{x: 25, y: 50, z: 20},
	],
	[
		{x: 95, y: 0, z: 0},
		{x: 95, y: 0, z: 20},
	],
	[
		{x: 65, y: 0, z: 0},
		{x: 65, y: 0, z: 20},
	],
	[
		{x: 20, y: 30, z: 0},
		{x: 20, y: 30, z: 20},
	],
	[
		{x: 20, y: 0, z: 0},
		{x: 20, y: 0, z: 20},
	],
])

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

axis.render()
k.render()

document.getElementById('move').addEventListener('click', () => {
	const x = +document.getElementById('xm').value
	const y = +document.getElementById('ym').value
	const z = +document.getElementById('zm').value

	k.move(x, y, z);
})

document.getElementById('rotate').addEventListener('click', () => {
	const x = +document.getElementById('xr').value
	const y = +document.getElementById('yr').value
	const z = +document.getElementById('zr').value

	k.rotate(x, y, z);
})

document.getElementById('scale').addEventListener('click', () => {
	const x = +document.getElementById('xs').value
	const y = +document.getElementById('ys').value
	const z = +document.getElementById('zs').value

	k.scale(x, y, z);
})

document.getElementById('jump').addEventListener('click', () => {
	k.jump()
})

document.getElementById('restore').addEventListener('click', () => {
	k.restore()
})

document.body.onkeyup = function(e) {
	if (e.key === " " || e.code === "Space") k.jump(1000)
}

setInterval(() => {
	clearCanvas(ctx)
	axis.render()
	k.render()
}, 17)