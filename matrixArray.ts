export type TMatrixArray = Float32Array | Float64Array | Int8Array | Int16Array | Int32Array
export const BYTES_PER_FLOAT = 4
export class MatrixArray {
    public buffer: ArrayBuffer = new ArrayBuffer(0)
    private _array: TMatrixArray = new Float32Array()
    private _rows: number = 0
    private _columns: number = 0
    private _constructor: any = null

    public constructor(o: any) {
        if ((!Array.isArray(o) && !this._isSupportedType(o)) // Basic check
            || (!Array.isArray(o[0]) && !this._isSupportedType(o[0]))) {
            throw new Error('MatrixArray only accepts two dimensional arrays')
        }

        this._rows = o.length
        this._columns = o[0].length
        this.buffer = new ArrayBuffer(this._rows * this._columns * (o.BYTES_PER_ELEMENT || BYTES_PER_FLOAT))

        if (!this._isSupportedType(o)) {
            this._array = new Float32Array(this.buffer)
            this._array.set([].concat.apply([], o))
        } else {
            this._array = new o.constructor(this.buffer)
            this._array.set(o)
        }
        this._constructor = this._array.constructor
    }

    public compact(): any[] {
        const res: any = []
        for (let i = 0; i < this._rows; i++) {
            res.push(Array.from(this.row(i)))
        }
        return res
    }

    public value(row: number, column: number): bigint | number {
        return this._array[row * this._columns + column]
    }

    public clone(): TMatrixArray {
        return new this._constructor(this.buffer.slice(0))
    }

    public row(index: number): TMatrixArray {
        return this._array.subarray(index * this._columns, index * this._columns + this._columns)
    }

    public get(): TMatrixArray {
        return this._array
    }

    public size(): number {
        return this.buffer.byteLength
    }

    public rows(): number {
        return this._rows
    }

    public columns(): number {
        return this._columns
    }

    public set(value: any, row?: number, column?: number): void {
        if (Array.isArray(value) || this._isSupportedType(value)) {
            this._array.set(value, ((row || 0) * this._columns) + (column || 0))
        } else {
            this._array.set([value], ((row || 0) * this._columns) + (column || 0))
        }
    }

    private _isSupportedType(o: any): boolean {
        return Object.prototype.toString.call(o) in [
            '[object Float32Array]',
            '[object Float64Array]',
            '[object Int8Array]',
            '[object Int16Array]',
            '[object Int32Array]',
        ]
    }
}
