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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentGetwayController = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: ".env" });
const crypto_1 = __importDefault(require("crypto"));
const razorpay_1 = __importDefault(require("razorpay"));
const instance = new razorpay_1.default({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET_ID,
});
class paymentGetwayController {
}
exports.paymentGetwayController = paymentGetwayController;
_a = paymentGetwayController;
paymentGetwayController.newPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { razorpay_order_id, razorpay_payment_id, razor_pay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto_1.default.createHmac('sha256', process.env.secret).update(body.toString()).digest('hex');
    const isAuth = expectedSignature === razor_pay_signature;
    if (isAuth) {
        res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`);
    }
    else {
        res.status(400).json({ success: false });
    }
});
paymentGetwayController.getKey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const razorpayKeyId = process.env.RAZOR_KEY_ID;
        if (!razorpayKeyId) {
            return res.status(500).json({ error: 'Razorpay key ID not found in environment variables' });
        }
        return res.status(200).json({ key: razorpayKeyId });
    }
    catch (error) {
        console.error('Error in getKey:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
/*import crypto from "crypto";
import axios from 'axios';

import { NextFunction, Request, Response } from "express";

const salt_key="099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
const merchant_id="PGTESTPAYUAT"

export class paymentGetwayController{
   
static newPayment = async (req: Request, res: Response): Promise<void> => {
   try {
        const merchantTransactionId = req.body.transactionId;
        const data = {
            merchantId: merchant_id,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.MUID,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `http://localhost:7000/api/v1/payment/paymentStatus/${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data)
            return res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
        })
        .catch(function (error) {
            console.error(error);
        });

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}

static checkStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const merchantTransactionId = res.req.body.transactionId
    const merchantId = res.req.body.merchantId

    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
    const sha256 =  crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
    method: 'GET',
    url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': `${merchantId}`
    }
    };

    // CHECK PAYMENT TATUS
    /*axios.request(options).then(async(response) => {
        if (response.data.success === true) {
            const url = `http://localhost:7000/success`
            return res.redirect(url)
        } else {
            const url = `http://localhost:7000/failure`
            return res.redirect(url)
        }
    })
    .catch((error) => {
        console.error(error);
    });
};
*/
/*
}
}
*/ 
//# sourceMappingURL=paymentGetway.controller.js.map