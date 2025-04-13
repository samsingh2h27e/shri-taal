import axios from "axios";
import React,{useState} from "react";
import { useLocation,useNavigate } from "react-router";

export const UpdateCustomer = () =>{
    const [name,setName] = useState("");
    const [items,setItems] = useState([]);
    const [phone,setPhone] = useState(0);

    const update = (p) =>{
        p.preventDefault();
        // console.log("enter");
    }

    const remove = (p) =>{
        p.preventDefault();
        // console.log("enter1");
    }

    return <div className="h-screen w-full flex justify-center">
        <div className="flex flex-col justify-center gap-10">
            <h2 className="text-5xl">Update Customer Data</h2>
            <form className="flex flex-col gap-5">
                <input  onChange={(e)=>{
                    setName(e.target.value);
                }} className="text-4xl rounded-2xl border-2 h-16 p-4 border-slate-600" type="text" placeholder="name of customer" />
                <input  onChange={(e)=>{
                    setPhone(e.target.value);
                }} className="text-4xl rounded-2xl border-2 h-16 p-4 border-slate-600" type="text" placeholder="phone number" />
                <button onClick={update} className="text-4xl bg-blue-500 text-white rounded-2xl h-14">update</button>
                <button onClick={remove} className="text-4xl bg-blue-500 text-white rounded-2xl h-14">remove</button>
            </form>
        </div>
    </div>
}