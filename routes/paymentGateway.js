const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const fetchuser = require('../middleware/fetchuser');

const key_id='rzp_test_TkOAYFx44lzY3j';
const key_secret='pWmdLuuOyz91Pa1scb4hyk4H';


router.post('/orders',fetchuser, (req, res) => {
    var instance = new Razorpay({ key_id:key_id , key_secret: key_secret })
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
})
router.post('/verify', (req, res) => {
    const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    const expected_signature = crypto.createHmac('sha256', key_secret)
    .update(body.toString())
    .digest('hex');
    var response={"signatureIsValid":"false"}
    if (expected_signature == req.body.razorpay_signature) {
        response={"signatureIsValid":"true"}
    }
    res.send(response)

    // var instance = new Razorpay({ key_id:key_id , key_secret: key_secret })
    // validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
})

module.exports = router