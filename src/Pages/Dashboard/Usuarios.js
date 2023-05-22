import React from "react";
import Layout from "../../Components/Layout";
import SidebarAdmin from "../../Components/Dashboard/SidebarAdmin";
import UsersPanel from "../../Components/Dashboard/UsersPanel";
import "../../Styles/dashboard.css"
import { useSelector } from "react-redux";


const Usuarios = () => {
  const dbuser = useSelector(state => state.usuario.user)
  return (
    <Layout>
      <div className="dashboard-main-container">
        <SidebarAdmin />
        <UsersPanel dbuser={dbuser}/>
      </div>
    </Layout>
  );
};

export default Usuarios;
