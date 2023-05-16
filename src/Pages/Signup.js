import React, { useState } from "react";
import Layout from "../Components/Layout";
import { Link, useNavigate } from "react-router-dom";
import Space from "../Assets/Img/Space.jpg";
import reactIcon from "../Assets/Img/reactIcon.png";
import { useDispatch } from "react-redux";
import {
  auth,
  database,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "../Firebase/config";
import { child, get, ref, set } from "firebase/database";
import { AutenticarUsuario } from "../Redux/actions/authActions";

const Signup = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const dbRef = ref(database);

  const register = async (e) => {
    e.preventDefault();
    if (!username || !email || !password)
      return alert("Rellene todos los campos");

    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) =>
        set(ref(database, `/usuarios/${authUser.user.uid}`), {
          id: authUser.user.uid,
          username: username,
          email: email,
          isAdmin: false,
        }).then(() =>
          setPersistence(auth, browserSessionPersistence).then(() => {
            return signInWithEmailAndPassword(auth, email, password)
              .then(async (authUser) => {
                await setUser(authUser.user);
                get(child(dbRef, `/usuarios/${authUser.user.uid}`))
                  .then((snapshot) => {
                    if (snapshot.exists()) {
                      disptach(AutenticarUsuario(snapshot.val()));
                      navigate("/");
                    } else {
                      console.log("No data available", snapshot.val());
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              })
              .catch((err) => alert(err.message));
          })
        )
      )
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <Layout>
        <div className="login-container">
          <div className="login-main">
            <div className="form-card-container">
              <div className="form-card">
                <h1 className="">Crea tu cuenta</h1>
                <form>
                  <div className="container-inputs">
                    <div className="input-container">
                      <label htmlFor="username">Nombre de usuario</label>
                      <input
                        id="username"
                        className="form-input"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="input-container">
                      <label htmlFor="email">Correo Electronico</label>
                      <input

                        id="email"
                        className="form-input"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="input-container">
                      <label htmlFor="password">Contraseña</label>
                      <input
                        id="password"
                        className="form-input"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="container-login-buttons">
                    <div className="mr-1">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          required
                        />
                        <span className="text-sm ml-2">
                          Acepto terminos y condiciones.
                        </span>
                      </label>
                    </div>
                    <button
                      className="btn pointer bg-black text-[#AEE200] hover:bg-[#AEE200] hover:text-black ml-3"
                      onClick={register}
                    >
                      Registrarse
                    </button>
                  </div>
                </form>
                <div className="container-register-buttons">
                  <div>
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/login">Inicia sesion</Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="space-image" aria-hidden="true">
              <img src={Space} alt="Authentication" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Signup;
