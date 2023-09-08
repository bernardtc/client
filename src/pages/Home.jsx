import React, { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { Link } from "react-router-dom";
import logoImage2 from "../assets/logo-uplay2.png";
import { AuthContext } from "../context/auth.context";



function Home() {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <div
      className={`home ${theme} d-flex justify-content-center align-items-center`}
    >
      <div className="text-center">
        {isLoggedIn > 0 &&
          (
            <div>
            <h1>
              Welcome {user.username}, to{" "}
              <img className="home-img" alt="logo" src={logoImage2} />
            </h1>
            <ul className={`home-list ${theme}`}>
              <li>Play your favorite songs</li>
              <li>Build your playlist</li>
              <li>Share with your friends</li>
            </ul>
            <Link to="/profile/:username" className={`btn btn-primary ${theme}`}>
            
              Profile
            </Link>
              <Link to="/track" className={`btn btn-primary ${theme}`}>
            
              Add Track
            </Link>
            <Link to="/album" className={`btn btn-primary ${theme}`}>
         
              Add Album
            </Link>
            </div>
          )}{" "}
      {" "}
        {!isLoggedIn && (
          <>
            <h1>
              Welcome to{" "}
              <img className="home-img" alt="logo" src={logoImage2} />
            </h1>
            <ul className={`home-list ${theme}`}>
              <li>Play your favorite songs</li>
              <li>Build your playlist</li>
              <li>Share with your friends</li>
            </ul>

           
            <Link to="/track" className={`btn btn-primary ${theme}`}>
            
              Add Track
            </Link>
            <Link to="/album" className={`btn btn-primary ${theme}`}>
         
              Add Album
            </Link>
          
            <Link to="/signup" className={`btn btn-primary ${theme}`}>
              Sign Up
            </Link>
            <Link to="/login" className={`btn btn-secondary ${theme}`}>
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
