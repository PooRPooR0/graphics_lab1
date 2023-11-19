import Object from "./Object.js";
import Scene from "./Scene.js";

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

const k = new Object([
	[
		{x: -10, y: 0, z: 0},
		{x: -30, y: 30, z: 0},
		{x: -20, y: 60, z: 0},
		{x: 20, y: 70, z: 0},
		{x: 30, y: 30, z: 0},
		{x: 10, y: 0, z: 0},
	],
	[
		{x: -10, y: 0, z: 40},
		{x: -30, y: 30, z: 40},
		{x: -20, y: 60, z: 40},
		{x: 20, y: 70, z: 40},
		{x: 30, y: 30, z: 40},
		{x: 10, y: 0, z: 40},
	],
	[
		{x: 0, y: 20, z: 100},
		{x: 0, y: 60, z: 100},
		{x: 0, y: 50, z: -100},
		{x: 0, y: 20, z: -100},
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

document.getElementById('restore').addEventListener('click', () => {
	k.restore()
})

document.body.onkeyup = function(e) {
	if (e.key === " " || e.code === "Space") k.jump(1000)
}

const canvas = document.getElementById('canvas')

const scene = new Scene(canvas);

scene.addObject(k)

scene.addColor('#237675')
scene.addColor('#142cc2')
scene.addColor('#c422c3')

scene.rotate(0, 20, 0)

scene.render()

setInterval(() => {
	scene.clear()

	scene.rotate(0, 1, 0)

	scene.render()
}, 17)