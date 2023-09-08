import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from "../context/theme.context";
import { AuthContext } from "../context/auth.context";
import logoImage from '../assets/logo3.png';


function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn , user, logOutUser } = useContext(AuthContext);
  const imgStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '75%',
    cursor: 'pointer',
  }
  let profilePageURL = '/';

  if (user) {
    profilePageURL = `/profile/${user.username}`;
  }
  

  return (
    <>
<nav className={`navbar navbar-expand-lg navbar-dark bg-black`}>
    
{isLoggedIn && (
  <div>
    
    <Link to={profilePageURL}>
              <h1>{user.username}</h1>
              <img src={user.image} style={imgStyle} alt="profile_image" />
            </Link>
  </div>
)} 
      <Link to="/">
        <img className='logo-img' alt='logo' src={logoImage} />
      </Link>
      { <label className="ml-3">Theme <button className={`theme-btn ${theme}`} onClick={toggleTheme}>{theme === "light" ? "🌞": "🌙"}</button></label> }
      <button onClick={logOutUser}>Logout</button>
</nav>

    </>
  )
}

export default Navbar;
