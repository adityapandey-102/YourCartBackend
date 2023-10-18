const express = require('express');
require('dotenv').config();
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const fetchuser = require('../middleware/fetchuser');

const key_id = process.env.KEY_ID;
const key_secret = process.env.KEY_SECRET;


router.post('/orders', (req, res) => {

    try {
        var instance = new Razorpay({ key_id: key_id, key_secret: key_secret })
        const price = req.body.amountTotal
        var options = {
            amount: price * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        instance.orders.create(options, function (err, order) {
            if (err) {
                return res.send({ code: 500, message: "Server error" })
            }
            return res.send({ code: 200, message: "order created", data: order })
        });
    }
    catch (error) {
        return res.status(401).send({ success: false, error: "Server error" })
    }

})
router.post('/verify', (req, res) => {
    try {
        const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
        const expected_signature = crypto.createHmac('sha256', key_secret)
            .update(body.toString())
            .digest('hex');
        var response = { "signatureIsValid": "false" }
        if (expected_signature == req.body.razorpay_signature) {
            response = { "signatureIsValid": "true" }
        }
        res.send(response)
    } catch (error) {
        return res.status(401).send({ success: false, error: "Server error" })
    }

    // var instance = new Razorpay({ key_id:key_id , key_secret: key_secret })
    // validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
})

module.exports = router