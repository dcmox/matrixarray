# matrixarray

The MatrixArray module makes working with large two dimensional arrays in JavaScript easy and seamless. Using MatrixArray you don't have to worry about deep cloning or the intricacies of managing a buffer. Arrays passed into MatrixArray are flattened and stored in an ArrayBuffer for efficiency.

## Sample Usage 

### TypeScript

```typescript 
let data = new MatrixArray([[1, 2], [3, 4]])

console.log(data.row(0)[1]) // returns 2
console.log(data.clone()) // returns a new Float32Array [[1, 2], [3, 4]]
console.log(data.value(1, 1)) // returns 4

let dataCompact: any = data.compact() // returns [[1, 2], [3, 4]]
dataCompact[0] = '9'
console.log(dataCompact) // returns [9, [3,4]]
console.log(data.row(0)) // returns [1, 2]
```

See tests/usage.ts for an example on how to MatrixArray with NodeJS and Typescript.

## Available Scripts 

In the project directory, you can run:

### `npm run build`

Builds matrixArray.ts and tests/usage.ts into JS files for usage. usage.ts is a demo of the script being used in Typescript.

### `npm run test-usage`

Runs the sample usage.js file which should output a log in your console.

## Learn More

You can learn more about [the developer here](https://www.linkedin.com/in/daniel-moxon/).
