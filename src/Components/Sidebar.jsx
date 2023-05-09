import React, { useState } from 'react'
import { UseThemeContext } from '../context/themeContext'
import '../Styles/sidebar.css'

const Sidebar = (props) => {
  const { isDarkMode } = UseThemeContext()

  return (
    <>
      <div className={`sidebar-container light ${isDarkMode && "dark"}`}>
        <div className={`element-title ${isDarkMode && "dark"}`}>
          <h1>{props.number}</h1>
          <h1>{props.name}</h1>
          <h5>{`(${props.symbol})`}</h5>
        </div>
        <div className='sb-image'>
          <img src={props.image} alt={props.name} />
        </div>
        <div className='info-container'>
          <div className='info-line'>
            <label>Categoria: </label>
            <label>{props.category}</label>
          </div>
          <div className='info-line'>
            <label>Fase: </label>
            <label>{props.phase}</label>
          </div>
          <div className='info-line'>
            <label>Periodo: </label>
            <label>{props.periodo}</label>
          </div>
          <div className='info-line'>
            <label>Grupo: </label>
            <label>{props.grupo}</label>
          </div>
          <div className='info-line'>
            <label>Masa atomica: </label>
            <label>{props.atomic_mass}u</label>
          </div>
          <div className='info-line'>
            <label>Densidad: </label>
            <label>{props.densidad}kg/m³</label>
          </div>
          <div className='info-line'>
            <label>Punto de fusión: </label>
            <label>{props.fusion}°K</label>
          </div>
          <div className='info-line'>
            <label>Punto de ebullición: </label>
            <label>{props.ebullicion}°K</label>
          </div>
          <div className='info-line'>
            <label>Punto de ebullición: </label>
            <label>{props.electronegatividad}</label>
          </div>
          <div className='info-line'>
            <label>Configuración electronica: </label>
            <label>{props.configuracion}</label>
          </div>
          <div className='info-line'>
            <label>Descubierto por: </label>
            <label>{props.discovered}</label>
          </div>
          <div className='info-line'>
            <label>Descripción: </label>
            <label>{props.descripcion}</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar