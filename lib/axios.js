"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosInstance = void 0;
const axios_1 = __importDefault(require("axios"));
const consts_1 = require("./consts");
exports.axiosInstance = axios_1.default.create({
    baseURL: consts_1.DEFAULT_URL,
    timeout: consts_1.DEFAULT_TIMEOUT,
});
//# sourceMappingURL=axios.js.map