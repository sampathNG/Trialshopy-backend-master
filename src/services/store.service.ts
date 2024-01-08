import Store, { StoreStatus } from "../models/store.model";
import { IOfferCreate, IOfferUpdate, IStoreCreate, IStoreUpdate } from "../interfaces/store.interface";
// import { Point } from "geojson";
import { buildQuery } from "../helpers/queryBuilder";
import Category from "../models/category.model";
import mongoose from "mongoose";
import Product from "../models/product.model";
export class StoreService {
  async createStore(data: IStoreCreate, language?: string) {
    const store = new Store(data);
    // console.info(store);
    return store.save();
  }

  async getAllStore(sellerId: string, limit: number, page: number, language?: string) {
    const stores = await Store.find({ sellerId: sellerId })
      .limit(limit)
      .skip(page * limit)
      .lean()
      .exec();
    return stores;
  }

  async getAllStore2(filters: Record<string, any>, limit: number, page: number, language?: string) {
    const query: any = buildQuery(filters);

    const stores = await Store.find(query)
      .limit(limit)
      .skip(page * limit)
      .lean()
      .exec();
    return stores;
  }

  async getOneStore(sellerId: string, storeId: string, language?: string) {
    const store = await Store.findOne({ sellerId: sellerId, _id: storeId }).exec();
    return store;
  }

  async getOneStore2(storeId: string, language?: string) {
    const store = await Store.findOne({ _id: storeId }).populate('categories').populate('sellerId').exec();
    return store;
  }

  async updateOneStore(sellerId: string, storeId: string, body: IStoreUpdate, language?: string) {
    const store = await Store.findOne({ sellerId: sellerId, _id: storeId }).exec();

    if (body.openingHours) {
      if (body.openingHours.openTime) store.openingHours.openTime = body.openingHours.openTime;
      if (body.openingHours.closeTime) store.openingHours.closeTime = body.openingHours.closeTime;
    }

    return await store.save();
  }

  async deleteStore(sellerId: string, storeId: string, language?: string) {
    const result = await Store.findOneAndUpdate({ sellerId: sellerId, _id: storeId }, { $set: { status: "inactive" } }, { new: true }).exec();
    return result;
  }

  async revokeStore(storeId: string, language?: string) {
    return await Store.findByIdAndRemove({ _id: storeId }).exec();
  }

  async uploadImage(storeId: string, image: any) {
    return await Store.findByIdAndUpdate(storeId, { $push: { images: image } }).exec();
  }

  async createOffer(storeId: string, offerData: IOfferCreate) {
    const store = await Store.findById(storeId);
    store.offers.push(offerData);
    return store.save();
  }

  async updateOffer(storeId: string, offerId: string, offerData: IOfferUpdate) {
    const store = await Store.findById(storeId);
    const offer = store.offers.id(offerId);
    offer.set(offerData);
    return store.save();
  }

  async updateMerchant(merchantId: string, dataToUpdate: any): Promise<any | null> {
    try {
      const updatedMerchant = await Store.findByIdAndUpdate(merchantId, dataToUpdate, { new: true }).exec();
      return updatedMerchant;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getMarkedPopularMerchants(): Promise<any[]> {
    try {
      const markedPopularMerchants = await Store.find({ status: StoreStatus.active, followers: { $exists: true, $not: { $size: 0 } } })
        .populate("sellerId followers.followers")
        .exec();
      return markedPopularMerchants;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getNearbyAllStores(filters: Record<string, any>, limit: number, page: number): Promise<{ [subcategory: string]: any[] }> {
    const result: { [subcategory: string]: any[] } = {};

    // Fetch stores based on filters
    const query: any = buildQuery(filters);
    const nearbyStores = await Store.find(query)
      .skip(page * limit)
      .limit(limit)
      .lean()
      .exec();

    // Fetch subcategories based on the categoryId
    const categoryId = filters.categories[0] && filters.categories.length > 0 && null;
    const subcategories = await Category.find({ parent: categoryId }).exec();

    // Create a map to store stores by subcategory
    const storesBySubcategory = new Map<string, any[]>();

    // Iterate through nearby stores and group them by subcategory
    nearbyStores.forEach((store) => {
      const subcategoryId = store.categories.find((catId: mongoose.Types.ObjectId) => {
        return subcategories.some((subcategory) => subcategory._id.equals(catId));
      });

      if (subcategoryId) {
        const subcategoryName = subcategories.find((subcategory) => subcategory._id.equals(subcategoryId))?.name;

        if (subcategoryName) {
          if (!storesBySubcategory.has(subcategoryName)) {
            storesBySubcategory.set(subcategoryName, []);
          }

          storesBySubcategory.get(subcategoryName)?.push(store);
        }
      }
    });

    // Convert the map to the desired result format
    storesBySubcategory.forEach((stores, subcategoryName) => {
      result[subcategoryName] = stores;
    });

    return result;
  }



}
