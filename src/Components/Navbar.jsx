import React from 'react';
import { useNavigate } from 'react-router-dom';
import Luna from '../Assets/Img/moon.png';
import Sol from '../Assets/Img/sun.png';
import { UseThemeContext } from '../context/themeContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { setIsDarkMode, isDarkMode } = UseThemeContext()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <>
      <header>
        <nav id="navbar" className={`${isDarkMode ? "dark" : "light"}`}>
          <div onClick={() => navigate("/")} className='pointer'><h1 >electron</h1></div>
          <div className='navLinksContainer'>
            <button onClick={() => navigate("/")}>
              Tabla
            </button>

            <button onClick={() => navigate("/blogs")}>
              Blog
            </button>

            <button onClick={() => navigate("/login")}>
              Iniciar sesion
            </button>

            <div className='theme-container' onClick={toggleDarkMode}>
              {isDarkMode ? <img src={Luna} alt="them-icon" /> : <img src={Sol} alt="them-icon" />}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar;