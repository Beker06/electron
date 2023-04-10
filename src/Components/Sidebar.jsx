import React, { useState } from 'react'
import { UseThemeContext } from '../context/themeContext'

const Sidebar = (props) => {
  const { isDarkMode } = UseThemeContext()

  return (
    <>
      <div className={`sidebar-container ${isDarkMode && "dark"}`}>
        <div className={`element-title ${isDarkMode && "dark"}`}>
          <h1>{props.number}</h1>
          <h1>{props.name}</h1>
          <h5>{`(${props.symbol})`}</h5>
        </div>
        <div className='sb-image'>
          <img src={props.image} alt={props.name} />
        </div>
      </div>
    </>
  )
}

export default Sidebar