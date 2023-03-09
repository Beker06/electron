import React from 'react'
import data from "../Data/Periodic-Table-JSON.json"

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

const Table = () => {
  return (
    <>
        <div className='table-container'>
            {data.elements.map((element) => (
              <div
                className='element'
                key={element.name}
                style={{
                  gridColumn: element.xpos,
                  gridRow: element.ypos,
                  borderColor: colorMap[element.category],
                  backgroundColor: colorMap[element.category],
                }}
              >
              <strong>{element.symbol}</strong>
              </div>
            ))}
        </div>
    </>
    
  )
}

export default Table