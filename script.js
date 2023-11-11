import Object from "./Object.js";
import {clearCanvas} from "./helper.js";
import JumpingObject from "./JumpingObject.js";

const axis = new Object([
	[
		{x: 0, y: 0, z: 0},
		{x: 100, y: 0, z: 0}
	],
	[
		{x: 0, y: 0, z: 0},
		{x: 0, y: 100, z: 0}
	],
	[
		{x: 0, y: 0, z: 0},
		{x: 0, y: 0, z: 100}
	],
])

const k = new JumpingObject([
	[
		{x: 0, y: 0, z: 0},
		{x: 40, y: 0, z: 0},
	],
	[
		{x: 40, y: 0, z: 0},
		{x: 40, y: 40, z: 0},
	],
	[
		{x: 40, y: 40, z: 0},
		{x: 0, y: 40, z: 0},
	],
	[
		{x: 0, y: 40, z: 0},
		{x: 0, y: 0, z: 0},
	],
	[
		{x: 0, y: 0, z: 40},
		{x: 40, y: 0, z: 40},
	],
	[
		{x: 40, y: 0, z: 40},
		{x: 40, y: 40, z: 40},
	],
	[
		{x: 40, y: 40, z: 40},
		{x: 0, y: 40, z: 40},
	],
	[
		{x: 0, y: 40, z: 40},
		{x: 0, y: 0, z: 40},
	],
	[
		{x: 0, y: 0, z: 0},
		{x: 0, y: 0, z: 40},
	],
	[
		{x: 40, y: 40, z: 0},
		{x: 40, y: 40, z: 40},
	],
	[
		{x: 0, y: 40, z: 0},
		{x: 0, y: 40, z: 40},
	],
	[
		{x: 40, y: 0, z: 0},
		{x: 40, y: 0, z: 40},
	],
])

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

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

axis.render()
k.render()

setInterval(() => {
	clearCanvas(ctx)
	axis.render()
	k.rotate(0, 1, 0)
	k.render()
}, 17)