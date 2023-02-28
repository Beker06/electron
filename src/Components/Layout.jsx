import React from 'react'
import Navbar from './Navbar'

export default function Layout ({children}) {

    return(
        <>
            <div className="app">
                <Navbar />
                <main>{children}</main>
            </div>
        </>
    )
}