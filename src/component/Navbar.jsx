import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {removeUser} from "../store/userSlice";
import { API_BASE_URL } from '../utils/const';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}logout`, {}, { withCredentials: true });
      dispatch(removeUser()); 
      return navigate("/login")

    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Dev Tinder</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end mx-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user? user.photoUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li>{ user ? <a onClick={handleLogout}>Logout</a> : <a onClick={() => navigate("/login")}>Login</a>}</li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar