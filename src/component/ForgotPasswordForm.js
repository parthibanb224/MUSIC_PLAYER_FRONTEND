import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../context/Users.context'

function ForgotPasswordForm() {
  const { input, setInput, handleMail, loaded } = useUser();

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>
      <form onSubmit={handleMail}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
            onChange={e => setInput({ ...input, mail: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Send Reset Link
        </button>
        {loaded === "true" ? <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>Loading...</p> : <ToastContainer />}
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
