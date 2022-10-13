"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jiterWebhookEvent = void 0;
const express_1 = require("express");
const crypto_1 = require("crypto");
exports.jiterWebhookEvent = (0, express_1.Router)();
exports.jiterWebhookEvent.post('/jiter', (req, res) => {
    const parsedPayload = JSON.parse(req.body.payload);
    const jiterSignature = req.header('Jiter-Signature');
    const mySignature = (0, crypto_1.createHmac)('sha256', `${process.env.JITER_SIGNING_SECRET}`)
        .update(req.body.payload)
        .digest('base64');
    if (jiterSignature !== mySignature) {
        res.sendStatus(401);
        return;
    }
    if (parsedPayload.action === 'buyGroceries') {
        console.log('Purchased the following groceries:', parsedPayload.values);
    }
    res.sendStatus(200);
});
//# sourceMappingURL=webhooks.js.map