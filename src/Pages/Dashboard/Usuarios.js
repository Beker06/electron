import React from "react";
import Layout from "../../Components/Layout";
import SidebarAdmin from "../../Components/Dashboard/SidebarAdmin";
import UsersPanel from "../../Components/Dashboard/UsersPanel";
import "../../Styles/dashboard.css"


const Usuarios = () => {
  return (
    <Layout>
      <div className="dashboard-main-container">
        <SidebarAdmin />
        <UsersPanel />
      </div>
    </Layout>
  );
};

export default Usuarios;
