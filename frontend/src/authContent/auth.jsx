import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const Register = () =>{
    const nav = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    async function handleSubmit(p){
        p.preventDefault();
        try{
            let res = await axios.post(`${import.meta.env.VITE_URL}/register`,{
                name,
                email,
                password,
                phone
            });
            if(res.status === 201){
                alert("Registered successfully");
                nav("/login");
            }
            else{
                alert("Invalid credentials");
            }
        }
        catch(error){
            // console.log(error);
        }   
}

    return (
        <div>
            <div className="m-auto mt-20 flex flex-col justify-center h-100 w-100 rounded-md"> 
                <h1 className="text-3xl m-auto mt-5">
                    Register
                </h1>
                <form onSubmit={handleSubmit} className="flex gap-3 flex-col m-auto mt-0 mb-0">
                    <input onChange={(e)=>{
                        setName(e.target.value);
                    }} className="w-100 h-12 outline-1 rounded-sm p-3" type="text" placeholder="Name" />
                    <input onChange={(e)=>{
                        setEmail(e.target.value);
                    }} className="w-100 h-12 outline-1 rounded-sm p-3" type="text" placeholder="Email" />
                    <input onChange={(e)=>{
                        setPassword(e.target.value);
                    }} className="w-100 h-12 outline-1 rounded-sm p-3" type="password" placeholder="Password" />
                    <input onChange={(e)=>{
                        setPhone(e.target.value);
                    }} className="w-100 h-12 outline-1 rounded-sm p-3" type="text" placeholder="Phone number" />
                    <button className="m-auto bg-green-500 hover:bg-green-600 w-100 w-100 h-12 rounded-md outline-1 mb-0">Register</button>
                </form>
            </div>
        </div>
    )
}

export const Login = () =>{
    const nav = useNavigate();
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    async function handleLogin(p) {
        p.preventDefault();
        // console.log("${import.meta.env.VITE_URL}");
        try{
            let res = await axios.post(`${import.meta.env.VITE_URL}/login`,{
                name,
                email,
                password
            });
            // console.log(res);
            if(res.status === 201){
                // console.log(res);
                alert("Logged in successfully");
                nav("/");
            }
            else if(res.status === 501){
                alert("Invalid credentials");
            }
        }
        catch(error){
            // console.log("not working")
            // console.log(error);
        }
    }
    return (
        <div>
            <div className="flex flex-col h-100 w-100 m-auto mt-20">
                <h1 className="text-3xl m-auto mt-5 mb-7">
                    Login
                </h1>
                <form onSubmit={handleLogin} className="flex gap-3 flex-col m-auto mt-0">
                    <input onChange={(e)=>{
                        setName(e.target.value);
                    }} className="w-100 h-14 outline-1 p-3 rounded-sm" type="text" placeholder="Name" />
                    <input onChange={(e)=>{
                        setEmail(e.target.value);
                    }} className="w-100 h-14 outline-1 p-3 rounded-sm" type="email" placeholder="email" />
                    <input onChange={(e)=>{
                        setPassword(e.target.value);
                    }} className="w-100 h-14 outline-1 p-3 rounded-sm" type="password" placeholder="Password" />
                    <button className="m-auto bg-blue-500 hover:bg-blue-600 w-100 h-15 rounded-md outline-1 mb-0">Login</button>
                    <button className="m-auto bg-green-500 hover:bg-green-600 w-100 h-15 rounded-md outline-1 mb-0" onClick={()=>{
                        nav("/register");
                    }}>Register</button>
                </form>
            </div>
        </div>
    )
}