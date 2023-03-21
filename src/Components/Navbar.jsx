import React from 'react';
import Luna from '../Img/moon.png';
import Sol from '../Img/sun.png';
import {UseThemeContext} from '../context/themeContext'

const Navbar = () => {
    const {setIsDarkMode, isDarkMode} = UseThemeContext()

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

  return (
    <>
        <header>
            <nav id="navbar" className={`${isDarkMode ? "dark" : "light"}`}>
              <h1>electron</h1>
              <ul>
                <li>Tabla</li>
                <li>Blog</li>
                <li>Iniciar sesion</li>
                <li>
                  <div className='theme-container' onClick={toggleDarkMode}>
                    {isDarkMode ?   <img src={Luna} alt="them-icon"/> :<img src={Sol} alt="them-icon"/>} 
                  </div>
                </li>
                
              </ul>
            </nav>
        </header>
    </>
  )
}

export default Navbar;