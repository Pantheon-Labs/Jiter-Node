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
exports.events = void 0;
const express_1 = require("express");
const node_1 = require("@jiter/node");
exports.events = (0, express_1.Router)();
// See https://docs.jiter.dev/docs/rest-api/get-many-events
exports.events.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEvents = yield (0, node_1.getManyEvents)();
        res.send(allEvents);
    }
    catch (error) {
        console.error(error);
        const { message } = error.response.data;
        res.status(error.status).json({ message, error });
    }
}));
// See https://docs.jiter.dev/docs/rest-api/get-event-info
exports.events.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield (0, node_1.getEvent)({
            id: req.params.id,
        });
        res.send(event);
    }
    catch (error) {
        console.error(error);
    }
}));
// See https://docs.jiter.dev/docs/rest-api/create-event
exports.events.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const twentyMinutesFromNow = new Date(Date.now() + 1000 * 60 * 20);
    try {
        const createdEvent = yield (0, node_1.createEvent)({
            destination: `${process.env.BASE_URL}/webhooks/jiter`,
            payload: JSON.stringify({
                action: 'buyGroceries',
                values: ['eggs', 'bacon', 'pasta', 'bread'],
            }),
            scheduledTime: twentyMinutesFromNow.toISOString(),
        });
        res.send(createdEvent);
    }
    catch (error) {
        console.error(error);
    }
}));
// See https://docs.jiter.dev/docs/rest-api/update-event
exports.events.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedEvent = yield (0, node_1.editEvent)({
            id: req.params.id,
            payload: JSON.stringify({
                action: 'returnGroceries',
                values: [{ bacon: 'Too addictive' }, { eggs: 'Break too easily' }],
            }),
            status: node_1.EventStatus.Cancelled,
        });
        res.send(updatedEvent);
    }
    catch (error) {
        console.error(error);
    }
}));
//# sourceMappingURL=events.js.map