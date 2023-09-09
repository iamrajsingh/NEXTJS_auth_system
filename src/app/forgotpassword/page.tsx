"use client";
import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const forgetPassword = async () => {
    try {
      await axios.post("/api/users/forgotpassword", { email });
      setEmail("");
      alert("Please check your email for password reset link");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label>Enter your Email to reset password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <button
        className="p-3 rounded-lg focus:bg-blue-500 focus:bg-none text-black bg-blue-400"
        onClick={forgetPassword}
      >
        Submit
      </button>
    </div>
  );
}
