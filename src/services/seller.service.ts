import { ISeller, ISellerUpdate } from "../interfaces/seller.interface";
import Seller, { sellerStatus } from "../models/seller.model";

export class SellerService {
  async createSeller(data: ISeller, language?: string) {
    const seller = new Seller(data);
    return seller.save();
  }

  async getAllSeller(limit: number, page: number, language?: string) {
    const sellers = await Seller.find()
      .limit(limit)
      .skip(page * limit)
      .lean()
      .exec();
    return sellers;
  }

  async getOneSeller(sellerId: string, language?: string) {
    const seller = await Seller.findOne({ _id: sellerId }).exec();
    return seller;
  }

  async updateOneSeller(sellerId: string, body: ISellerUpdate, language?: string) {
    const seller = await Seller.findOne({ _id: sellerId }).exec();
    if (body.profilePic) seller.profilePic = body.profilePic;
    if (body.phoneNumber) seller.phone_number = body.phoneNumber;
    if (body.language) seller.language = body.language;
    return await Seller.updateOne(seller._id, seller);
  }

  async deleteSeller(sellerId: string, language?: string) {
    const result = await Seller.findOneAndUpdate({ _id: sellerId }, { $set: { status: "inactive" } }, { new: true }).exec();

    return result;
  }

  async revokeSeller(sellerId: string, language?: string) {
    return await Seller.findByIdAndRemove({ _id: sellerId }).exec();
  }
  async uploadImage(sellerId: string, image: any) {
    return await Seller.findByIdAndUpdate(sellerId, { profilePic: image }).exec();
  }

  async uploadDocumentVerification(sellerId: string, documents: Array<{ name: string; url: string }>) {
    return await Seller.findByIdAndUpdate(sellerId, {
      documentVerification: {
        status: sellerStatus.pending,
        documents
      }
    }).exec();
  }
}
