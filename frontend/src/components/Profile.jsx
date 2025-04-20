import React,{useState} from "react";
import { useNavigate } from "react-router";
import axios from "axios";


export const Profile = ({ name }) => {
    const [password,setPassword] = useState("");
    const [flag,setFlag] = useState(false);
    const nav = useNavigate();

    function changePassword(){
        setFlag(true);
    }

    async function newPassword(params){
        try {
            let response = await axios.post(`${import.meta.env.VITE_URL}/updatePassword`,{
                password
            });
            // console.log(response);
            if(response.status===200){
                alert("Password changed successfully");
                setFlag(false);
            }else{
                alert("Invalid credentials");
            }
        }catch(error){
            // console.error(error);
        }
    }

    async function logout(params) {
        // console.log("pressed");
        try {
            let response = await axios.get(`${import.meta.env.VITE_URL}/logout`);
            // console.log(response);
            if(response.status===200){
                nav("/login");
            }
        } catch (error) {
            // console.error(error);
        }
    }


  return (
    <div className="z-50 bg-white rounded-b-xl">
        {!flag&&<div className="flex flex-col h-40 w-50 rounded-xl gap-4 m-auto p-4 text-xl border-2 font-bold">
            <button><p>hello {name}</p></button>
            <button onClick={changePassword}><p>change Password</p></button>
            <button onClick={logout}><p>sign out</p></button>
        </div>}
        {flag && <div className="flex flex-col w-50 rounded-xl gap-4 m-auto p-4 text-xl border-2 font-bold">
                <input onChange={(e)=>{
                    setPassword(e.target.value);
                }} placeholder="new Password" type="password"/>
                <input placeholder="confirm Password" type="password"/>
                <button onClick={newPassword}>confirm</button>
            </div>
            }
    </div>
  );
};
