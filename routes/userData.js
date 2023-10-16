const express =require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const {addcartItem,getUserCart,removeFromCart,increaseItemCount,decreaseItemCount,removeAllFromCart}= require("../controllers/cart")
const {getWishlistItems,addWishListItem,removeWishlistItem}=require("../controllers/wishlist")
//It will perform operation on on cart items for an specific user account
router.post("/addCartItem",fetchuser ,addcartItem)
router.post("/removeCartItem",fetchuser ,removeFromCart )
router.post("/removeAllFromCart",fetchuser ,removeAllFromCart )
router.get("/getCartItems",fetchuser , getUserCart)
router.post("/increaseItemCount",fetchuser, increaseItemCount)
router.post("/decreaseItemCount",fetchuser,decreaseItemCount )
 

//It will perform operation on wishlist Items for speciic user account
router.get("/getWishlistItems",fetchuser,getWishlistItems )
router.post("/addWishListItem",fetchuser, addWishListItem)
router.post("/removeWishlistItem",fetchuser,removeWishlistItem )

module.exports = router