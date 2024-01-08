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
exports.ReviewService = void 0;
const review_model_1 = __importDefault(require("../models/review.model"));
class ReviewService {
    getReview(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield review_model_1.default.find({ productId }).exec();
                return reviews;
            }
            catch (error) {
                throw new Error("Error fetching reviews");
            }
        });
    }
    addReview(reviewData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newReview = yield review_model_1.default.create(reviewData);
                return newReview;
            }
            catch (error) {
                throw new Error("Error adding review");
            }
        });
    }
    updateReview(reviewId, reviewData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedReview = yield review_model_1.default.findByIdAndUpdate(reviewId, reviewData, {
                    new: true
                }).exec();
                return updatedReview;
            }
            catch (error) {
                throw new Error("Error updating review");
            }
        });
    }
    deleteReview(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield review_model_1.default.findByIdAndDelete(reviewId).exec();
            }
            catch (error) {
                throw new Error("Error deleting review");
            }
        });
    }
    reactToReview(reviewId, like) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield review_model_1.default.findById(reviewId).exec();
                if (!review) {
                    throw new Error("Review not found");
                }
                review.likes = like;
                review.dislikes = !like;
                yield review.save();
                return review;
            }
            catch (error) {
                throw new Error("Error reacting to review");
            }
        });
    }
    dislikeReview(reviewId, dislike) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield review_model_1.default.findById(reviewId).exec();
                if (!review) {
                    throw new Error("Review not found");
                }
                review.dislikes = dislike;
                review.likes = !dislike;
                yield review.save();
                return review;
            }
            catch (error) {
                throw new Error("Error disliking review");
            }
        });
    }
    rateReview(reviewId, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield review_model_1.default.findById(reviewId).exec();
                if (!review) {
                    throw new Error("Review not found");
                }
                review.rating = rating;
                yield review.save();
                return review;
            }
            catch (error) {
                throw new Error("Error rating review");
            }
        });
    }
}
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map