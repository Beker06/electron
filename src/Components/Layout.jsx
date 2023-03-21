import React from 'react'
import Navbar from './Navbar'
import {UseThemeContext} from '../context/themeContext'


export default function Layout ({children}) {
    const {isDarkMode} = UseThemeContext()

    return(
        <>
            <div className={`app ${isDarkMode && "main-dark"}`}>
                <Navbar/>
                <main>{children}</main>
                {/* <Footer/> */}
            </div>
        </>
    )
}