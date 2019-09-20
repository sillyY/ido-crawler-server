"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// 传参空值过滤
function optionSort(opt) {
    let obj = {};
    if (typeof opt === 'object') {
        for (let k in opt) {
            if (opt[k] !== null && opt[k] !== '') {
                obj[k] = opt[k];
            }
        }
    }
    else {
        obj = opt;
    }
    return obj;
}
exports.optionSort = optionSort;
function errorCapture(asyncFunc, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield asyncFunc(...args);
            return [res, null];
        }
        catch (e) {
            return [null, e];
        }
    });
}
exports.errorCapture = errorCapture;
function sliceArray(array, size) {
    var result = [];
    for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
    }
    return result;
}
exports.sliceArray = sliceArray;
//# sourceMappingURL=index.js.map