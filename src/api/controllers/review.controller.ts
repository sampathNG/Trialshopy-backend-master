import { NextFunction, Request, Response } from "express";
import { ReviewService } from "../../services/review.service";
import { loginCheck } from "../../middlewares/logincheck.middleware";

export class ReviewController {
  static async getReview(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = request.params;
      const reviewService = new ReviewService();
      const review = await reviewService.getReview(id);
      response.json(review);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async addReview(request: Request, response: Response, next: NextFunction): Promise<void> {
    // loginCheck(request, response, async () => {
    const reviewData = request.body;
    const reviewService = new ReviewService();
    try {
      const newReview = await reviewService.addReview(reviewData);
      response.json(newReview);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateReview(request: Request, response: Response, next: NextFunction): Promise<void> {
    loginCheck(request, response, async () => {
      const { id } = request.params;
      const reviewData = request.body;
      const reviewService = new ReviewService();
      try {
        const updatedReview = await reviewService.updateReview(id, reviewData);
        response.json(updatedReview);
      } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
      }
    });
  }

  static async deleteReview(request: Request, response: Response, next: NextFunction): Promise<void> {
    loginCheck(request, response, async () => {
      const { id } = request.params;
      const reviewService = new ReviewService();
      try {
        await reviewService.deleteReview(id);
        response.json({ message: "Review deleted successfully" });
      } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
      }
    });
  }
}
