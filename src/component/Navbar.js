import React, { useState } from 'react'
import { useUser } from '../context/Users.context';

export default function Navbar() {
    const {handleSearch,accessToken,searchInput,setSearchInput,handleLogout} = useUser();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    return (
        <div className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 flex justify-between items-center">
            <div className="flex items-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUScnNidXFcVJNzOGkPd5pO1Lzwxa1Jcl63w&usqp=CAU" alt="Music Logo" className="h-6 w-6 mr-2" />
                <span className="font-bold text-xl">Music App</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for an artist"
                        className="rounded-full py-2 px-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button
                        className="absolute right-0 top-0 mt-2 mr-2"
                        onClick={() => handleSearch(accessToken)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 hover:text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m0 0l-6-6m6 6l-6-6M3 13a8 8 0 118 8m-8-9a1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1 1 1 0 01-1-1z"
                            />
                        </svg>
                    </button>
                </div>
                <div className="relative">
                    <img
                        src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-human-avatar-free-vector-png-image_4825373.jpg"
                        alt="Profile Icon"
                        className="h-6 w-6 cursor-pointer"
                        onClick={toggleProfileMenu}
                    />
                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-md shadow-md">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                            >
                                Settings
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
