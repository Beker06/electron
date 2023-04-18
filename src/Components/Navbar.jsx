import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Luna from '../Assets/Img/moon.png';
import Sol from '../Assets/Img/sun.png';
import { UseThemeContext } from '../context/themeContext'
import { auth } from "../Firebase/config";
import { CerrarSesion } from '../Redux/actions/authActions'
import AOS from 'aos'
import "aos/dist/aos.css"
import "../Styles/botonMenu.css"



const Navbar = ({ dbuser, autenticacion }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [navActive, setNavActive] = useState(false);


  const signOut = () => {
    auth.signOut();
    dispatch(CerrarSesion())
    navigate("/");
  }
  const { setIsDarkMode, isDarkMode } = UseThemeContext()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    AOS.init()
  }, [])


  return (
    <>
      <header>
        <nav id="navbar" className={`${isDarkMode ? "dark" : "light"}`}>
          <div onClick={() => navigate("/")} className='pointer'><h1 >electron</h1></div>
          <div className='navLinksContainer'>
            <button className='navButton' onClick={() => navigate("/")}>
              Tabla
            </button>

            <button className="navButton" onClick={() => navigate("/blogs")}>
              Blog
            </button>
            <div className='theme-container' onClick={toggleDarkMode}>
              {isDarkMode ? <img src={Luna} alt="them-icon" /> : <img src={Sol} alt="them-icon" />}
            </div>
            <div className='bars-container'>
              <div className='container-menu-button' onClick={() => setNavActive(!navActive)}>
                <button className={`${navActive ? "menu-button" : "menu-static"}`}>
                  {autenticacion ? (
                    <>
                      <label>{dbuser.username}</label>
                    </>
                  ) : (
                    <>
                      <div></div>
                      <div></div>
                      <div></div>
                    </>
                  )}

                </button>
                {navActive ? (
                  <>
                    <div id="menu">
                      <div data-aos="fade-down" data-aos-delay="0" data-aos-duration="100">
                        <div
                          className='container-menu'
                        >
                          {autenticacion ? (
                            <>
                              <button
                                onClick={() => navigate("/addBlog")}
                              >
                                Crear blog{" "}
                              </button>
                              {dbuser.isAdmin ? (
                                <button
                                  onClick={() => navigate("/addBlog")}
                                >
                                  Tablero{" "}
                                </button>
                              ) : (null)}
                              <button
                                onClick={() => signOut()}
                              >
                                Cerrar sesion{" "}
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => navigate("/login")}
                              >
                                Iniciar sesion{" "}
                              </button>
                              <button
                                onClick={() => navigate("/signup")}
                              >
                                Registrarse{" "}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (null)}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar;