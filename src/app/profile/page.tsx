"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage(){

    const router = useRouter();

    const logout = async ()=> {
        try {
            await axios.get('/api/users/logout')
            router.push("/login");
        } catch (error: any) {
            console.log("Error while logout", error.message);

        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <hr />
            <button 
            onClick={logout}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none 
            bg-red-600 focus:border-gray-600">logout</button>
        </div>
    )
}