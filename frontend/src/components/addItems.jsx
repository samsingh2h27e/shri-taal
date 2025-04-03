import React,{useState} from "react";
import axios from "axios";
import { useLocation,useNavigate } from "react-router";

export const AddItems = () => {
    const nav = useNavigate();
    // console.log(user);
    const [item,setItem] = useState("");
    const [quantity,setQuantity] = useState("");
    const [price,setPrice] = useState("");

    function addItems(p){
        p.preventDefault();
        // console.log(item,quantity,price);
        async function add(){
            let response = await axios.post("http://localhost:3000/addItems",{
                item,
                quantity,
                price
            })
            console.log(response);
            nav("/");
        }
        add();
    }

    return<div className="h-screen w-full flex justify-center">
    <div className="flex flex-col justify-center gap-10">
        <h2 className="text-5xl">Add Items</h2>
        <form onSubmit={addItems} className="flex flex-col gap-5">
            <input onChange={(e)=>{
                setItem(e.target.value);
            }} className="text-4xl rounded-2xl border-2 h-16 p-4 border-slate-600" type="text" placeholder="name of item" />
            <input onChange={(e)=>{
                setQuantity(e.target.value);
            }} className="text-4xl rounded-2xl border-2 h-16 p-4 border-slate-600" type="text" placeholder="quantity" />
            <input onChange={(e)=>{
                setPrice(e.target.value);
            }} className="text-4xl rounded-2xl border-2 h-16 p-4 border-slate-600" type="text" placeholder="price" />
            <button className="text-4xl bg-blue-500 text-white rounded-2xl h-16">Add</button>
        </form>
    </div>
</div>
}