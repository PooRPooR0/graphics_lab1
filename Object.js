import {angleToRadians, multiplyMatrices} from "./helper.js";

class Object {
	constructor(edges) {
		this.edges = edges
		this.initEdges = edges
	}

	_edgeToArray(edge) {
		return edge.map((point) => [point.x, point.y, point.z, 1])
	}

	_arrayToEdge(array) {
		return array.map((point) => ({x: point[0], y: point[1], z: point[2]}))
	}

	_transformEdges(matrix) {
		return this.edges.map(edge => {
			const edgeArray = this._edgeToArray(edge)
			const newEdge = multiplyMatrices(edgeArray, matrix)
			return this._arrayToEdge(newEdge)
		})
	}

	_rotateX(angle) {
		const radians = angleToRadians(angle)

		this.edges = this._transformEdges([
			[1, 0, 0, 0],
			[0, Math.cos(radians), Math.sin(radians), 0],
			[0, -Math.sin(radians), Math.cos(radians), 0],
			[0, 0, 0, 1],
		])
	}

	_rotateY(angle) {
		const radians = angleToRadians(angle)

		this.edges = this._transformEdges([
			[Math.cos(radians), 0, Math.sin(radians), 0],
			[0, 1, 0, 0],
			[-Math.sin(radians), 0, Math.cos(radians), 0],
			[0, 0, 0, 1],
		])
	}

	_rotateZ(angle) {
		const radians = angleToRadians(angle)

		this.edges = this._transformEdges([
			[Math.cos(radians), -Math.sin(radians), 0, 0],
			[Math.sin(radians), Math.cos(radians), 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1],
		])
	}

	move(x, y, z) {
		this.x += x
		this.y += y
		this.z += z

		this.edges = this._transformEdges([
			[1, 0, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 1, 0],
			[x, y, z, 1],
		])
	}

	rotate(x, y, z) {
		this._rotateX(x)
		this._rotateY(y)
		this._rotateZ(z)
	}

	scale(x, y, z) {
		this.edges = this._transformEdges([
			[x, 0, 0, 0],
			[0, y, 0, 0],
			[0, 0, z, 0],
			[0, 0, 0, 1],
		])
	}

	restore() {
		this.edges = this.initEdges;
		this.x = 0
		this.y = 0
		this.z = 0
	}
}

export default Object