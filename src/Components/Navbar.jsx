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
          <h1>electron</h1>
          <ul>
            <li>
              <button onClick={() => navigate("/")}>
                Tabla
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/blogs")}>
                Blog
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/login")}>
                Iniciar sesion
              </button>
            </li>
            <li>
              <div className='theme-container' onClick={toggleDarkMode}>
                {isDarkMode ? <img src={Luna} alt="them-icon" /> : <img src={Sol} alt="them-icon" />}
              </div>
            </li>

          </ul>
        </nav>
      </header>
    </>
  )
}

export default Navbar;