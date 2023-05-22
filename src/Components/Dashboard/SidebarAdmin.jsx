import React from 'react'
import { UseThemeContext } from '../../context/themeContext'
import { useDispatch, useSelector } from 'react-redux'
import reactIcon from '../../Assets/Img/reactIcon.png'
import documentIconB from '../../Assets/Img/documentIconB.png'
import documentIconW from '../../Assets/Img/documentIconW.png'
import userIconB from '../../Assets/Img/userIconB.png'
import userIconW from '../../Assets/Img/userIconW.png'
import logoutB from '../../Assets/Img/logoutIconB.png'
import logoutW from '../../Assets/Img/logoutIconW.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../../Firebase/config'
import { CerrarSesion } from '../../Redux/actions/authActions'

const SidebarAdmin = () => {
    const { isDarkMode } = UseThemeContext()
    const dbuser = useSelector(state => state.usuario.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const signOut = () => {
        auth.signOut();
        dispatch(CerrarSesion())
        navigate("/");
      }

  return (
    <div className={`admin-sidebar-container light ${isDarkMode && "dark"}`}>
        <div className={`element-title justify-center ${isDarkMode && "dark"}`}>
            <h2 className='text-[32px] font-bold'>{dbuser.username}</h2>
        </div>
        <div className='sb-admin-image'>
            <img src={reactIcon} alt="react" />
        </div>
        <ul className="">
          <li className={`${pathname.includes(`/dashboard/blogs`) ? "linkSelected" : ""} ${isDarkMode ? "dark" : "light"}`}>
            <NavLink
              end
              to={`/dashboard/blogs`}
              className={`${isDarkMode ? "dark" : "light"} `}
            >
              <img
                src={`${isDarkMode ? documentIconW : documentIconB}`}
                alt="article"
              />
              <span>
                Blogs
              </span>
            </NavLink>
          </li>
          <li className={`${pathname.includes(`/dashboard/users`) ? "linkSelected" : ""} ${isDarkMode ? "dark" : "light"}`}>
            <NavLink
              end
              to={`/dashboard/users`}
              className={`${isDarkMode ? "dark" : "light"} `}
            >
              <img
                src={`${isDarkMode ? userIconW : userIconB}`}
                alt="user"
              />
              <span>
                Usuarios
              </span>
            </NavLink>
          </li>
          <li >
            <NavLink
              onClick={() => signOut()}
              end
              to="/"
              className={`${isDarkMode ? "dark" : "light"}`}
            >
              <img
                src={`${isDarkMode ? logoutW : logoutB}`}
                alt="logout"
              />
              <span>
                Cerrar sesion
              </span>
            </NavLink>
          </li>

        </ul>
      </div>
  )
}

export default SidebarAdmin