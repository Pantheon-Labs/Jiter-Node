"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = require("express");
const events_1 = require("./events");
const webhooks_1 = require("./webhooks");
exports.api = (0, express_1.Router)();
exports.api.use('/events', events_1.events);
exports.api.use('/webhooks', webhooks_1.jiterWebhookEvent);
//# sourceMappingURL=index.js.map