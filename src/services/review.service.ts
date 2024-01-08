import { Model } from "mongoose";
import Review, { IReview } from "../models/review.model";

export class ReviewService {
  async getReview(productId: string) {
    try {
      const reviews = await Review.find({ productId }).exec();
      return reviews;
    } catch (error) {
      throw new Error("Error fetching reviews");
    }
  }

  async addReview(reviewData: any) {
    try {
      const newReview = await Review.create(reviewData);
      return newReview;
    } catch (error) {
      throw new Error("Error adding review");
    }
  }

  async updateReview(reviewId: string, reviewData: any) {
    try {
      const updatedReview = await Review.findByIdAndUpdate(reviewId, reviewData, {
        new: true
      }).exec();
      return updatedReview;
    } catch (error) {
      throw new Error("Error updating review");
    }
  }

  async deleteReview(reviewId: string) {
    try {
      await Review.findByIdAndDelete(reviewId).exec();
    } catch (error) {
      throw new Error("Error deleting review");
    }
  }

  async reactToReview(reviewId: string, like: boolean) {
    try {
      const review = await Review.findById(reviewId).exec();
      if (!review) {
        throw new Error("Review not found");
      }

      review.likes = like;
      review.dislikes = !like;

      await review.save();
      return review;
    } catch (error) {
      throw new Error("Error reacting to review");
    }
  }

  async dislikeReview(reviewId: string, dislike: boolean) {
    try {
      const review = await Review.findById(reviewId).exec();
      if (!review) {
        throw new Error("Review not found");
      }

      review.dislikes = dislike;
      review.likes = !dislike;

      await review.save();
      return review;
    } catch (error) {
      throw new Error("Error disliking review");
    }
  }

  async rateReview(reviewId: string, rating: number) {
    try {
      const review = await Review.findById(reviewId).exec();
      if (!review) {
        throw new Error("Review not found");
      }

      review.rating = rating;

      await review.save();
      return review;
    } catch (error) {
      throw new Error("Error rating review");
    }
  }
}
