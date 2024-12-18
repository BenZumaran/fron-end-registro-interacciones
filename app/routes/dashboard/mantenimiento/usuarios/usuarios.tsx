import { useEffect, useState } from "react";
import type { Route } from "./+types/empresas";
import { Link, useNavigate } from "react-router";

export async function loader() {
  const res = await fetch("http://localhost:8090/api/v1/usuario/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de usuarios");
  }
  const data = await res.json();

  const resTipo = await fetch("http://localhost:8090/api/v1/tipo/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de tipos");
  }
  const tipo = await resTipo.json();
  return { data: data, tipo: tipo };
}

export default function Usuarios({ loaderData }: { loaderData: any }) {
  const [dataUsuarios, setDataUsuarios] = useState(loaderData.data);

  const navigate = useNavigate();

  function modal(numItem: number) {
    const modalElement = document.getElementById("default-modal");
    modalElement?.classList.toggle("hidden");

    if (numItem === -1) {
      const formElement = document.getElementById(
        "formRegistroUsuario"
      ) as HTMLFormElement | null;
      formElement?.reset();
      return;
    }

    const idUsuarioElement = document.getElementById(
      "idUsuario"
    ) as HTMLInputElement;
    idUsuarioElement.value = loaderData.data[numItem].idUsuario;
    const nombreElement = document.getElementById("nombre") as HTMLInputElement;
    nombreElement.value = loaderData.data[numItem].nombreUsuario;
    const correoElement = document.getElementById("correo") as HTMLInputElement;
    correoElement.value = loaderData.data[numItem].correoUsuario;
    const fechaNacimientoElement = document.getElementById(
      "fechaNacimiento"
    ) as HTMLInputElement;
    fechaNacimientoElement.value =
      loaderData.data[numItem].fechaNacimientoUsuario;
    const telefonoElement = document.getElementById(
      "telefono"
    ) as HTMLInputElement;
    telefonoElement.value = loaderData.data[numItem].telefonoUsuario;
    const claveElement = document.getElementById("clave") as HTMLInputElement;
    claveElement.value = loaderData.data[numItem].telefonoUsuario;
    const confirmarClaveElement = document.getElementById(
      "confirmarClave"
    ) as HTMLInputElement;

    confirmarClaveElement.value = loaderData.data[numItem].telefonoUsuario;
    const activoElement = document.getElementById("activo") as HTMLInputElement;
    loaderData.data[numItem].estadoUsuario &&
      ((activoElement.value = "1"), (activoElement.checked = true));
    const sElement = document.getElementById("sUsu") as HTMLInputElement;
    sElement.value = loaderData.data[numItem].saltUsuario;
    const tipoElement = document.getElementById("tipo") as HTMLInputElement;
    tipoElement.value = loaderData.data[numItem].tipoUsuario.idTipo;
  }

  async function handleSubmitActualizaUsuario(event) {
    const date = new Date(event.target.fechaNacimiento.value);
    let dia = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let mes =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let anio = date.getFullYear();
    let userDate = anio + "-" + mes + "-" + dia;
    event.preventDefault();
    const res = await fetch("http://localhost:8090/api/v1/usuario/registra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUsuario: event.target.idUsuario.value,
        nombreUsuario: event.target.nombre.value,
        correoUsuario: event.target.correo.value,
        claveUsuario: event.target.clave.value,
        telefonoUsuario: event.target.telefono.value,
        saltUsuario: event.target.sUsu.value,
        fechaNacimientoUsuario: userDate,
        tipoUsuario: {
          idTipo: event.target.tipo.value,
        },
        estadoUsuario: event.target.activo.checked,
      }),
    });

    if (res.ok) {
      alert("Usuario actualizado correctamente");
      document.getElementById("formRegistroUsuario")?.reset();
      const modalElement = document.getElementById("default-modal");
      modalElement?.classList.toggle("hidden");
      navigate(0);
    } else {
      alert("Error al actualizar usuario");
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <Link
                to="/dashboard/mantenimiento/usuarios/registro"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Agregar
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    idUsuario
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Nombre Usuario
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Correo Usuario
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Tipo Usuario
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataUsuarios &&
                  dataUsuarios.map((usuario: any, index: number) => (
                    <tr className="border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {usuario.idUsuario}
                      </th>
                      <td className="px-4 py-3">{usuario.nombreUsuario}</td>
                      <td className="px-4 py-3">{usuario.correoUsuario}</td>
                      <td className="px-4 py-3">
                        {usuario.tipoUsuario.descripcionTipo}
                      </td>
                      <td className="px-4 py-3">
                        {usuario.estadoUsuario === true ? (
                          <button
                            type="button"
                            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          >
                            Activo
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          >
                            Inactivo
                          </button>
                        )}

                        <button
                          type="button"
                          className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                          onClick={() => modal(index)}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/*
          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white">
                1-10
              </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
          */}
        </div>
      </div>

      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full h-full md:inset-0 h-[calc(100%-1rem)]"
        style={{
          position: "fixed",
          padding: "10vh 28vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Editar Usuario
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
                onClick={() => modal(-1)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="mx-auto my-10 h-fit w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 h-fit">
                <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Actualiza Usuario
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  method="POST"
                  id="formRegistroUsuario"
                  onSubmit={handleSubmitActualizaUsuario}
                >
                  <div>
                    <label
                      htmlFor="idUsuario"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      ID Usuario
                    </label>
                    <input
                      type="text"
                      name="idUsuario"
                      id="idUsuario"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="TAMAÑO : 6"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nombres del Usuario
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      placeholder="Nombre y Apellido genérico"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="correo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Correo del usuario
                    </label>
                    <input
                      type="email"
                      name="correo"
                      id="correo"
                      placeholder="ejemplo@empresa.com.pe"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="fechaNacimiento"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      name="fechaNacimiento"
                      id="fechaNacimiento"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="telefono"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Telefono del Usuario
                    </label>
                    <input
                      type="number"
                      name="telefono"
                      id="telefono"
                      placeholder="987548452"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="clave"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Clave de usuario
                    </label>
                    <input
                      type="password"
                      name="clave"
                      id="clave"
                      placeholder="*********"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <input type="hidden" value={""} name="sUsu" id="sUsu" />
                  <div>
                    <label
                      htmlFor="confirmarClave"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Clave de usuario
                    </label>
                    <input
                      type="password"
                      name="confirmarClave"
                      id="confirmarClave"
                      placeholder="*********"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="tipo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tipo Usuario
                    </label>
                    <select
                      id="tipo"
                      name="tipo"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Tipo de Usuario</option>
                      {loaderData.tipo &&
                        loaderData.tipo.map((tipo) => (
                          <option key={tipo.idTipo} value={tipo.idTipo}>
                            {tipo.descripcionTipo}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="activo"
                        name="activo"
                        value={0}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Activo
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                  >
                    Actualizar Usuario
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
