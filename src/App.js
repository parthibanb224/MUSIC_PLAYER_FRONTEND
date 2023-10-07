import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import MusicApp from './pages/MusicApp';
import FrontPage from './pages/FrontPage';
import ResetPasswordForm from './component/ResetPasswordForm';
import { useUser } from './context/Users.context';
import jwtDecode from 'jwt-decode';

function App() {

  const { isLoggedin, setIsLoggedin, setSigninUser } = useUser();
  useEffect(() => {
    let token = sessionStorage.getItem("Authorization");
    if (token) {
      var decoded = jwtDecode(token);
      setSigninUser(decoded.name);
      setIsLoggedin(true);
    }
  })

  return (
    <div>
      <Routes>
        {!isLoggedin ? (
          <>
            <Route path='/' Component={FrontPage}></Route>
            <Route path='/ResetPassword/:token' Component={ResetPasswordForm}></Route>
          </>
        ) : (
          <Route path='/app' Component={MusicApp}></Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
