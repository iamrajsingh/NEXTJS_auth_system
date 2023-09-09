"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConformPassword] = useState("");
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);


  const resetPassword = async () => {
    await axios.post('/api/users/resetpassword', {password: confirmPassword, token: token});
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) setVerified(true);
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label>Enter your new password here</label>
      <input
        className="p-2 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        placeholder="new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <label>Enter your password again</label>
      <input
        className="p-2 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        placeholder="confirm password"
        value={confirmPassword}
        onChange={(e) => setConformPassword(e.target.value)}
      />

      {password === confirmPassword ? (
        <button
          onClick={resetPassword}
          className="p-3 rounded-lg focus:bg-blue-500 focus:bg-none text-black bg-blue-400"
        >
          Reset Password
        </button>
      ) : (
        <button className="p-3 rounded-lg text-black bg-red-500">
          Password don't matched!
        </button>
      )}
    </div>
  );
}
