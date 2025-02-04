import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/const';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(emailId, password);
  
      const res = await axios.post(`${API_BASE_URL}login`, 
        { emailId, password }, 
        { withCredentials: true } 
      );
  
      console.log(res);
  
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-300 w-96 shadow-xl p-6">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input 
            type="text" 
            value={emailId} 
            className="input input-bordered w-full max-w-xs"
            onChange={(e)=>setEmailId(e.target.value)} />
          </label>
          
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input 
            type="password" 
            value={password} 
            className="input input-bordered w-full max-w-xs"
            onChange={(e)=>setPassword(e.target.value)} />
          </label>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
