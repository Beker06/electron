import React, { useState } from "react";
import Layout from "../Components/Layout";
import Sidebar from "../Components/Sidebar";
import Table from "../Components/Table";
import { UseThemeContext } from "../context/themeContext";
import data from "../Data/Periodic-Table-JSON.json";

const PeriodicTable = () => {
  const { isDarkMode } = UseThemeContext();

  const [selectElement, setSelectElement] = useState(null);
  return (
    <>
      <Layout>
        <div className={`main-container ${isDarkMode && "main-dark"}`}>
          <div className="main-col">
            <h1>Tabla Periódica de los Elementos</h1>
            <div className="main-table-container">
              <Table
                element={data.elements}
                onSelectElement={setSelectElement}
              />
            </div>
          </div>
          {selectElement && (
            <Sidebar
              number={selectElement.number}
              name={selectElement.name}
              image={selectElement.bohr_model_image}
              symbol={selectElement.symbol}
              atomic_mass={selectElement.atomic_mass}
              densidad={selectElement.density}
              ebullicion={selectElement.boil}
              fusion={selectElement.melt}
              category={selectElement.category}
              discovered={selectElement.discovered_by}
              descripcion={selectElement.summary}
              phase={selectElement.phase}
              periodo={selectElement.period}
              grupo={selectElement.group}
              configuracion={selectElement.electron_configuration}
              electronegatividad={selectElement.electronegativity_pauling}
            />
          )}
        </div>
      </Layout>
    </>
  );
};

export default PeriodicTable;
