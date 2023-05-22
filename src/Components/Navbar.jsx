import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const { pathname } = location;
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
        <nav id="navbar" className={`py-2 ${isDarkMode ? "dark" : "light"}`}>
          <div onClick={() => navigate("/")} className='pointer'><h1>electron</h1></div>
          <div className={`navLinksContainer ${isDarkMode ? "dark" : "light"}`}>
            <button className={`navButton ${isDarkMode ? "dark" : ""} ${!pathname.includes("/blogs") ? "navSelected" : ""}`} onClick={() => navigate("/")}>
              Tabla
            </button>
            <button className={`navButton ${isDarkMode ? "dark" : ""} ${pathname.includes("/blogs") ? "navSelected" : ""}`} onClick={() => navigate("/blogs")}>
              Blog
            </button>
            <div className='theme-container' onClick={toggleDarkMode}>
              {isDarkMode ? <img src={Luna} alt="them-icon" /> : <img src={Sol} alt="them-icon" />}
            </div>
            <div className='bars-container'>
              <div className='container-menu-button' onClick={() => setNavActive(!navActive)}>
                <button className={`${navActive ? "menu-button" : "menu-static"} `}>
                  {autenticacion ? (
                    <>
                      <label className={`${isDarkMode ? "dark" : ""}`}>{dbuser.username}</label>
                    </>
                  ) : (
                    <>
                      <div className={`${isDarkMode ? "dark" : "light"}`}></div>
                      <div className={`${isDarkMode ? "dark" : "light"}`}></div>
                      <div className={`${isDarkMode ? "dark" : "light"}`}></div>
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
                                  onClick={() => navigate("/dashboard/blogs")}
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