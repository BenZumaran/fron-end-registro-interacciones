import { Link } from "react-router";

export async function loader() {
  const res = await fetch("http://localhost:8090/api/v1/suscripcion/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos");
  }
  const data = await res.json();
  return { data: data };
}

export default function Dashboard({ loaderData }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch("http://localhost:8090/api/v1/empresa/registra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rucEmpresa: event.target.rucEmpresa.value,
        cantidadLicencias: 0,
        estadoEmpresa: true,
        razonSocialEmpresa: event.target.razonSocial.value,
        suscripcionEmpresa: {
          numSuscripcion: event.target.suscripcion.value,
        },
      }),
    });

    if (res.ok) {
      alert("Empresa registrada correctamente");
      document.getElementById("formRegistroEmpresa")?.reset();
    } else {
      alert("Error al registrar la empresa");
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Link to={"/dashboard/mantenimiento/empresas"}>
              <button type="button" className="mb-10">
                Volver
              </button>
            </Link>
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Ingresa una Empresa
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              method="POST"
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
                  maxLength={11}
                  minLength={11}
                  name="rucEmpresa"
                  id="rucEmpresa"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="20123456789"
                  required
                />
              </div>
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
                  {loaderData.data &&
                    loaderData.data.map((suscripcion) => (
                      <option
                        key={suscripcion.numSuscripcion}
                        value={suscripcion.numSuscripcion}
                      >
                        {suscripcion.nombreSuscripcion}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="submit"
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
