import React, { useState } from 'react';
import showPwdImg from '../Assets/Show-password.svg';
import hidePwdImg from '../Assets/Hide-password.svg';
import { useUser } from "../context/Users.context";

function LoginForm({onRegisterClick,onForgotPasswordClick}) {
  const [passwordMode, setPasswordMode] = useState(false);
  const { input, setInput, handleLogin } = useUser();

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl text-black font-semibold mb-6">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            onChange={e => setInput({ ...input, mail: e.target.value })}
            required
          />
        </div>
        <div className="mb-4 relative">
          <input
            type={passwordMode ? "text" : "password"}
            placeholder="Password"
            className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            onChange={e => setInput({ ...input, password: e.target.value })}
            required
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
          Login
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Don't have an account?{' '}
        <span onClick={onRegisterClick} className="text-indigo-600 cursor-pointer">
          Register
        </span>
      </p>
      <p className="mt-2 text-gray-600">
        <span onClick={onForgotPasswordClick} className="text-indigo-600 cursor-pointer">
          Forgot your password?
        </span>
      </p>
    </div>
  );
}

export default LoginForm;
