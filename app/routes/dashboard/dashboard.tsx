import { Link, Outlet } from "react-router";

export default function Dashboard() {
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/dashboard"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3 text-3xl">RegAct</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Reportes</span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
              </Link>
              <ul className="space-y-2 font-light ml-4">
                <li>
                  <Link
                    to={"reporte/interacciones"}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Interacciones
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to={"/dashboard"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Mantenimiento
                </span>
              </Link>

              <ul className="space-y-2 font-light ml-4">
                <li>
                  <Link
                    to={"mantenimiento/clientes"}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Clientes
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"mantenimiento/usuarios"}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Usuarios
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"mantenimiento/empresas"}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Empresas
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"mantenimiento/licencias"}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Licencias
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to={"/"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Cerar Sesion
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 h-fit">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 h-fit">
          <Outlet />
        </div>
      </div>
    </>
  );
}
