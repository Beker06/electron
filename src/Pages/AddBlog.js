import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useSelector } from "react-redux";
import { ref, set } from "firebase/database";
import { database, storage } from "../Firebase/config";
import "../Styles/addBlog.css";
import { v4 } from "uuid";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadBytes, ref as refStore, getDownloadURL } from "firebase/storage";

const AddBlog = () => {
  const dbuser = useSelector((state) => state.usuario.user);
  const [imgCodified, setImgCodified] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverPicture, setCoverPicure] = useState(null);

  dayjs.locale("es");

  const subirBlog = async (e) => {
    e.preventDefault();
    if (!title || !content)
      return toast.warn("Debe llenar todos los campos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    const idBlog = v4();
    const coverPictureUrl = await uploadFile(coverPicture);

    if (dbuser.isAdmin === true) {
      try {
        set(ref(database, `blogs/blog-${idBlog}`), {
          id: "blog-" + idBlog,
          titulo: title,
          contenido: content,
          autor: dbuser.username,
          fecha: dayjs().format("DD-MMM-YYYY"),
          coverPicture: coverPictureUrl,
        });
        toast.success("El articulo ha sido subido correctamente", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
        setTitle("");
        setContent("");
        setCoverPicure(null);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    } else {
      try {
        set(ref(database, `preblogs/blog-${idBlog}`), {
          id: "blog-" + idBlog,
          titulo: title,
          contenido: content,
          autor: dbuser.username,
          fecha: dayjs().format("DD-MMM-YYYY"),
          coverPicture: coverPictureUrl,
        });
        toast.success("El articulo será revisado antes de publicarse", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
        setTitle("");
        setContent("");
        setCoverPicure(null);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  };

  const handlePreview = async (e) => {
    await setCoverPicure(e.target.files[0]);
  };

  const createPreview = async (file) => {
    const reader = new FileReader();
    const blob = new Blob([file]);
    await reader.readAsDataURL(blob);
    reader.onload = () => {
      const imgUrl = reader.result;
      setImgCodified(imgUrl);
    };
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  async function uploadFile(file) {
    const storageRef = refStore(storage, `Portadas/${v4()}`);
    await uploadBytes(storageRef, file);
    const urlCover = await getDownloadURL(storageRef);
    return urlCover;
  }

  useEffect(() => {
    createPreview(coverPicture);
  }, [coverPicture]);

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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="content">Contenido</label>
                    <textarea
                      id="content"
                      className="form-textarea"
                      type="text"
                      value={content}
                      onChange={handleContentChange}
                    />
                  </div>
                  <div className="input-image-container">
                    <input
                      accept="image/png,image/jpeg,image/jpg"
                      type="file"
                      name="coverPicture"
                      id="coverPicture"
                      alt="si"
                      onChange={handlePreview}
                    />
                  </div>
                  {coverPicture ? (
                    <div
                      className="image-preview"
                      style={{
                        backgroundImage: "url(" + imgCodified + ")",
                      }}
                    ></div>
                  ) : null}
                </div>
                <div className="container-login-buttons">
                  <button className="btn pointer" onClick={subirBlog}>
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
