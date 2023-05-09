import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { useParams } from "react-router-dom";
import GetBlogData from "../Hooks/GetBlogData.hook";
import { UseThemeContext } from "../context/themeContext";
import "../Styles/blogDocument.css";

const BlogDocument = () => {
  const { id } = useParams();
  const { blogData, fetchBlogData } = GetBlogData();
  const { isDarkMode } = UseThemeContext();

  useEffect(() => {
    fetchBlogData(id);
  });

  return (
    <Layout>
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
