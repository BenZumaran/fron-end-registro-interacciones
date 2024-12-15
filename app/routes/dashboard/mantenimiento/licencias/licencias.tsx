import { useEffect, useState } from "react";
import type { Route } from "./+types/empresas";
import { Link, useNavigate } from "react-router";

export async function loader() {
  const res = await fetch("http://localhost:8090/api/v1/licencia/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de licencias");
  }
  const data = await res.json();

  const resTipo = await fetch("http://localhost:8090/api/v1/tipo/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de tipos");
  }
  const tipo = await resTipo.json();

  const resEmpresa = await fetch("http://localhost:8090/api/v1/empresa/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de empresas");
  }
  const empresa = await resEmpresa.json();

  const resUsuario = await fetch("http://localhost:8090/api/v1/usuario/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de usuarios");
  }
  const usuario = await resUsuario.json();

  return { data: data, tipo: tipo, empresa: empresa, usuario: usuario };
}

export default function Usuarios({ loaderData }: { loaderData: any }) {
  const navigate = useNavigate();

  function modal(numItem: number) {
    const modalElement = document.getElementById("default-modal");
    modalElement?.classList.toggle("hidden");
    if (numItem === -1) {
      const formElement = document.getElementById(
        "formAgregarLicencia"
      ) as HTMLFormElement | null;
      formElement?.reset();
      return;
    }
  }

  async function handleSubmitRegistraLicencia(event: any) {
    event.preventDefault();
    const date = new Date(event.target.fecha.value).toISOString().slice(0, 19);
    const dateAhora = new Date().toISOString().slice(0, 19);
    const res = await fetch("http://localhost:8090/api/v1/licencia/registra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rucEmpresa: {
          rucEmpresa: event.target.empresa.value,
        },
        idUsuario: {
          idUsuario: event.target.usuario.value,
        },
        idTipo: {
          idTipo: event.target.tipo.value,
        },
      }),
    });

    if (res.ok) {
      alert("Se ha agregado licencia correctamente");
      document.getElementById("formAgregarLicencia")?.reset();
      const modalElement = document.getElementById("default-modal");
      modalElement?.classList.toggle("hidden");
      navigate(0);
    } else {
      alert("Error al agregar licencia");
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
              <button
                onClick={() => modal(0)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Agregar
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Número
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Empresa
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Usuario
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Tipo
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Fecha Creacion
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Fecha Vencimiento
                  </th>
                </tr>
              </thead>
              <tbody>
                {loaderData.data &&
                  loaderData.data.map((licencia: any, index: number) => (
                    <tr className="border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {licencia.numLicencia}
                      </th>
                      <td className="px-4 py-3">
                        {licencia.rucEmpresa.razonSocialEmpresa}
                      </td>
                      <td className="px-4 py-3">
                        {licencia.idUsuario.nombreUsuario}
                      </td>
                      <td className="px-4 py-3">
                        {licencia.idTipo.descripcionTipo}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(licencia.fechaCreacion).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(licencia.fechaVencimiento).toLocaleString()}
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
                Agregar Licencia
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
                <form
                  className="space-y-4 md:space-y-6"
                  method="POST"
                  id="formAgregarLicencia"
                  onSubmit={handleSubmitRegistraLicencia}
                >
                  <div>
                    <label
                      htmlFor="empresa"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Empresa
                    </label>
                    <select
                      id="empresa"
                      name="empresa"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Elegir Empresa</option>
                      {loaderData.empresa &&
                        loaderData.empresa.map((empresa: any) => (
                          <option
                            key={empresa.rucEmpresa}
                            value={empresa.rucEmpresa}
                          >
                            {empresa.razonSocialEmpresa}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="tipo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Usuario
                    </label>
                    <select
                      id="usuario"
                      name="usuario"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Elegir Usuario</option>
                      {loaderData.tipo &&
                        loaderData.usuario.map((usuario: any) => (
                          <option
                            key={usuario.idUsuario}
                            value={usuario.idUsuario}
                          >
                            {usuario.nombreUsuario}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="tipo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tipo Licencia
                    </label>
                    <select
                      id="tipo"
                      name="tipo"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Tipo de Licencia</option>
                      {loaderData.tipo &&
                        loaderData.tipo.map((tipo: any) => (
                          <option key={tipo.idTipo} value={tipo.idTipo}>
                            {tipo.descripcionTipo}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="fecha"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Fecha de Vencimiento
                    </label>
                    <input
                      type="date"
                      name="fecha"
                      id="fecha"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                  >
                    Registrar Licencia
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
