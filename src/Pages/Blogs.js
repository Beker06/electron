import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import blogDefault from "../Assets/Img/blogDefault.png";
import arrowIconLeft from "../Assets/Img/arrowIconLeft.png"
import "../Styles/blog.css";
import { useNavigate } from "react-router-dom";
import { child, get, ref } from "firebase/database";
import { database } from "../Firebase/config";
import AOS from "aos";
import "aos/dist/aos.css";
import { UseThemeContext } from "../context/themeContext";

const Blogs = () => {
  const { isDarkMode } = UseThemeContext();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [Cards, setCards] =useState([])
  const dbRef = ref(database);
  const [busqueda, setBusqueda] = useState("");

  const getBlogs = async () => {
    await get(child(dbRef, `blogs`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCards(
            Object.keys(snapshot.val()).map((key) => snapshot.val()[key])
          );
          setBlogs(
            Object.keys(snapshot.val()).map((key) => snapshot.val()[key])
          );
          
        } else {
          console.log("No hay blogs");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value)
    filtar(e.target.value)
};

const filtar = (termino) => {
    var resultadoBusqueda = Cards.filter((elemento) => {
        if (elemento.titulo.toString().toLowerCase().includes(termino.toLowerCase()) || elemento.autor.toString().toLowerCase().includes(termino.toLowerCase())) {
            return elemento;
        }
    })
    setBlogs(resultadoBusqueda)
}

const cleanInput = () => {
  setBusqueda("")
  filtar("")
}

  useEffect(() => {
    AOS.init();
    getBlogs();
  }, []);

  return (
    <>
      <Layout>
        <div className="blog-main-container">
          <div className="blog-button-container flex">
            <div className="mx-auto font-[100] hidden w-full mr-5 md:flex">
              <input
                className={`p-1 w-full indent-2 border-slate-300 border rounded-sm focus:outline ${isDarkMode ? "bg-[#242526]" : ""}`}
                placeholder="Buscar articulo"
                value={busqueda}
                onChange={handleChange}
              />
              <button
                className="rounded rounded-tl-none ml-[-5px] rounded-bl-none text-white border border-black bg-black hover:bg-white hover:text-black p-3 text-sm "
                onClick={() => cleanInput()}
                type="submit"
              >
                <span className="text-[32px] font-bold">{"←"}</span>
              </button>
            </div>
            <div
              className="add-blog-button"
              onClick={() => navigate("/addblog")}
            >
              <label>+</label>
              <span>Agregar Blog</span>
            </div>
          </div>
          <div className="cards-container">
            {blogs &&
              blogs.map((posts, index) => (
                <div
                  data-aos="zoom-in"
                  data-aos-delay={50 * index}
                  key={posts.id}
                >
                  <div
                    className={`card ${isDarkMode ? "dark" : "light"} pointer`}
                    onClick={() => navigate(`/blogs/${posts.id}`)}
                  >
                    {posts.coverPicture ? (
                      <div className="card-image">
                        <img
                          width={300}
                          height={300}
                          src={posts.coverPicture}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="flex w-[100%] h-[65%] items-center justify-center overflow-hidden opacity-10">
                        <img
                          width={100}
                          height={100}
                          src={blogDefault}
                          alt=""
                        />
                      </div>
                    )}
                    <div className="card-info-container">
                      <div className="card-info-title">{posts.titulo}</div>
                      <div className="card-info-text">{posts.autor}</div>
                      <div className="card-info-text">{posts.fecha}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Blogs;
