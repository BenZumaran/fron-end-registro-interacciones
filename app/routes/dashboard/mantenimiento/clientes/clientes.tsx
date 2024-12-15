import { useEffect, useState } from "react";
import type { Route } from "./+types/empresas";
import { Link, useNavigate } from "react-router";

export async function loader() {
  const res = await fetch("http://localhost:8090/api/v1/cliente/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de clientes");
  }
  const data = await res.json();

  const resTipo = await fetch("http://localhost:8090/api/v1/tipo/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de tipos");
  }
  const tipo = await resTipo.json();

  const resEmpresa = await fetch("http://localhost:8090/api/v1/empresa/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de tipos");
  }
  const empresa = await resEmpresa.json();
  return { data: data, tipo: tipo, empresa };
}

export default function Usuarios({ loaderData }: { loaderData: any }) {
  const navigate = useNavigate();

  function modal(numItem: number) {
    const modalElement = document.getElementById("default-modal");
    modalElement?.classList.toggle("hidden");

    if (numItem === -1) {
      const formElement = document.getElementById(
        "formActualizaCliente"
      ) as HTMLFormElement | null;
      formElement?.reset();
      return;
    }

    let element = document.getElementById("numCliente") as HTMLInputElement;
    element.value = loaderData.data[numItem].numCliente || "";
    element = document.getElementById("nombre") as HTMLInputElement;
    element.value = loaderData.data[numItem].nombresCliente || "";
    element = document.getElementById("correo") as HTMLInputElement;
    element.value = loaderData.data[numItem].correoCliente || "";
    element = document.getElementById("fechaNacimiento") as HTMLInputElement;
    element.value = loaderData.data[numItem].fechaNacimientoCliente || "";
    element = document.getElementById("telefono") as HTMLInputElement;
    element.value = loaderData.data[numItem].telefonoCliente || "";
    element = document.getElementById("tipoDocumento") as HTMLInputElement;
    element.value = loaderData.data[numItem].tipoDocumentocliente?.idTipo || -1;
    element = document.getElementById("numeroDocumento") as HTMLInputElement;
    element.value = loaderData.data[numItem].documentoCliente || "";
    element = document.getElementById("empresa") as HTMLInputElement;
    element.value = loaderData.data[numItem].empresaCliente.rucEmpresa || "";
  }

  async function handleSubmitActualizaCliente(event) {
    const date = new Date(event.target.fechaNacimiento.value);
    let dia = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let mes =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let anio = date.getFullYear();
    let clienteDate = anio + "-" + mes + "-" + dia;
    event.preventDefault();
    const res = await fetch("http://localhost:8090/api/v1/cliente/registra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        numCliente: event.target.numCliente.value,
        tipoDocumentocliente: {
          idTipo: event.target.tipoDocumento.value,
        },
        documentoCliente: event.target.numeroDocumento.value,
        nombresCliente: event.target.nombre.value,
        fechaNacimientoCliente: clienteDate,
        correoCliente: event.target.correo.value,
        telefonoCliente: event.target.telefono.value,
        empresaCliente: {
          rucEmpresa: event.target.empresa.value,
        },
      }),
    });

    if (res.ok) {
      alert("Cliente actualizado correctamente");
      document.getElementById("formActualizaCliente")?.reset();
      const modalElement = document.getElementById("default-modal");
      modalElement?.classList.toggle("hidden");
      navigate(0);
    } else {
      alert("Error al actualizar cliente");
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
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Número
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Nombre Cliente
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Correo Cliente
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Documento Cliente
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {loaderData.data &&
                  loaderData.data.map((cliente: any, index: number) => (
                    <tr className="border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {cliente.numCliente}
                      </th>
                      <td className="px-4 py-3">{cliente.nombresCliente}</td>
                      <td className="px-4 py-3">{cliente.correoCliente}</td>
                      <td className="px-4 py-3">{cliente.documentoCliente}</td>
                      <td className="px-4 py-3">
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
                Editar Cliente
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
                  Actualiza Cliente
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  method="POST"
                  id="formActualizaCliente"
                  onSubmit={handleSubmitActualizaCliente}
                >
                  <div>
                    <label
                      htmlFor="numCliente"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Número Cliente
                    </label>
                    <input
                      type="text"
                      name="numCliente"
                      id="numCliente"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nombres
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
                      Correo
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
                      Telefono
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
                      htmlFor="tipoDocumento"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tipo Documento
                    </label>
                    <select
                      id="tipoDocumento"
                      name="tipoDocumento"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value={-1} selected>
                        Tipo de Documento
                      </option>
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
                      htmlFor="numeroDocumento"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Número de Documento
                    </label>
                    <input
                      type="text"
                      name="numeroDocumento"
                      id="numeroDocumento"
                      placeholder="74562156"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
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
                      <option selected>Empresa</option>
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

                  <button
                    type="submit"
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                  >
                    Actualizar Cliente
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
