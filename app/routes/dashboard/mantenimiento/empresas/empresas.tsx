import { useState } from "react";
import type { Route } from "./+types/empresas";
import { Link, useNavigate } from "react-router";

export async function loader() {
  const res = await fetch("http://localhost:8090/api/v1/empresa/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de empresas");
  }
  const resSuscripcion = await fetch(
    "http://localhost:8090/api/v1/suscripcion/lista"
  );
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de suscripcion");
  }
  const data = await res.json();
  const suscripcion = await resSuscripcion.json();
  return { data: data, suscripcion: suscripcion };
}

export default function Empresas({ loaderData }: { loaderData: any }) {
  const [dataEmpresas, setDataEmpresas] = useState(loaderData.data);

  const navigate = useNavigate();

  function modal(numItem: number) {
    const modalElement = document.getElementById("default-modal");
    modalElement?.classList.toggle("hidden");

    if (numItem === -1) {
      const formElement = document.getElementById(
        "formRegistroEmpresa"
      ) as HTMLFormElement | null;
      formElement?.reset();
      return;
    }

    const rucEmpresaElement = document.getElementById(
      "rucEmpresa"
    ) as HTMLInputElement;
    rucEmpresaElement.value = loaderData.data[numItem].rucEmpresa;
    const razonSocialElement = document.getElementById(
      "razonSocial"
    ) as HTMLInputElement;
    razonSocialElement.value = loaderData.data[numItem].razonSocialEmpresa;
    const suscripcionElement = document.getElementById(
      "suscripcion"
    ) as HTMLInputElement;
    suscripcionElement.value =
      loaderData.data[numItem].suscripcionEmpresa.numSuscripcion;
    const activoElement = document.getElementById("activo") as HTMLInputElement;
    loaderData.data[numItem].estadoEmpresa &&
      ((activoElement.value = "1"), (activoElement.checked = true));
    const cantidadLicenciasElement = document.getElementById(
      "cantidadLicencias"
    ) as HTMLInputElement;
    cantidadLicenciasElement.value =
      loaderData.data[numItem].cantidadLicenciasEmpresa;
  }

  async function handleSubmitEditarEmpresa(event: any) {
    event.preventDefault();
    const res = await fetch("http://localhost:8090/api/v1/empresa/registra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rucEmpresa: event.target.rucEmpresa.value,
        estadoEmpresa: event.target.activo.checked,
        razonSocialEmpresa: event.target.razonSocial.value,
        cantidadLicenciasEmpresa: event.target.cantidadLicencias.value,
        suscripcionEmpresa: {
          numSuscripcion: event.target.suscripcion.value,
        },
      }),
    });

    if (res.ok) {
      alert("Empresa actualizada correctamente");
      document.getElementById("formRegistroEmpresa")?.reset();
      const modalElement = document.getElementById("default-modal");
      modalElement?.classList.toggle("hidden");
      navigate(0);
    } else {
      alert("Error al actualizar la empresa");
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
                to="/dashboard/mantenimiento/empresas/registro"
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
                    Numero de Ruc
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Razon Social
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Usuarios
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Suscripcion
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataEmpresas &&
                  dataEmpresas.map((empresa: any, index: number) => (
                    <tr className="border-b dark:border-gray-700" key={index}>
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {empresa.rucEmpresa}
                      </th>
                      <td className="px-4 py-3">
                        {empresa.razonSocialEmpresa}
                      </td>
                      <td className="px-4 py-3">{empresa.usuarios.length}</td>
                      <td className="px-4 py-3">
                        {empresa.suscripcionEmpresa.nombreSuscripcion}
                      </td>
                      <td className="px-4 py-3">
                        {empresa.estadoEmpresa ? (
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
        className=" hidden overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full h-full md:inset-0 h-[calc(100%-1rem)]"
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
                Editar Empresa
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
            <div className="mx-auto w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-8 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Ingresa una Empresa
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  method="POST"
                  onSubmit={handleSubmitEditarEmpresa}
                  id="formRegistroEmpresa"
                >
                  <div>
                    <label
                      htmlFor="rucEmpresa"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Ruc Empresa
                    </label>
                    <input
                      type="number"
                      size={11}
                      name="rucEmpresa"
                      id="rucEmpresa"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="20123456789"
                      required
                    />
                  </div>
                  <input
                    type="hidden"
                    value=""
                    name="cantidadLicencias"
                    id="cantidadLicencias"
                  />
                  <div>
                    <label
                      htmlFor="razonSocial"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Razón Social
                    </label>
                    <input
                      type="text"
                      name="razonSocial"
                      id="razonSocial"
                      placeholder="Nombre de la Empresa"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="licencia"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Elige una suscripcion
                    </label>
                    <select
                      id="suscripcion"
                      name="suscripcion"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Elige una suscripcion</option>
                      {loaderData.suscripcion &&
                        loaderData.suscripcion.map((suscripcion: any) => (
                          <option
                            key={suscripcion.numSuscripcion}
                            value={suscripcion.numSuscripcion}
                          >
                            {suscripcion.nombreSuscripcion}
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
                    Actualizar Empresa
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
