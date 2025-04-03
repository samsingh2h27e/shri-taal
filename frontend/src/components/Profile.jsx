import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";


export const Profile = ({ name }) => {
    const nav = useNavigate();
    async function logout(params) {
        console.log("pressed");
        try {
            let response = await axios.get("http://localhost:3000/logout");
            console.log(response);
            if(response.status===200){
                nav("/login");
            }
        } catch (error) {
            console.error(error);
        }
    }


  return (
    <div className="absolute right-58 z-50 bg-white rounded-b-xl">
        <div className="flex flex-col h-40 w-50 rounded-xl gap-4 m-auto p-4 text-xl border-2 font-bold">
            <button><p>hello {name}</p></button>
            <button><p>change Password</p></button>
            <button onClick={logout}><p>sign out</p></button>
        </div>
    </div>
  );
};
