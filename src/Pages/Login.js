import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../Styles/login.css"
import Layout from '../Components/Layout'
import Space from '../Assets/Img/Space.jpg'
import reactIcon from "../Assets/Img/reactIcon.png"

const Login = () => {
    const navigate = useNavigate()

    return (
        <>
            <Layout>
                <div className="login-container">
                    <div className="login-main">
                        <div className="form-card-container">
                            <div className='form-card'>
                                <h1 className="">Bienvenido</h1>
                                <form>
                                    <div className="container-inputs">
                                        <div className='input-container'>
                                            <label htmlFor="email">
                                                Correo Electronico
                                            </label>
                                            <input
                                                id="email"
                                                className="form-input"
                                                type="email"
                                            // onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className='input-container'>
                                            <label htmlFor="password">
                                                Contraseña
                                            </label>
                                            <input
                                                id="password"
                                                className="form-input"
                                                type="password"
                                                autoComplete="on"
                                            // onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="container-login-buttons">
                                        <div className="mr-1">
                                            <Link
                                                className="text-sm underline hover:no-underline"
                                                to="/forgot"
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        </div>
                                        <button
                                            className="btn pointer bg-black text-[#AEE200] hover:bg-[#AEE200] hover:text-black ml-3"
                                        // onClick={signIn}
                                        >
                                            Inicia sesion
                                        </button>
                                    </div>
                                </form>
                                <div className="container-register-buttons pt-5 mt-6 border-t border-slate-200">
                                    <div className="text-sm">
                                        ¿No tienes una cuenta?{" "}
                                        <Link
                                            className="font-medium text-black underline hover:text-[#AEE200] hover:no-underline"
                                            to="/signup"
                                        >
                                            Registrate
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Image */}
                        <div
                            className="space-image"
                            aria-hidden="true"
                        >
                            <img src={Space}
                                alt="Authentication"
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Login