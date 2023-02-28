import './Styles/table.css'
import './Styles/navbar.css'
import './Styles/sidebar.css'
import './index.css'
import Layout from "./Components/Layout";
import Table from "./Components/Table";
import Sidebar from './Components/Sidebar';
import data from "./Data/Periodic-Table-JSON.json"

function App() {
  return (
    <>
      <Layout>
      <div className="main-container" >
          <div className='main-col'>
            <h1>Periodic Table of Elements</h1>
            <div className='main-table-container'>
              <Table/>
            </div>
          </div>
          <Sidebar/>
        </div>
      </Layout>
    </>
  );
}

export default App;
