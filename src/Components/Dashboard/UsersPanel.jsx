import React, { useEffect, useState } from 'react'
import { child, get, ref, set, update } from 'firebase/database';
import { database } from '../../Firebase/config';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserAuth } from '../../context/AuthContext';

const UsersPanel = ({dbuser}) => {
  const { setLoading, loading } = UserAuth()
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const dbRef = ref(database);

  const filtrarUsers = () => {
    setUsers(allUsers?.filter(allUser => allUser?.id !== dbuser?.id ));
  }

  const getUsuarios = () => {
    get(child(dbRef, `usuarios`)) 
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAllUsers(
            Object.keys(snapshot.val()).map((key) => snapshot.val()[key])
          );
        } else {
          console.log("No hay usuarios");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const changeRol = (user) => {
    update(ref(database, `/usuarios/${user.id}`),{
      isAdmin: user.isAdmin ? false : true,
    }).then(() => {
      setLoading(!loading);
      toast.success(`Se cambió el rol de ${user.username} correctamente`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }).catch((error) => {
      toast.error(`No se pudo cambiar el rol ${user.username}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
      console.log(error)
    })
  }

  useEffect(() => {
    filtrarUsers()
  }, [allUsers])

  useEffect(() => {
    getUsuarios()
  }, [loading]);

  return (
    <>
      <div className='flex w-[80%]'>
        <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
          <div className="mb-4 sm:mb-0">
            <h1 className='text-2xl md:text-3xl text-slate-800 font-bold my-3'>
              Usuarios
            </h1>
          </div>
          <div className='bg-white shadow-lg rounded-sm border border-slate-200 relative'>
            <header className='px-5 py-4'>
              <h2 className="font-semibold text-slate-800">
                Todos los usuarios:{" "}
                <span className="text-slate-400 font-medium">{users.length}</span>
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
                        <div className="font-semibold text-left">Nombre de usuario</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">Correo electronico</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-left">Rol</div>
                      </th>
                      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className="font-semibold text-center">Acciones</div>
                      </th>
                    </tr>
                  </thead>
                  {users ? (
                    <tbody className="text-sm divide-y divide-slate-200">
                      {users.map((user, index) => (
                        <tr
                          key={user.id}
                        >
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div className="text-left">{user.id}</div></td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div className="text-left">{user.username}</div></td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div className="text-left">{user.email}</div></td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div className="text-left">
                              {user.isAdmin ? ("Administrador") : ("Usuario")}
                            </div>
                          </td>
                          <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div className="text-left">
                              <button 
                                className='bg-black w-full h-[24px] border border-black text-white hover:bg-white hover:text-slate-500 rounded'
                                onClick={()=> changeRol(user)}
                              >
                                Cambiar Rol
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (null)}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UsersPanel