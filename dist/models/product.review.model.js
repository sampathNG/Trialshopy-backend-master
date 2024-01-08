"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productReviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.productReviewSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    timeStamp: {
        type: Date,
        required: true
    }
});
const ProductReview = (0, mongoose_1.model)("product", exports.productReviewSchema);
exports.default = ProductReview;
//# sourceMappingURL=product.review.model.js.map