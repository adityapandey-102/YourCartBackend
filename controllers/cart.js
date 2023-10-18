const express =require('express');
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');

const getUserCart=async(req,res)=>{
    try {
        const user = await User.findById(req.user.id);
    
        if (!user) {
          return res.status(401).send({ success:false,error :"Please authenticate using valid token"})

        }
    
        res.json(user.cart)
      } catch (error) {
        return res.status(401).send({ success:false,error :"Server error"})
      }

}
const addcartItem=async(req,res)=>{
    try {
        const {productId}=req.body;
        const user = await User.findById(req.user.id);
        
        if (!user) {
          return res.status(401).send({ success:false,error :"Please authenticate using valid user"})
        }
        // Add or update the product in the cart
        user.cart.cartItemCount[productId] = 1;
        user.cart.cartItem.push(req.body.item)
        const updatedCart = await User.findByIdAndUpdate(req.user.id,{$set:user},{new:true})
        res.json(updatedCart.cart)
      } catch (error) {
        return res.status(401).send({ success:false,error :"Server error"})
      }

}

const removeFromCart = async (req,res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(401).send({ success:false,error :"User not found"})
      }
  
      // Remove the product from the cart
      delete user.cart.cartItemCount[req.body.productId];
      user.cart.cartItem=user.cart.cartItem.filter((item)=>item._id !== req.body.productId)

      const updatedCart = await User.findByIdAndUpdate(req.user.id,{$set:user},{new:true})
      res.json(updatedCart.cart);
    } catch (error) {
      return res.status(401).send({ success:false,error :"Server error"})
    }
  };
const removeAllFromCart = async (req,res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(401).send({ success:false,error :"User not found"})
      }
  
      // Remove the product from the cart
      user.cart.cartItemCount={};
      user.cart.cartItem=[]

      const updatedCart = await User.findByIdAndUpdate(req.user.id,{$set:user},{new:true})
      res.json(updatedCart.cart);
    } catch (error) {
      return res.status(401).send({ success:false,error :"Server error"})
    }
  };

  const increaseItemCount=async(req,res)=>{
    try {
        const {productId}=req.body;
        const user = await User.findById(req.user.id);
    
        if (!user) {
          return res.status(401).send({ success:false,error :"Please authenticate using valid token"})
        }
        // Add or update the product in the cart
        user.cart.cartItemCount[productId] += 1;
        const updatedCart = await User.findByIdAndUpdate(req.user.id,{$set:user},{new:true})
        res.json(updatedCart. cart)
      } catch (error) {
        return res.status(401).send({ success:false,error :"Server error"})
      }

}
const decreaseItemCount=async(req,res)=>{
    try {
        const {productId}=req.body;
        const user = await User.findById(req.user.id);
    
        if (!user) {
          return res.status(401).send({ success:false,error :"Please authenticate using valid token"})
        }
        // Add or update the product in the cart
        user.cart.cartItemCount[productId] -= 1;
        const updatedCart = await User.findByIdAndUpdate(req.user.id,{$set:user},{new:true})
        res.json(updatedCart. cart)
      } catch (error) {
        return res.status(401).send({ success:false,error :"Server error"})
      }

}

module.exports={getUserCart,addcartItem,removeFromCart,increaseItemCount,decreaseItemCount,removeAllFromCart};