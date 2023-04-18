import React from 'react'
import data from "../Data/Periodic-Table-JSON.json"
import AOS from 'aos'
import "aos/dist/aos.css"

const colorMap = {
  "noble gas": "#FFBC42",
  "alkaline earth metal": "#EC674E",
  "diatomic nonmetal": "#D81159",
  "alkali metal": "#8F2D56",
  "transition metal": "#58586B",
  "post-transition metal": "#218380",
  lanthanide: "#4AABAF",
  metalloid: "#73D2DE"
};

const Table = (props) => {
  return (
    <>
      <div className='table-container'>
        {data.elements.map((element, index) => (
          <div
            className='element'
            key={element.name}
            style={{
              gridColumn: element.xpos,
              gridRow: element.ypos,
              borderColor: colorMap[element.category],
              backgroundColor: colorMap[element.category],
            }}
            onClick={() => props.onSelectElement(element)}
          >
            <strong>{element.symbol}</strong>
            <small className='number'>{element.number}</small>
            <small className='name'>{element.name}</small>
          </div>
        ))}
      </div>
    </>

  )
}

export default Table