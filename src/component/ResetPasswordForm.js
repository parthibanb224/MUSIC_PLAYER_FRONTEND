import React, { useState } from 'react';
import showPwdImg from '../Assets/Show-password.svg';
import hidePwdImg from '../Assets/Hide-password.svg';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPasswordForm() {
  const [passwordMode, setPasswordMode] = useState(false);
  const { token } = useParams();
  const [passwordCheck, setPasswordCheck] = useState([]);

  const Navigate = useNavigate();
  const handleResetPassword = (event) => {
    event.preventDefault();
    if (passwordCheck.newPassword === passwordCheck.confirmPassword) {
      const RESET_URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/reset/${token}` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/reset/${token}`;
      axios.patch(RESET_URL, { password: passwordCheck.newPassword })
        .then(response => {
          if (response.data.success) {
            Navigate('/');
          }
        })
        .catch(err => {
          alert("Something Went Wrong", err);
        });
    }
    else {
      alert("password doesn't match pls check");
    }
  }
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div className="mb-4 relative">
          <input
            placeholder="New Password"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            type={passwordMode ? "text" : "password"}
            onChange={e => setPasswordCheck({ ...passwordCheck, newPassword: e.target.value })}
          />
          <img
            className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
            title={passwordMode ? "Hide password" : "Show password"}
            src={passwordMode ? showPwdImg : hidePwdImg}
            onClick={() => setPasswordMode(prevState => !prevState)}
            alt='password gif'
          />
        </div>
        <div className="mb-6 relative">
          <input
            placeholder="Confirm New Password"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            type={passwordMode ? "text" : "password"}
            onChange={e => setPasswordCheck({ ...passwordCheck, confirmPassword: e.target.value })}
          />
          <img
            className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
            title={passwordMode ? "Hide password" : "Show password"}
            src={passwordMode ? showPwdImg : hidePwdImg}
            onClick={() => setPasswordMode((prevState) => !prevState)}
            alt="password gif"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
