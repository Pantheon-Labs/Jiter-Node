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
exports.createEvent = void 0;
const axios_1 = require("../axios");
const baseRoute = '/events';
// TODO: Example
const createEvent = ({ payload }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.axiosInstance.post(baseRoute, { payload });
        return response;
    }
    catch (err) {
        const error = err;
        return error;
    }
});
exports.createEvent = createEvent;
//# sourceMappingURL=createEvent.js.map