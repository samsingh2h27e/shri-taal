import express from "express";
import axios from "axios";
import { connectDB } from "./models/connectDB.js";
import { User } from "./models/schema.js";
import cors from "cors";
import MongoStore from "connect-mongo";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import env from 'dotenv';
env.config();

const app = express();

app.use(cors({
    origin: process.env.URL_FRONTEND,
    methods: "GET,POST,PUT,DELETE", 
    credentials: true
  }));

app.use(express.json());
app.use(cookieParser());


async function connect(){
    await connectDB();
    console.log("Connected to database");
}
connect();


app.get("/",(req,res)=>{
    if(!req.cookies.token){
        res.json({message:"No token found"});
    }
    else{
        let token = jwt.verify(req.cookies.token,process.env.SECRET_KEY);
        // console.log(token);
        if(!token){
            res.json({message:"Invalid token"});
        }
        else{
            res.json({message:"Valid token",user:token});
        }
    }
})

app.post("/register",async (req,res)=>{
    try{
        // console.log(req.body);
        let user = new User(req.body);
        await user.save();
        let token = jwt.sign({name:user.name},process.env.SECRET_KEY);
        // console.log(token);
        res.cookie("token",token,{ maxAge: 7 * 24 * 60 * 60 * 1000});
        res.status(201).json({ message: "User registered successfully", user: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.post("/login",async (req, res) => {
    try {
        let user = await User.findOne({name:req.body.name});
        if(!user){
            res.status(501).json({ message: "User not found" });
        }
        else{
            let token = jwt.sign({name:user.name},process.env.SECRET_KEY);
            res.cookie("token",token,{ maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.status(201).json({ message: "Logged in successfully", user: user });
        }
    } catch (error) {
        console.error(error);
    }
    // console.log(req);
});

app.post("/addCustomer",async (req,res)=>{
    try{
        // console.log(req.body);
        let user = jwt.verify(req.cookies.token,process.env.SECRET_KEY);
        // console.log(user);
        let userData = await User.findOne({name:user.name});
        // console.log(userData);
        let customer = userData.customers.forEach(element=>{
            if(element.name==req.body.customer){
                // console.log("entered");
                return element;
            }
        })
        // console.log(customer);
        if(customer){
            res.status(400).json({ message: "Customer already exists" ,customer:customer});
        }
        else{
            // console.log("entered1");
            // console.log(user);
            let balance = req.body.balance;
            console.log(balance);
            if (isNaN(balance)) {
                // console.log("enter 1");
                return res.status(400).json({ error: "Invalid balance: Must be a number." });
            }
            let newCustomer = {
                sellerName: user.name,
                name: req.body.name,
                phone: req.body.phone,
                currentBalance: balance,
                itemsBought : []
            };
            userData.customers.push(newCustomer);
            await User.updateOne(
                { name: user.name },
                { $push: { customers: newCustomer } }
            );
            // console.log("enter 2");
            res.status(201).json({ message: "Customer added successfully", user: userData });
        }
        
    }
    catch(error){
        console.log("enter 3");
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post("/addItems", async (req, res) => {
    // console.log("entered");
    try {
        let { user, item, quantity, price } = req.body;
        // console.log(user, item, quantity, price);

        // Fetch user data
        const userData = await User.findOne({ name: user });
        // console.log(userData.items);
        if (!userData) {
            // console.log("no user");
            return res.status(400).json({ message: "User not found" });
        }

        // Ensure items array exists
        if (!Array.isArray(userData.items)) {
            userData.items = [];
        }

        let newItem = { itemName: item, quantity: Number(quantity), price: Number(price) };
        // console.log(newItem);
        userData.items.push(newItem);

        await User.updateOne({ name: user }, { $set: { items: userData.items } });

        // console.log("After saving:", userData.items);
        return res.status(201).json({ message: "Item added successfully", user: userData });
    } catch (error) {
        // console.log("enter error");
        res.status(500).json({ error: error.message });
    }
});

app.get('/getCustomers', async (req, res) => {
    try {
        let user = jwt.verify(req.cookies.token,process.env.SECRET_KEY);
        let currentUser = await User.findOne({name : user.name});

        if (!currentUser || !Array.isArray(currentUser.customers)) {
            return res.status(400).json({ message: "Invalid user data" });
        }

        let len = currentUser.customers.length;
        // console.log(len);

        if (len == 0) {
            // console.log("entered");
            return res.json({ message: "No customers found" });  // ✅ RETURN here
        }

        return res.status(200).json({ customers: currentUser.customers });  // ✅ RETURN final response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/getItems",async (req,res)=>{
    try{
        let user = jwt.verify(req.cookies.token,process.env.SECRET_KEY);
        let currentUser = await User.findOne({name : user.name});
        res.status(200).json({items:currentUser.items});

    }catch(error){
        res.status(500).json({ error: error.message });
    }
});

app.post("/buyItem",async (req,res)=>{
    try {
        // console.log(req.body);
        let user = jwt.verify(req.cookies.token,process.env.SECRET_KEY);
        let userData = await User.findOne({name : user.name});
        // console.log(userData);
        let index = 0;
        for(let i = 0;i<userData.customers.length;i++){
            if(userData.customers[i].name == req.body.customer){
                index = i;
                break;
            }
        }
        // console.log(index);
        // console.log(Number(req.body.quantity),Number(req.body.price),Number(req.body.money));
        const amount = Number(req.body.quantity) * Number(req.body.price) - Number(req.body.money);
        // console.log(amount);
        if (isNaN(amount)) {
            return res.status(400).json({ error: "Invalid input: Ensure quantity, price, and money are numbers." });
        }
        userData.customers[index].currentBalance += amount;
        let newItem = {itemName : req.body.item, quantity : req.body.quantity, price : req.body.price,date : Date.now()};
        userData.customers[index].itemsBought.push(newItem);

        await User.updateOne(
            { name: user.name, "customers.name": req.body.customer },
            { 
                $inc: { "customers.$.currentBalance": amount },
                $push: { "customers.$.itemsBought": newItem }
            }
        );

        return res.status(200).json({ 
            message: "Customer data updated successfully", 
            customer: userData.customers[index] 
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/logout",(req,res)=>{
    console.log("entered");
    res.clearCookie("token",{path:"/"});
    res.status(200).json({ message: "Logged out successfully" });
});

app.post("/updatePassword",async (req,res)=>{
    try {
        console.log("entered");
        let user = jwt.verify(req.cookies.token,process.env.SECRET_KEY);
        await User.updateOne({name : user.name},{password : req.body.password});
        console.log("updated");
        res.status(200).json({ message: "Password updated successfully" });
    }catch(error){
        console.log(error);
    }
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});