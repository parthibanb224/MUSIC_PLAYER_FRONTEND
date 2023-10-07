import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';

const UserContext = createContext({
    user: [],
    setUser: () => Promise,
    input: [],
    setInput: () => Promise,
    handleSignup: () => null,
    handleLogin: () => null,
    handleMail: () => null,
    loaded: "",
    setLoaded: () => Promise,
    signinUser: "",
    setSigninUser: () => Promise,
    handleLogout: () => null,
    isLoggedin: Boolean,
    setIsLoggedin: () => Promise,
    open: Boolean,
    setOpen: () => Promise,
    handleUpdateUser: () => null,
    setSelectedPhoto: () => Promise,
    selectedPhoto: null,
    isSidebarOpen: Boolean,
    setSidebarOpen: () => Promise,
    isLoginModalOpen: Boolean,
    setLoginModalOpen: () => Promise,
    isRegistrationModalOpen: Boolean,
    setRegistrationModalOpen: () => Promise,
    handleSearch : () => null,
    accessToken : "",
    setAccessToken : () => Promise,
    searchInput : "Tamil Melody",
    setSearchInput : () => Promise,
    album : [],
    setAlbums : () => Promise,
})

export const useUser = () => useContext(UserContext);

export default function UsersContextProvider({ children }) {

    const [user, setUser] = useState([]);
    const [input, setInput] = useState(null);
    const [loaded, setLoaded] = useState("");
    const [signinUser, setSigninUser] = useState("");
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [searchInput, setSearchInput] = useState('Tamil Melody');
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/users/${signinUser}` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/users/${signinUser}`;
        axios.get(URL)
            .then(res => {
                // console.log(res.data.result);
                setUser(res.data.result);
            })
            .catch(err => {
                console.log(err);
            })
    }, [signinUser])

    const navigat = useNavigate();
    const handleSignup = (event) => {
        event.preventDefault();
        const SIGNUP_URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/signup/createUser` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/signup/createUser`;
        axios.post(SIGNUP_URL, input)
            .then(res => {
                // navigat('/')
                setRegistrationModalOpen(false);
                setLoginModalOpen(true);
            })
            .catch(err => {
                alert("Something Went Wrong")
                console.log("Account Created Failed", err);
            })
    };

    const handleLogin = (event) => {
        event.preventDefault();
        const axiosConfig = {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, private',
            },
        };
        const LOGIN_URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/login` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/login`;
        axios.post(LOGIN_URL, input, axiosConfig)
            .then(res => {
                if (res.data.success) {
                    if (res.data.message === "Login Successful!!") {
                        sessionStorage.setItem("Authorization", res.data.token);
                        var decoded = jwtDecode(res.data.token);
                        // sessionStorage.setItem("Token", JSON.stringify(decoded))
                        setSigninUser(decoded.name);
                        setIsLoggedin(true);
                        navigat('/app', { replace: true });
                    }
                    else {
                        alert("Password is wrong, Try Again!!");
                    }
                }
                else {
                    alert("Account Does not Exists, Please create your account to continue!!");
                }
            })
            .catch(err => {
                alert("Something Went Wrong");
                console.log(err);
            })
    }


    const handleMail = (event) => {
        event.preventDefault();
        // toast("Email Sending.....",{autoClose: 2000,pauseOnHover: false});
        setLoaded("true");
        const FORGOT_URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/forgot` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/forgot`;
        axios.put(FORGOT_URL, input)
            .then(response => {
                if (response.data.success) {
                    setLoaded("false");
                    toast("Email Sending Successfully");
                    // alert(`${response.data.message} => Go to Mail`)
                }
            })
            .catch(err => {
                setLoaded("false");
                toast("Enter Valid Email");
            })
    }

    const handleLogout = async (event) => {
        const axiosConfigs = {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, private',
            },
        };
        const LOGOUT_URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/login/logout` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/login/logout`;
        await axios.post(LOGOUT_URL, axiosConfigs)
            .then(res => {
                if (res.data === "Logged out successfully") {
                    setIsLoggedin(false);
                    sessionStorage.removeItem('Authorization');
                    navigat('/', { replace: true });
                    setLoginModalOpen(false);
                }
            })
            .catch(err => console.log(err))
    }

    const handleUpdateUser = (event) => {
        event.preventDefault();
        setUser({ ...user, ...input })
        const URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/updateUser/${signinUser}` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/updateUser/${signinUser}`;
        axios.patch(URL, input)
            .then(response => {
                if (response.data.success) {
                    toast("Updated Successfully", { className: "update-toast-message" });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    const handleSearch = async (token) => {
        const dynamicSearchInput = searchInput;
        var searchParameters = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        };
      
        try {
          // Fetch artist data using dynamicSearchQuery
          const artistResponse = await fetch('https://api.spotify.com/v1/search?q=' + dynamicSearchInput + '&type=artist', searchParameters);
          const artistData = await artistResponse.json();
          const artistID = artistData.artists.items[0].id;
      
          // Fetch artist's albums
          const albumResponse = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=IN&limit=50', searchParameters);
          const albumData = await albumResponse.json();
      
          // Fetch and add album tracks to the albums
          const albumsWithTracks = await Promise.all(albumData.items.map(async (album) => {
            const tracksResponse = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
              },
            });
            const tracksData = await tracksResponse.json();
            album.tracks = tracksData.items;
            return album;
          }));
      
          setAlbums(albumsWithTracks);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };


    const value = {
        user,
        setUser,
        input,
        setInput,
        handleSignup,
        handleLogin,
        handleMail,
        loaded,
        signinUser,
        setSigninUser,
        isLoggedin,
        handleLogout,
        setIsLoggedin,
        open,
        setOpen,
        handleUpdateUser,
        selectedPhoto,
        setSelectedPhoto,
        isSidebarOpen,
        setSidebarOpen,
        isLoginModalOpen,
        setLoginModalOpen,
        isRegistrationModalOpen,
        setRegistrationModalOpen,
        handleSearch,
        accessToken,
        setAccessToken,
        searchInput,
        setSearchInput,
        albums,
        setAlbums,
    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}
