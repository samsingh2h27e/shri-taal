import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export const BuyItem = () => {
    const [item, setItem] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [money, setMoney] = useState(0);
    const [price, setPrice] = useState(0);
    const [res,setRes] = useState(false);
    const [balance,setBalance] = useState(0);

    const nav = useNavigate();
    const [searchParams] = useSearchParams();
    const customer = JSON.parse(searchParams.get("customer")); // Extract customer from query params

    // console.log(customer); // Ensure it's correctly received

    async function handleSubmit(event) {
        event.preventDefault();

        let response = await axios.post("http://localhost:3000/buyItem", {
            customer: customer.name,
            item,
            quantity,
            price,
            money,
        });

        // console.log(response);
        if(response){
            setRes(true);
            setBalance(response.data.customer.currentBalance);
        }
    }

    return (
        <div className="h-screen w-full flex justify-center">
            {!res && <div className="flex flex-col justify-center gap-10">
                <h2 className="text-5xl">Buy Item for {customer.name}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input onChange={(e) => setItem(e.target.value)} className="text-4xl rounded-2xl border-2 h-16 p-4 border-slate-600" type="text" placeholder="Item name" />
                    <input onChange={(e) => setQuantity(e.target.value)} className="text-4xl rounded-2xl border-2 h-16 p-4 border-slate-600" type="number" placeholder="Quantity" />
                    <input onChange={(e) => setPrice(e.target.value)} className="text-4xl rounded-2xl border-2 h-16 p-4 border-slate-600" type="number" placeholder="Price per item" />
                    <input onChange={(e) => setMoney(e.target.value)} className="text-4xl rounded-2xl border-2 h-16 p-4 border-slate-600" type="number" placeholder="Money given" />
                    <button className="text-4xl bg-blue-500 text-white rounded-2xl h-16">Add</button>
                    <p className="text-3xl m-auto">{"Amount to be paid: " + Number(quantity) * Number(price)}</p>
                </form>
            </div>}
            {res && <div className="">
                <button onClick={() => {
                    nav('/');
                }}><h1 className="m-auto mt-40 text-3xl border-2 p-4 rounded-b-lg bg-green-500 text-white">{customer.name} currentbalance is {balance}</h1></button>
                </div>}
        </div>
    );
};
