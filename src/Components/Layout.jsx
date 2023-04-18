import React from 'react'
import Navbar from './Navbar'
import { UseThemeContext } from '../context/themeContext'
import { useSelector } from 'react-redux'


export default function Layout({ children }) {
    const dbuser = useSelector(state => state.usuario.user)
    const autenticacion = useSelector(state => state.usuario.isAuthenticated)
    const { isDarkMode } = UseThemeContext()

    return (
        <>
            <div className={`app ${isDarkMode && "main-dark"}`}>
                <Navbar dbuser={dbuser} autenticacion={autenticacion} />
                <main>{children}</main>
                {/* <Footer/> */}
            </div>
        </>
    )
}