"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {

  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("Password must be 8 character long!");
  const onLogin = async () => {

    if(user.password.length >= 8) {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
    
        console.log("Login success", response.data);
        toast.success("Login success");
        router.push("/profile");
          
        } catch (error:any) {
          console.log("Login failed", error.message)
          toast.error("Check your email and password!");
        }finally{
          setLoading(false)
        }
    }else{
        toast.error(error);
    }
    
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true);
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl pb-8">{loading ? "Loading...." : "Login here"}</h1>
      

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />


     {buttonDisabled ? "Enter data in the fields"  : <button 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      onClick={onLogin}
      >Login</button>}
      <Link href="/signup">Create an account</Link>
      <Link href="/forgotpassword">Forgot password?</Link>

    </div>
  );
}
