"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetails = exports.gender = exports.userStatus = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./../interfaces/user.interface");
var userStatus;
(function (userStatus) {
    userStatus["active"] = "active";
    userStatus["inactive"] = "inactive";
})(userStatus || (exports.userStatus = userStatus = {}));
var gender;
(function (gender) {
    gender["male"] = "male";
    gender["female"] = "female";
    gender["other"] = "other";
})(gender || (exports.gender = gender = {}));
exports.userDetails = new mongoose_1.Schema({
    phone_number: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    gender: { type: String, required: false, enum: Object.values(gender) },
    profilePic: {
        filename: { type: String, required: false },
        url: { type: String, required: false }
    },
    dateOfBirth: { type: String, required: false },
    role: { type: String, default: "customer" },
    access_level: { type: Number, default: 1 },
    password: { type: String, default: "00000000", required: true },
    status: { type: String, enum: Object.values(userStatus), default: userStatus.active },
    language: [{ type: String, required: false }],
    paymentDetails: {
        bankName: { type: String, required: false },
        bankAddress: { type: String, required: false },
        accountNumber: { type: String, required: false },
        ifscCode: { type: String, required: false },
        custId: { type: String, required: false },
        paymentMethod: { type: String, enum: Object.values(user_interface_1.PaymentMethod) }
    },
    thirdParty: { type: Boolean, default: false },
});
const User = (0, mongoose_1.model)("user", exports.userDetails);
exports.default = User;
//# sourceMappingURL=user.model.js.map