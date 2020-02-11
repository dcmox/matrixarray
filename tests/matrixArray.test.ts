import assert from 'assert'
import sinon from 'sinon'
const MatrixArray = require('../matrixArray')

describe('MatrixArray test suite', () => {
	it('should create a MatrixArray and return the right values', () => {
		const array = new MatrixArray([
			[1, 2, 3],
			[4, 5, 6],
		])
		assert.strictEqual(3, array.columns())
		assert.strictEqual(2, array.rows())
		assert.strictEqual(1, array.value(0, 0))
		assert.strictEqual(2, array.value(0, 1))
		assert.strictEqual(5, array.value(1, 1))
		assert.deepEqual(
			[
				[1, 2, 3],
				[4, 5, 6],
			],
			array.compact(),
		)
		assert.deepEqual(24, array.size())

		array.set([7, 7, 7])
		assert.deepEqual(
			[
				[7, 7, 7],
				[4, 5, 6],
			],
			array.compact(),
		)
		array.set([8, 8, 8], 1)
		assert.deepEqual(
			[
				[7, 7, 7],
				[8, 8, 8],
			],
			array.compact(),
		)
	})
})
