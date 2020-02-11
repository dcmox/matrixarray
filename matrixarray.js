"use strict";
exports.__esModule = true;
exports.BYTES_PER_FLOAT = 4;
var MatrixArray = /** @class */ (function () {
    function MatrixArray(o) {
        this._rows = 0;
        this._columns = 0;
        this._constructor = null;
        if ((!Array.isArray(o) && !this._isSupportedType(o)) || // Basic check
            (!Array.isArray(o[0]) && !this._isSupportedType(o[0]))) {
            throw new Error('MatrixArray only accepts two dimensional arrays');
        }
        this._rows = o.length;
        this._columns = o[0].length;
        this.buffer = new ArrayBuffer(this._rows *
            this._columns *
            (o.BYTES_PER_ELEMENT || exports.BYTES_PER_FLOAT));
        if (!this._isSupportedType(o)) {
            this._array = new Float32Array(this.buffer);
            this._array.set([].concat.apply([], o));
        }
        else {
            this._array = new o.constructor(this.buffer);
            this._array.set(o);
        }
        this._constructor = this._array.constructor;
    }
    MatrixArray.prototype.compact = function () {
        var res = [];
        for (var i = 0; i < this._rows; i++) {
            res.push(Array.from(this.row(i)));
        }
        return res;
    };
    MatrixArray.prototype.value = function (row, column) {
        return this._array[row * this._columns + column];
    };
    MatrixArray.prototype.clone = function () {
        return new this._constructor(this.buffer.slice(0));
    };
    MatrixArray.prototype.row = function (index) {
        return this._array.subarray(index * this._columns, index * this._columns + this._columns);
    };
    MatrixArray.prototype.get = function () {
        return this._array;
    };
    MatrixArray.prototype.size = function () {
        return this.buffer.byteLength;
    };
    MatrixArray.prototype.rows = function () {
        return this._rows;
    };
    MatrixArray.prototype.columns = function () {
        return this._columns;
    };
    MatrixArray.prototype.set = function (value, row, column) {
        if (Array.isArray(value) || this._isSupportedType(value)) {
            this._array.set(value, (row || 0) * this._columns + (column || 0));
        }
        else {
            this._array.set([value], (row || 0) * this._columns + (column || 0));
        }
    };
    MatrixArray.prototype._isSupportedType = function (o) {
        return (Object.prototype.toString.call(o) in
            [
                '[object Float32Array]',
                '[object Float64Array]',
                '[object Int8Array]',
                '[object Int16Array]',
                '[object Int32Array]',
            ]);
    };
    return MatrixArray;
}());
module.exports = MatrixArray;
