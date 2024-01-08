"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDiscount = void 0;
// discount.utils.ts
const calculateDiscount = (purchaseAmount, discountPercentage) => {
    const discount = (purchaseAmount * discountPercentage) / 100;
    return discount;
};
exports.calculateDiscount = calculateDiscount;
//# sourceMappingURL=discount.utils.js.map