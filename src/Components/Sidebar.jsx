import React, { useState } from 'react'
import { UseThemeContext } from '../context/themeContext'
import data from "../Data/Periodic-Table-JSON.json"

const Sidebar = (props) => {
  const {isDarkMode} = UseThemeContext()
  
  return (
    <>
        <div className={`sidebar-container ${isDarkMode && "dark"}`}>
            <div className={`element-title ${isDarkMode && "dark"}`}>
              <h1>{props.number}</h1>
              <h1>{props.name}</h1>
              <h5>{`(${props.symbol})`}</h5>
            </div>
        </div>
    </>
  )
}

export default Sidebar