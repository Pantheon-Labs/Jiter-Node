"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJiterConfig = exports.Init = void 0;
const consts_1 = require("./consts");
const defaultConfig = {
    defaultUrl: consts_1.DEFAULT_URL,
    defaultTimeout: consts_1.DEFAULT_TIMEOUT,
};
let JiterConfig = {
    defaultUrl: consts_1.DEFAULT_URL,
    defaultTimeout: consts_1.DEFAULT_TIMEOUT,
};
const Init = (jiterInitProps) => {
    JiterConfig = Object.assign(Object.assign({}, defaultConfig), jiterInitProps);
};
exports.Init = Init;
const getJiterConfig = () => JiterConfig;
exports.getJiterConfig = getJiterConfig;
//# sourceMappingURL=init.js.map