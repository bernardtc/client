import React, { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { Link } from "react-router-dom";
import logoImage2 from "../assets/logo-uplay2.png";
import Profile from "./Profile";
import { AuthContext } from "../context/auth.context";
import AlbumDetailsApi from "../components/spotify/AlbumDetailsApi";
import AlbumApi from "../components/spotify/AlbumApi";
import MusicLibery from "./MusicLibery";
import backgroundImag from "../assets/background-2"
import  "./Home.css"




function Home() {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <header
    style={{
      backgroundImage: `url(${backgroundImag})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: 550,
      // width: 100,
    }}
    >
    
    <div
      className={`home ${theme} d-flex justify-content-center align-items-center homepage`}
    >
      
      <div className="text-center">
        {isLoggedIn > 0 &&
          (
            <div>
              <Profile />
              <MusicLibery/>
            </div>
          )}
        :
        {!isLoggedIn && (
          <>
            <h1>
              Welcome to
              <img className="home-img" alt="logo" src={logoImage2} />
            </h1>
            <ul className={`home-list ${theme}`}>
              <li>Play your favorite songs</li>
              <li>Build your playlist</li>
              <li>Share with your friends</li>
            </ul>
{/* <AlbumList/>
            <AlbumApi/> */}
<Link to="/admin"  className={`btn btn-primary`} >Admin Page</Link><br></br>

        
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
    </header>
  );
}

export default Home;
