import React, { useState } from "react";
import Layout from "../Components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserAuth } from "../context/AuthContext";
import { child, get, ref } from "firebase/database";
import {
  auth,
  browserSessionPersistence,
  database,
  setPersistence,
  signInWithEmailAndPassword,
} from "../Firebase/config";
import { AutenticarUsuario } from "../Redux/actions/authActions";
import "../Styles/addBlog.css"

const AddBlog = () => {
  const navigate = useNavigate();
  const disptach = useDispatch();
  const { setDbuser } = UserAuth();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dbRef = ref(database);

  const signIn = (e) => {

  };

  return (
    <>
      <Layout>
        <div className="addblog-main">
          <div className="form-card-container-addblog">
            <div className="form-card-addblog">
              <h1 className="">Crea un Blog</h1>
              <form>
                <div className="container-inputs">
                  <div className="input-container">
                    <label htmlFor="title">Titulo</label>
                    <input
                      id="title"
                      className="form-input"
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="content">Contenido</label>
                    <textarea
                      id="content"
                      className="form-textarea"
                      type="text"
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>
                <div className="container-login-buttons">
                  <button
                    className="btn pointer bg-black text-[#AEE200] hover:bg-[#AEE200] hover:text-black ml-3"
                    onClick={signIn}
                  >
                    Subir blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddBlog;
