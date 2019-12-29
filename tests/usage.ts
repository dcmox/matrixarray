import { MatrixArray } from '../matrixArray'

const data: MatrixArray = new MatrixArray([[1, 2, 3], [3, 4, 5]])

console.log(data.row(0)[1]) // returns 2
console.log(data.clone()) // returns a new Float32Array [[1, 2, 3], [3, 4, 5]]
console.log(data.value(1, 1)) // returns 4

console.log(data.columns()) // returns 3
console.log(data.rows()) // returns 2

console.log(data.size()) // returns 24 (bytes)

const dataCompact: any = data.compact() // returns [[1, 2, 3], [3, 4, 5]]
dataCompact[0] = '9'
console.log(dataCompact) // returns [9, [3, 4, 5]]
console.log(data.row(0)) // returns [1, 2, 3]
