import React from 'react'
import data from "../Data/Periodic-Table-JSON.json"
import AOS from 'aos'
import "aos/dist/aos.css"

const colorMap = {
  "Gas noble": "#FFBC42",
  "Metal alcalinotérreo": "#EC674E",
  "No metal diatómico": "#D81159",
  "Metal alcalino": "#8F2D56",
  "Metal de transición": "#58586B",
  "Metal post-transición": "#218380",
  "Lantánidos": "#4AABAF",
  "Metaloide": "#73D2DE",
  "No metal poliatómico": "#414db5",
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