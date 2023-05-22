import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import GetBlogData from "../Hooks/GetBlogData.hook";
import arrowIconLeft from "../Assets/Img/arrowIconLeft.png";
import { UseThemeContext } from "../context/themeContext";
import "../Styles/blogDocument.css";

const BlogDocument = () => {
  const { id } = useParams();
  const { blogData, fetchBlogData } = GetBlogData();
  const { isDarkMode } = UseThemeContext();
  const navigate = useNavigate()

  useEffect(() => {
    fetchBlogData(id);
  });

  return (
    <Layout>
      <div className="relative">
        <button className="absolute w-11 h-11 ml-10" onClick={() => navigate("/blogs")}>
          <img src={arrowIconLeft} alt="Flecha-back" />
        </button>
      </div>
      <div className={`document-container ${isDarkMode ? "dark" : "light"}`}>
        <div className="title-container">{blogData?.titulo}</div>
        <div className="document-info">
          <div className="document-autor">
            Escrito por: <span>{blogData?.autor}</span>
          </div>
          <div>{blogData?.fecha}</div>
        </div>
        <img src={blogData.coverPicture} alt="" />
        <div className="document-contenido">{blogData.contenido}</div>
      </div>
    </Layout>
  );
};

export default BlogDocument;
