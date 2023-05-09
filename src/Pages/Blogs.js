import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import blogDefault from "../Assets/Img/blogDefault.png";
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
  const [preblogs, setPreblogs] = useState([]);
  const dbRef = ref(database);

  const getPreBlogs = async () => {
    await get(child(dbRef, `preblogs`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPreblogs(
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

  useEffect(() => {
    AOS.init();
    getPreBlogs();
  });

  return (
    <>
      <Layout>
        <div className="blog-main-container">
          <div className="blog-button-container">
            <div className="add-blog-button" onClick={() => navigate("/addblog")}>
                <label>+</label>
                <span>Agregar Blog</span>
            </div>
          </div>
          <div className="cards-container">
            {preblogs &&
              preblogs.map((posts, index) => (
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
