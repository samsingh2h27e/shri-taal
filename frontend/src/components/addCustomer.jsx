import axios from "axios";
import React,{useState} from "react";
import { useLocation,useNavigate } from "react-router";


export const Addcustomer = () =>{
    const nav = useNavigate();
    // console.log(user);
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [balance,setBalance] = useState("");
    function addCustomer(p) {
        p.preventDefault();
        // console.log(name,phone,balance);
        async function add(){
            let response = await axios.post("http://localhost:3000/addCustomer",{
                name,
                phone,
                balance
            });
            console.log(response);
            nav("/");
        }
        add();
    }

    return <div className="h-screen w-full flex justify-center">
        <div className="flex flex-col justify-center gap-10">
            <h2 className="text-5xl">Add Customer</h2>
            <form onSubmit={addCustomer} className="flex flex-col gap-5">
                <input onChange={(e)=>{
                    setName(e.target.value);
                }} className="text-4xl rounded-2xl border-2 h-16 p-4 border-slate-600" type="text" placeholder="name of customer" />
                <input onChange={(e)=>{
                    setPhone(e.target.value);
                }} className="text-4xl rounded-2xl border-2 h-16 p-4 border-slate-600" type="text" placeholder="phone number" />
                <input onChange={(e)=>{
                    setBalance(e.target.value);
                }} className="text-4xl rounded-2xl border-2 h-16 p-4 border-slate-600" type="text" placeholder="balance" />
                <button className="text-4xl bg-blue-500 text-white rounded-2xl h-16">Add</button>
            </form>
        </div>
    </div>
};