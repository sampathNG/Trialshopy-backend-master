import { Model, model, Schema } from "mongoose";

export const productReviewSchema = new Schema({
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



const ProductReview: Model<any> = model<any>("product", productReviewSchema);
export default ProductReview;