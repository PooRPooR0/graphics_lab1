import {
	equalWithPrecision,
	getVector,
	getVector2D,
	getVector2DAngle,
	middleVectors,
	multiplyMatrices,
	vectorMultiply
} from "./helper.js";

export default class Scene {
	#objects = []
	#colors = []

	constructor(canvas) {
		this.width = canvas.width
		this.height = canvas.height
		this.ctx = canvas.getContext('2d')
	}

	_edgeToArray(edge) {
		return edge.map((point) => [point.x, point.y, point.z, 1])
	}

	_arrayToEdge(array) {
		return array.map((point) => ({x: point[0], y: point[1], z: point[2]}))
	}

	_getEdgeProection(edgeArray) {
		const proection = [
			[1, 0, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 1, -0.001],
			[0, 0, 0, 1],
		]
		return multiplyMatrices(edgeArray, proection)
	}

	_getViewProection(edgeArray) {
		const proection = [
			[1, 0, 0, 0],
			[0, -1, 0, 0],
			[0, 0, 1, 0],
			[this.width / 2, this.height / 2, 0, 1],
		]
		return multiplyMatrices(edgeArray, proection)
	}

	_calcProection(proection) {
		return proection.map(point => [
			Math.round(point[0] / point[3]),
			Math.round(point[1] / point[3]),
			Math.round(point[2] / point[3]),
			1
		])
	}

	_getEdgeWithProperties(edge, index) {
		const minX = edge.reduce(((acc, point) => point.x < acc ? point.x : acc), edge[0].x)
		const maxX = edge.reduce(((acc, point) => point.x > acc ? point.x : acc), edge[0].x)
		const minY = edge.reduce(((acc, point) => point.y < acc ? point.y : acc), edge[0].y)
		const maxY = edge.reduce(((acc, point) => point.y > acc ? point.y : acc), edge[0].y)
		return {
			points: edge,
			minX,
			maxX,
			minY,
			maxY,
			color: this.#colors[index]
		}
	}

	_getEdgeCoords(edge, i) {
		const edgeArray = this._edgeToArray(edge)
		const proection = this._getEdgeProection(edgeArray)
		const viewProection = this._getViewProection(this._calcProection(proection))
		return this._getEdgeWithProperties(this._arrayToEdge(viewProection), i)
	}

	_renderEdge(transformedEdge) {
		this.ctx.beginPath();
		this.ctx.moveTo(transformedEdge[0].x, transformedEdge[0].y)
		transformedEdge.forEach((point) => {
			this.ctx.lineTo(point.x, point.y);
		})
		this.ctx.lineTo(transformedEdge[0].x, transformedEdge[0].y);
		this.ctx.closePath();
		this.ctx.stroke();
	}

	_isEdgeOutside(edge, x, y, w) {
		return x > Math.round(edge.maxX) || x + w < Math.round(edge.minX) || y > Math.round(edge.maxY) || y + w < Math.round(edge.minY);
	}

	_getPointEdgeZ(edge, x, y) {
		const points = edge.points

		const normales = []

		points.forEach((point, i) => {
			const prevPoint = i === 0 ? points[points.length - 1] : points[i - 1]
			const nextPoint = i + 1 === points.length ? points[0] : points[i + 1]

			normales.push(vectorMultiply(getVector(point, nextPoint), getVector(point, prevPoint)))
		})

		const normal = middleVectors(...normales)

		const [a, b, c] = normal

		const d = -(a * points[0].x + b * points[0].y + c * points[0].z)

		return -(a * x + b * y + d) / c
	}

	_checkInsideEdge(edge, x, y, w) {
		const px = x + w / 2
		const py = y + w / 2
		const points = edge.points

		let angle = 0

		points.forEach((point, index) => {
			const nextPoint = index + 1 === points.length ? points[0] : points[index + 1]

			const a = getVector2D({x: px, y: py}, point)
			const b = getVector2D({x: px, y: py}, nextPoint)

			angle += getVector2DAngle(a, b)
		})

		return equalWithPrecision(Math.abs(angle), 360, 2);

	}

	_WarnockAlgo(edges, x = 0, y = 0, w = 800) {
		const filteredEdges = edges.filter((edge) => !this._isEdgeOutside(edge, x, y, w))
		if (!filteredEdges.length) {
			this.ctx.fillStyle = "white"
			this.ctx.fillRect(x, y, w, w)
			return
		}

		const sortedEdges = filteredEdges.sort((edge1, edge2) => {
			const z1 = this._getPointEdgeZ(edge1, x, y)
			const z2 = this._getPointEdgeZ(edge2, x, y)

			return z2 - z1
		})

		if (w === 1) {
			for (let j = 0; j < sortedEdges.length; j++) {
				const topEdge = sortedEdges[j].points
				for (let i = 0; i < topEdge.length; i++) {
					const firstPoint = topEdge[i]
					const lastPoint  = i + 1 === topEdge.length ? topEdge[0] : topEdge[i + 1]

					const deltaX = lastPoint.x - firstPoint.x
					const deltaY = lastPoint.y - firstPoint.y
					const m = deltaX !== 0 ? deltaY / deltaX : 0
					const b = lastPoint.y - m * lastPoint.x

					const minY = Math.min(firstPoint.y, lastPoint.y)
					const maxY = Math.max(firstPoint.y, lastPoint.y)
					const minX = Math.min(firstPoint.x, lastPoint.x)
					const maxX = Math.max(firstPoint.x, lastPoint.x)

					if (this._checkInsideEdge(sortedEdges[j], x, y, w)) {
						this.ctx.fillStyle = sortedEdges[j].color
						this.ctx.fillRect(x, y, w, w)
						return
					}

					if (deltaX === 0 && equalWithPrecision(x, firstPoint.x, 0.5) && minY < y && y < maxY) {
						this.ctx.fillStyle = sortedEdges[j].color
						this.ctx.fillRect(x, y, 1, 1)
						return;
					}

					if (deltaY === 0 && equalWithPrecision(y, firstPoint.y, 0.5)  && minX < x && x < maxX) {
						this.ctx.fillStyle = sortedEdges[j].color
						this.ctx.fillRect(x, y, 1, 1)
						return;
					}

					if (!(minY <= y && y <= maxY && minX <= x && x <= maxX)) continue

					if (Math.abs(y - m * x - b) <= Math.abs(m)) {
						this.ctx.fillStyle = sortedEdges[j].color
						this.ctx.fillRect(x, y, 1, 1)
						return;
					}
				}
			}
		} else {
			const nextSize = Math.round(w / 2)

			this._WarnockAlgo(filteredEdges, x, y, nextSize)
			this._WarnockAlgo(filteredEdges, x + nextSize, y, nextSize)
			this._WarnockAlgo(filteredEdges, x, y + nextSize, nextSize)
			this._WarnockAlgo(filteredEdges, x + nextSize, y + nextSize, nextSize)
		}
	}

	addObject(object) {
		this.#objects.push(object)
	}

	addColor(color) {
		this.#colors.push(color)
	}

	clear() {
		this.ctx.fillStyle = "white"
		this.ctx.fillRect(0, 0, this.width, this.height)
	}

	rotate(x, y, z) {
		this.#objects.forEach(obj => obj.rotate(x, y, z))
	}

	render() {
		const edges = []
		this.#objects.forEach((obj) => obj.edges.forEach((edge, i) => edges.push(this._getEdgeCoords(edge, i))))
		this._WarnockAlgo(edges, 0, 0, this.width)
	}
}