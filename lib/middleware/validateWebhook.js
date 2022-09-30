"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhook = void 0;
const consts_1 = require("../consts");
function isParsed(callback, options) {
    return (options === null || options === void 0 ? void 0 : options.parse) === true;
}
const handleWebhook = (...args) => (req, res) => {
    const [callback, options] = args;
    const signature = req.header(consts_1.SIGNATURE_HEADER);
    const { payload: rawPayload, scheduledTime: rawScheduledTime } = req.body;
    // TODO: Validate signature
    const signatureIsValid = true;
    if (!signature || !signatureIsValid) {
        res.sendStatus(401);
        return;
    }
    res.sendStatus(200);
    const scheduledTime = new Date(rawScheduledTime);
    if (isParsed(callback, options)) {
        try {
            const payload = JSON.parse(rawPayload);
            callback({ payload, scheduledTime, req });
        }
        catch (error) {
            console.error('Failed to parse Jiter event payload: ', error);
        }
        console.log(options, callback);
        return;
    }
    console.log(options, callback);
    callback({ payload: rawPayload, scheduledTime, req });
};
exports.handleWebhook = handleWebhook;
// type SomeEvent = {
//   thing: boolean;
//   otherThing: string;
// };
// type MyEvent = {
//   wat: boolean;
//   thing: 'yes';
// };
// const handler1 = handleWebhook<MyEvent>(
//   (event) => {
//     event.payload;
//   },
//   { parse: true },
// );
// const handler4 = handleWebhook<MyEvent>(
//   (event) => {
//     event.payload.thing;
//   },
//   { parse: true },
// );
// const handler2 = handleWebhook((event) => {
//   event.payload;
// });
// const handler3 = handleWebhook(
//   (event) => {
//     event.payload;
//   },
//   { parse: false },
// );
//# sourceMappingURL=validateWebhook.js.map