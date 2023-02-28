import React from 'react'
import data from "../Data/Periodic-Table-JSON.json"

const Table = () => {
  return (
    <>
        <div className='table-container'>
            {data.elements.map((element) => (
                <div
                    className='element'
                    key={element.name} 
                >
                <strong>{element.symbol}</strong>
                </div>
            ))}
        </div>
    </>
    
  )
}

export default Table