"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosInstance = void 0;
const axios_1 = __importDefault(require("axios"));
const init_1 = require("./init");
const config = (0, init_1.getJiterConfig)();
exports.axiosInstance = axios_1.default.create({
    baseURL: config.defaultUrl,
    timeout: config.defaultTimeout,
});
//# sourceMappingURL=axios.js.map