export function multiplyMatrices(a, b) {
	const m = new Array(a.length);

	for (let row = 0; row < a.length; row++) {
		m[row] = new Array(b[0].length);

		for (let column = 0; column < b[0].length; column++) {
			m[row][column] = 0;

			for (let i = 0; i < a[0].length; i++) {
				m[row][column] += a[row][i] * b[i][column];
			}
		}
	}

	return m;
}

export function angleToRadians(angle) {
	return angle * Math.PI / 180
}

export function radiansToAngle(radians) {
	return radians / (Math.PI / 180)
}

export function equalWithPrecision(num1, num2, precision) {
	return Math.abs(num2 - num1) <= precision
}

export function getVector(startPoint, endPoint) {
	return {x: endPoint.x - startPoint.x, y: endPoint.y - startPoint.y, z: endPoint.z - startPoint.z}
}

export function getVector2D(startPoint, endPoint) {
	return {x: endPoint.x - startPoint.x, y: endPoint.y - startPoint.y}
}

export function vectorMultiply(a, b) {
	return [a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x]
}

export function middleVectors(...vectors) {
	let a = 0, b = 0, c = 0

	vectors.forEach(vector => {
		a += vector[0]
		b += vector[1]
		c += vector[2]
	})

	return [a / vectors.length, b / vectors.length, c / vectors.length]
}

export function getVector2DLength(vector) {
	return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
}

export function scalarMultyply(a, b) {
	return a.x * b.x + a.y * b.y
}

export function getVector2DAngle(a, b) {
	return radiansToAngle(Math.acos(scalarMultyply(a, b) / (getVector2DLength(a) * getVector2DLength(b))))
}

export async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}