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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
class AttendanceService {
    create(data, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendance = new product_model_1.default(data);
            return attendance.save();
        });
    }
    getAll(clientId, limit, page, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendances = yield product_model_1.default.find({ clientId }).limit(limit)
                .skip(page * limit)
                .lean()
                .exec();
            return attendances;
        });
    }
    getOne(clientId, userId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendance = yield product_model_1.default.findOne({ clientId, userId }).exec();
            return attendance;
        });
    }
    updateOne(clientId, userId, body, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const attendance = yield product_model_1.default.findOne({ clientId, userId: userId }).exec();
            if (body.attendance.timeCollection)
                attendance.timeCollection.push(body.attendance.timeCollection);
            if (body.attendance.request)
                attendance.request.push(body.attendance.request);
            if (body.status)
                attendance.status;
            return yield product_model_1.default.updateOne(attendance._id, attendance);
        });
    }
    delete(clientId, userId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.default.findByIdAndRemove({ clientId, userId: userId }).exec();
        });
    }
}
exports.AttendanceService = AttendanceService;
//# sourceMappingURL=attendance.service.js.map