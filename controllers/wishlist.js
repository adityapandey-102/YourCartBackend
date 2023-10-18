const express =require('express');
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');

const getWishlistItems=async(req,res)=>{
    try {
        const user = await User.findById(req.user.id);
    
        if (!user) {
          return res.status(401).send({ success:false,error :"User Not found"})
        }

    
        res.json(user.wishlist)
      } catch (error) {
        return res.status(401).send({ success:false,error :"Server error"})
      }

}
const addWishListItem=async(req,res)=>{
    try {
        const {productId}=req.body;
        const user = await User.findById(req.user.id);
    
        if (!user) {
          return res.status(401).send({ success:false,error :"Please authenticate using valid token"})
        }
        // Add or update the product in the cart
        user.wishlist.wishlistItem.push(req.body.item)
        user.wishlist.wishlistId[productId] = productId;
        const updatedWishlist = await User.findByIdAndUpdate(req.user.id,{$set:user},{new:true})
        res.json(updatedWishlist.wishlist)
      } catch (error) {
        return res.status(401).send({ success:false,error :"Server error"})
      }

}

const removeWishlistItem = async (req,res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(401).send({ success:false,error :"User not found"})
      }
  
      // Remove the product from the cart
      user.wishlist.wishlistItem=user.wishlist.wishlistItem.filter((item)=>item._id !== req.body.productId)
      delete user.wishlist.wishlistId[req.body.productId];
  
      const updatedWishlist = await User.findByIdAndUpdate(req.user.id,{$set:user},{new:true})
        res.json(updatedWishlist.wishlist)
    } catch (error) {
      return res.status(401).send({ success:false,error :"Server error"})
    }
  };



module.exports={getWishlistItems,addWishListItem,removeWishlistItem};