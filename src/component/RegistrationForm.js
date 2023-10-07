import React, { useState } from 'react';
import showPwdImg from '../Assets/Show-password.svg';
import hidePwdImg from '../Assets/Hide-password.svg';
import {useUser} from '../context/Users.context'

function RegistrationForm() {
  const { input, setInput, handleSignup } = useUser();
  const [passwordMode, setPasswordMode] = useState(false);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Register</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
            onChange={e => setInput({ ...input, fullName: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <input
            type="number"
            placeholder="Mobile Number"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
            onChange={e => setInput({ ...input, mobileNumber: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
            onChange={e => setInput({ ...input, mail: e.target.value })}
          />
        </div>
        <div className="mb-4 relative">
          <input
            placeholder="Password"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
            type={passwordMode ? "text" : "password"}
            onChange={e => setInput({ ...input, password: e.target.value })}
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
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
