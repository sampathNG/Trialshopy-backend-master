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
exports.FileService = void 0;
const mongodb_1 = require("mongodb");
class FileService {
    static uploadFile(req, fileType, additionalInfo) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mongoURI = (_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : "mongodb+srv://nikhilfirst:nikhil123@cluster0.xbhppiu.mongodb.net/Trialshopy";
                const client = yield mongodb_1.MongoClient.connect(mongoURI);
                const db = client.db();
                const bucket = new mongodb_1.GridFSBucket(db, {
                    bucketName: "uploads"
                });
                const file = req.file;
                const uploadStream = bucket.openUploadStream(file.originalname, {
                    metadata: Object.assign({ fileType }, additionalInfo)
                });
                file.stream.pipe(uploadStream);
                return new Promise((resolve, reject) => {
                    uploadStream.on("error", (error) => {
                        client.close();
                        reject(error);
                    });
                    uploadStream.on("finish", () => {
                        client.close();
                        const fileMetadata = {
                            filename: uploadStream.id.toString(),
                            url: `/uploads/${uploadStream.id}`,
                            contentType: file.mimetype,
                            size: file.size
                        };
                        resolve(fileMetadata);
                    });
                });
            }
            catch (error) {
                throw new Error("Failed to upload the file.");
            }
        });
    }
    static downloadFile(filename, fileType) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mongoURI = (_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : "mongodb+srv://nikhilfirst:nikhil123@cluster0.xbhppiu.mongodb.net/Trialshopy";
                const client = yield mongodb_1.MongoClient.connect(mongoURI);
                const db = client.db();
                const bucket = new mongodb_1.GridFSBucket(db, {
                    bucketName: "uploads"
                });
                const fileId = new mongodb_1.ObjectId(filename);
                const downloadStream = bucket.openDownloadStream(fileId);
                return new Promise((resolve, reject) => {
                    let buffer = Buffer.alloc(0);
                    downloadStream.on("data", (chunk) => {
                        buffer = Buffer.concat([buffer, chunk]);
                    });
                    downloadStream.on("error", (error) => {
                        client.close();
                        reject(error);
                    });
                    downloadStream.on("end", () => {
                        client.close();
                        resolve(buffer);
                    });
                });
            }
            catch (error) {
                throw new Error("Failed to download the file.");
            }
        });
    }
    static downloadFile2(filename, fileType) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mongoURI = (_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : "mongodb+srv://nikhilfirst:nikhil123@cluster0.xbhppiu.mongodb.net/Trialshopy";
                const client = yield mongodb_1.MongoClient.connect(mongoURI);
                const db = client.db();
                const bucket = new mongodb_1.GridFSBucket(db, {
                    bucketName: "uploads"
                });
                const downloadStream = bucket.openDownloadStreamByName(filename);
                return new Promise((resolve, reject) => {
                    let buffer = Buffer.alloc(0);
                    downloadStream.on("data", (chunk) => {
                        buffer = Buffer.concat([buffer, chunk]);
                    });
                    downloadStream.on("error", (error) => {
                        client.close();
                        reject(error);
                    });
                    downloadStream.on("end", () => {
                        client.close();
                        resolve(buffer);
                    });
                });
            }
            catch (error) {
                throw new Error("Failed to download the file.");
            }
        });
    }
}
exports.FileService = FileService;
//# sourceMappingURL=fileUtils.service.js.map