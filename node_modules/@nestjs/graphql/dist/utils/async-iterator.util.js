"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const iterall_1 = require("iterall");
exports.createAsyncIterator = (lazyFactory, filterFn) => __awaiter(void 0, void 0, void 0, function* () {
    const asyncIterator = yield lazyFactory;
    const getNextValue = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!asyncIterator || typeof asyncIterator.next !== 'function') {
            return Promise.reject(asyncIterator);
        }
        const payload = yield asyncIterator.next();
        if (payload.done === true) {
            return payload;
        }
        return Promise.resolve(filterFn(payload.value))
            .catch(() => false)
            .then(result => (result ? payload : getNextValue()));
    });
    return {
        next() {
            return getNextValue();
        },
        return() {
            const isAsyncIterator = asyncIterator && typeof asyncIterator.return === 'function';
            return isAsyncIterator
                ? asyncIterator.return()
                : Promise.resolve({
                    done: true,
                    value: asyncIterator,
                });
        },
        throw(error) {
            return asyncIterator.throw(error);
        },
        [iterall_1.$$asyncIterator]() {
            return this;
        },
    };
});
