"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log("Error while logout", error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      setData(response.data.data._id);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <hr />
      <h2 className="p-2 rounded-sm bg-slate-400 m-3">
        {data ? <Link href={`/profile/${data}`}>{data}</Link> : "Data not here"}
      </h2>
      <button
        onClick={logout}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none 
            bg-red-600 focus:border-gray-600"
      >
        logout
      </button>
      <hr />
      <button
        onClick={getUserDetails}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none 
            bg-blue-600 focus:border-gray-600"
      >
        Get User data
      </button>
    </div>
  );
}
