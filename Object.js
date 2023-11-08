import {angleToRadians, multiplyMatrices} from "./helper.js";

class Object {
	x = 0
	y = 0
	z = 0

	constructor(edges) {
		this.edges = edges
		this.initEdges = edges
	}

	_edgeToArray(edge) {
		return [
			[edge[0].x, edge[0].y, edge[0].z, 1],
			[edge[1].x, edge[1].y, edge[1].z, 1]
		]
	}

	_arrayToEdge(array) {
		return [
			{x: array[0][0], y: array[0][1], z: array[0][2]},
			{x: array[1][0], y: array[1][1], z: array[1][2]}
		]
	}

	_getEdgeProection(edgeArray) {
		const proection = [
			[1, 0, 0, 0],
			[0, -1, 0, 0],
			[-Math.atan(1 / 2), Math.atan(1 / 2), 1, 0],
			[400, 400, 0, 1],
		]
		return multiplyMatrices(edgeArray, proection)
	}

	_getEdgeCoords(edge) {
		const edgeArray = this._edgeToArray(edge)
		const proection = this._getEdgeProection(edgeArray)
		return this._arrayToEdge(proection)
	}

	_renderEdge(edge) {
		const canvas = document.getElementById('canvas')
		const ctx = canvas.getContext('2d')

		const transformedEdge = this._getEdgeCoords(edge)
		ctx.beginPath();
		ctx.moveTo(transformedEdge[0].x, transformedEdge[0].y)
		ctx.lineTo(transformedEdge[1].x, transformedEdge[1].y);
		ctx.closePath();
		ctx.stroke();
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

	render() {
		this.edges.forEach((edge) => this._renderEdge(edge))
	}
}

export default Object