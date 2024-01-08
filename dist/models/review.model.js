"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_model_1 = __importDefault(require("./user.model"));
const product_model_1 = __importDefault(require("./product.model"));
const reviewSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: user_model_1.default, required: true },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: product_model_1.default, required: true },
    reviewText: { type: String, required: true },
    pictures: [
        {
            filename: { type: String, required: false },
            url: { type: String, required: false },
        },
    ],
    likes: { type: Boolean, default: false },
    dislikes: { type: Boolean, default: false },
    rating: { type: Number, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});
const Review = (0, mongoose_1.model)('Review', reviewSchema);
exports.default = Review;
const data = [{
        "Key": "General",
        "In The Box": "Handset, Sim Ejection Pin, USB Cable, Manual, Pen",
        "Model Number": "SM-S918BZGCINS",
        "Model Name": "Galaxy S23 Ultra 5G",
        "Color": "Green",
        "Browse Type": "Smartphones",
        "SIM Type": "Dual Sim",
        "Hybrid Sim Slot": "Yes",
        "Touchscreen": "Yes",
        "OTG Compatible": "Yes",
        "Quick Charging": "Yes"
    },
    {
        "Key": "Display Features",
        "Display Size": "17.27 cm (6.8 inch)",
        "Resolution Type": "Quad HD+",
        "GPU": "Qualcomm Adreno 740",
        "Display Type": "Full HD+ Dynamic AMOLED 2X",
        "HD Game Support": "Yes",
        "Other Display Features": "Adaptive Refresh Rate: 1 Hz - 120 Hz"
    },
    {
        "Key": "Os & Processor Features",
        "Operating System": "Android 13",
        "Processor Brand": "Snapdragon",
        "Processor Type": "Qualcomm Snapdragon 8 Gen 2",
        "Processor Core": "Octa Core",
        "Primary Clock Speed": "3.36 GHz",
        "Secondary Clock Speed": "3.36 GHz",
        "Operating Frequency": "2G GSM: 850/900/1800/1900 MHz"
    },
    {
        "Key": "Memory & Storage Features",
        "Internal Storage": "256 GB",
        "RAM": "12 GB",
        "Total Memory": "256 GB"
    }
];
//# sourceMappingURL=review.model.js.map