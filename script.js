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

const canvas = document.getElementById('canvas')
const debugCanvas = document.getElementById('debugCanvas')

const scene = new Scene(canvas, debugCanvas);

scene.addObject(k)

scene.addColor('#237675')
scene.addColor('#142cc2')
scene.addColor('#c422c3')

scene.rotate(0, 40, 0)

scene.render()

// setInterval(() => {
// 	scene.clear()
//
// 	scene.rotate(0, 1, 0)
//
// 	scene.render()
// }, 17)