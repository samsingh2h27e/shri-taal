import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemName: {type : String, required: true}, 
    quantity: {type:Number,default: 0}, 
    price: {type:Number},
    date: {type : Date}
});

const customerSchema = new mongoose.Schema({
    sellerName: {type : String, required: true},
    name: {type : String, required: true},
    phone: {type : String, required: true},
    itemsBought: [itemSchema],
    currentBalance: Number
});


const userSchema = new mongoose.Schema({
    name: {type : String, required: true},
    email: {type : String, required: true},
    password: {type : String, required: true},
    phone: {type : String, required: true},
    customers: [customerSchema],
    items: [itemSchema]
});


export const User = new mongoose.model("User",userSchema);