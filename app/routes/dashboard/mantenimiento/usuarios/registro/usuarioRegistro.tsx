import { Link } from "react-router";

export async function loader() {
  const res = await fetch("http://localhost:8090/api/v1/tipo/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos");
  }
  const data = await res.json();
  return { data: data };
}

export default function Dashboard({ loaderData }) {
  async function handleSubmit(event) {
    const date = new Date(event.target.fechaNacimiento.value);

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
        saltUsuario: "as3d5as1h3",
        fechaNacimientoUsuario:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate(),
        tipoUsuario: {
          idTipo: event.target.tipo.value,
        },
        estadoUsuario: true,
      }),
    });

    if (res.ok) {
      alert("Usuario registrado correctamente");
      document.getElementById("formRegistroUsuario")?.reset();
    } else {
      alert("Error al registrar usuario");
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Link to={"/dashboard/mantenimiento/usuarios"}>
              <button type="button">Volver</button>
            </Link>
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Ingresa un Usuario
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              method="POST"
              id="formRegistroUsuario"
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
                  {loaderData.data &&
                    loaderData.data.map((tipo) => (
                      <option key={tipo.idTipo} value={tipo.idTipo}>
                        {tipo.descripcionTipo}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="submit"
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
              >
                Ingresar Usuario
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
