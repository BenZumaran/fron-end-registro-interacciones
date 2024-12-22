import { useNavigate } from "react-router";
export default function Inicio() {
  const navigate = useNavigate();
  async function inicioSesion(event: any) {
    event.preventDefault();
    const res = await fetch(
      "http://localhost:8090/api/v1/usuario?id=" + event.target.usuario.value
    );
    if (res.ok) {
      const data = await res.json();
      if (data.claveUsuario === event.target.clave.value) {
        document.getElementById("ingresoUsuario")?.reset();
        navigate("/dashboard");
      } else {
        alert("Contraseña incorrecta");
      }
    } else {
      alert("Usuario no encontrado");
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-8xl font-bold text-center">RegAct</h1>
          <h2 className="mt-2 text-center text-xl/9 font-bold tracking-tight text-gray-900">
            Ingresa para cotinuar
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            method="POST"
            name="ingresoUsuario"
            className="space-y-6"
            onSubmit={inicioSesion}
          >
            <div>
              <label
                htmlFor="usuario"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Código de Usuario
              </label>
              <div className="mt-2">
                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  required
                  autoComplete="usuario"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="clave"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Clave
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="clave"
                  name="clave"
                  type="password"
                  required
                  autoComplete="current-clave"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar Sesion
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            No tienes cuenta?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Contacta con tu administrador
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
