"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommissionController = void 0;
const commission_model_1 = __importStar(require("../../models/commission.model"));
class CommissionController {
}
exports.CommissionController = CommissionController;
_a = CommissionController;
CommissionController.createCommission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sellerId = req.params.sellerId;
        const storeId = req.params.storeId;
        const productId = req.params.productId;
        const commissionData = {
            productId: productId,
            commission: req.body.commission,
            datedFrom: req.body.datedFrom,
            datedTo: req.body.datedTo,
            status: commission_model_1.CommissionStatus.ACTIVE // Set the default status here or extract from req.body
        };
        const commission = yield commission_model_1.default.create(commissionData);
        res.status(201).json(commission);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create commission' });
    }
});
CommissionController.getCommissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sellerId = req.params.sellerId;
        const storeId = req.params.storeId;
        const productId = req.params.productId;
        // Filter commissions based on sellerId, storeId, and productId (if available)
        const query = { sellerId, storeId };
        if (productId) {
            query.productId = productId ? productId : undefined;
        }
        const commissions = yield commission_model_1.default.find(query);
        res.status(200).json(commissions);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch commissions' });
    }
});
CommissionController.updateCommission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sellerId = req.params.sellerId;
        const storeId = req.params.storeId;
        const productId = req.params.productId;
        const commissionId = req.params.id;
        const commissionData = req.body;
        // Update the commission based on sellerId, storeId, productId, and commissionId
        const updatedCommission = yield commission_model_1.default.findByIdAndUpdate(commissionId, commissionData, { new: true });
        res.status(200).json(updatedCommission);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update commission' });
    }
});
CommissionController.deleteCommission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commissionId = req.params.id;
        // Delete the commission based on the commissionId
        const deletedCommission = yield commission_model_1.default.findByIdAndDelete(commissionId);
        if (!deletedCommission) {
            res.status(404).json({ message: 'Commission not found' });
            return;
        }
        res.status(200).json({ message: 'Commission deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete commission' });
    }
});
//# sourceMappingURL=commission.controller.js.map