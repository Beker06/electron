import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UseThemeContext } from '../../context/themeContext';
import { child, get, ref } from 'firebase/database';
import { database } from '../../Firebase/config';
import Aos from 'aos';
import "aos/dist/aos.css";
import "../../Styles/blogspanel.css"

const BlogsPanel = () => {

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
    Aos.init();
    getPreBlogs();
  });

  return (
    <>
      <div className='main'>
        <div className='blogspanel-main-container'>
          <div>
            <h1>Blogs</h1>
          </div>
          <div className='blogspanel-table'>
            <header>
              <h2>
                Todos los blogs:{" "}
                <span>{preblogs.length}</span>
              </h2>
            </header>
            <div>
              <div className='table-panel-container'>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <div>ID</div>
                      </th>
                      <th>
                        <div>Titulo</div>
                      </th>
                      <th>
                        <div>Autor</div>
                      </th>
                      <th>
                        <div>Fecha</div>
                      </th>
                      <th>
                        <div>{"    "}</div>
                      </th>
                    </tr>
                  </thead>
                  {preblogs.length > 0 ? (
                    <tbody>
                      {preblogs.map((preblog, index) => (
                        <tr
                          key={preblog.id}
                        >
                          <td><div>{preblog.id}</div></td>
                          <td><div>{preblog.titulo}</div></td>
                          <td><div>{preblog.autor}</div></td>
                          <td><div>{preblog.fecha}</div></td>
                          <td><div><button>Ver</button></div></td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <>
                      <th className=""></th>
                      <th className=""></th>
                      <th className="">
                        <div className="">
                          No hay blogs para revisar
                        </div>
                      </th>
                      <th className=""></th>
                      <th className="">
                        <div className=""></div>
                      </th>
                    </>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogsPanel