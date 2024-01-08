"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoURI = (_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : "mongodb+srv://nikhilfirst:nikhil123@cluster0.xbhppiu.mongodb.net/Trialshopy";
const bucket = new mongodb_1.GridFSBucket(mongoURI, {
    bucketName: "uploads"
});
//# sourceMappingURL=download.middleware.js.map