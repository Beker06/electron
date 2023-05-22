import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { child, get, ref, set } from 'firebase/database';
import { database } from '../../Firebase/config';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserAuth } from '../../context/AuthContext';

const BlogsPanel = () => {
  const navigate = useNavigate();
  const { setLoading, loading } = UserAuth()
  const [preblogs, setPreblogs] = useState([]);
  const [blogModal, setBlogModal] = useState({})
  const dbRef = ref(database);
  const [showModal, setShowModal] = useState(false)

  const getPreBlogs = () => {
    get(child(dbRef, `preblogs`))
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
  }

  const abrirModal = (blog) => {
    setBlogModal(blog)
    setShowModal(true)
  }

  const handleAprobar = async (e) => {
    e.preventDefault()
    try {
      set(ref(database, `blogs/${blogModal.id}`), {
        id: blogModal.id,
        titulo: blogModal.titulo,
        contenido: blogModal.contenido,
        autor: blogModal.autor,
        fecha: blogModal.fecha,
        coverPicture: blogModal.coverPicture,
      });
      toast.success("El Blog ha sido aprobado", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
      await handleEliminar(blogModal.id)
    } catch (error) {
      console.log(error)
      toast.error("No se pudo aprobar el blog", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }

  }

  const handleEliminar = async (blogID) => {
    try {
      set(ref(database, `/preblogs/${blogID}`), {});
      setLoading(!loading);
      setShowModal(false);
      await getPreBlogs();
    } catch (error) {
      console.log(error)
      toast.error("Error al eliminar el blog", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }

  }

  useEffect(() => {
    getPreBlogs()
  }, [loading]);

  return (
    <>
      <div className='flex w-[80%]'>
        <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
          <div className="mb-4 sm:mb-0">
            <h1 className='text-2xl md:text-3xl text-slate-800 font-bold my-3'>
              Blogs
            </h1>
          </div>
          <div className='bg-white shadow-lg rounded-sm border border-slate-200 relative'>
            <header className='px-5 py-4'>
              <h2 className="font-semibold text-slate-800">
                Todos los blogs:{" "}
                <span className="text-slate-400 font-medium">{preblogs.length}</span>
              </h2>
            </header>
            <div>
              <div className='overflow-x-auto'>
                <table className='table-auto w-full'>
                  <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                    <tr>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-center">ID</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">Titulo</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">Autor</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">Fecha</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-center">Acciones</div>
                      </th>
                    </tr>
                  </thead>
                  {preblogs.length !== 0 ? (
                    <tbody className="text-sm divide-y divide-slate-200">
                      {preblogs.map((preblog, index) => (
                        <tr
                          key={preblog.id}
                        >
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div className="text-left">{preblog.id}</div></td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div className="text-left">{preblog.titulo}</div></td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div className="text-left">{preblog.autor}</div></td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div className="text-left">{preblog.fecha}</div></td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div className="text-left"><button onClick={() => abrirModal(preblog)} className='bg-black w-full h-[24px] border border-black text-white hover:bg-white hover:text-slate-500 rounded'>Ver</button></div></td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td className=""></td>
                        <td className=""></td>
                        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            No hay blogs para revisar
                          </div>
                        </td>
                        <td className=""></td>
                        <td className="">
                          <div className="font-semibold text-left"></div>
                        </td>
                      </tr>

                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-h-[80vh] bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl mr-8 font-semibold text-[#000]">
                    {blogModal.titulo}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <label className="text-black h-6 w-6 text-2xl block outline-none cursor-pointer focus:outline-none">
                      ×
                    </label>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-4 flex flex-col overflow-y-auto">
                  <div className="document-info">
                    <div className="document-autor">
                      Escrito por: <span>{blogModal?.autor}</span>
                    </div>
                    <div>{blogModal?.fecha}</div>
                  </div>
                  <img src={blogModal.coverPicture} alt="" />
                  <div className="document-contenido">{blogModal.contenido}</div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-2  border-t border-slate-200 rounded-b">
                  <button
                    className="text-[#fff] bg-[#b91c1c] rounded-md border border-[#b91c1c] hover:bg-[#fff] hover:text-[#b91c1c] font-normal uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleEliminar(blogModal.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="text-[#fff] bg-[#65a30d] rounded-md border border-[#65a30d] hover:bg-[#fff] hover:text-[#65a30d] font-normal uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAprobar}
                  >
                    Subir
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (null)}
    </>
  )
}

export default BlogsPanel