import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/const';
import { useDispatch } from 'react-redux';
import {addUser} from "../store/userSlice";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try { 
      const res = await axios.post(`${API_BASE_URL}login`, 
        { emailId, password }, 
        { withCredentials: true } 
      );

      dispatch(addUser(res.data.user))
      setSuccessMessage("Login successful!");
      return navigate("/")

    } catch (err) {
      setErrorMessage(res.data.message);
    } finally {
      setLoading(false);
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
            <button className="btn btn-primary" onClick={handleSubmit}>
            {loading ? <CircularProgress size={24} className="text-white" /> : "Login"}
            </button>
          </div>
          {errorMessage && (
          <Alert severity="error" className="mb-4">
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" className="mb-4">
            {successMessage}
          </Alert>
        )}
        </div>
      </div>
    </div>
  );
};

export default Login;
