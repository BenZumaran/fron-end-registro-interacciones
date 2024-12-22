import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useParams, useLoaderData, useActionData, useMatches, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, useNavigate, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        ServerRouter,
        {
          context: routerContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const stylesheet = "/assets/app-3CPeAPXw.css";
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}, {
  rel: "stylesheet",
  href: stylesheet
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    className: "h-full bg-white",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "h-full",
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx("script", {
        src: "../node_modules/flowbite/dist/flowbite.min.js"
      })]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Inicio() {
  const navigate = useNavigate();
  async function inicioSesion(event) {
    var _a;
    event.preventDefault();
    const res = await fetch(
      "http://localhost:8090/api/v1/usuario?id=" + event.target.usuario.value
    );
    if (res.ok) {
      const data = await res.json();
      if (data.claveUsuario === event.target.clave.value) {
        (_a = document.getElementById("ingresoUsuario")) == null ? void 0 : _a.reset();
        navigate("/dashboard");
      } else {
        alert("Contraseña incorrecta");
      }
    } else {
      alert("Usuario no encontrado");
    }
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-sm", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-8xl font-bold text-center", children: "RegAct" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-2 text-center text-xl/9 font-bold tracking-tight text-gray-900", children: "Ingresa para cotinuar" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 sm:mx-auto sm:w-full sm:max-w-sm", children: [
      /* @__PURE__ */ jsxs(
        "form",
        {
          method: "POST",
          name: "ingresoUsuario",
          className: "space-y-6",
          onSubmit: inicioSesion,
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: "usuario",
                  className: "block text-sm/6 font-medium text-gray-900",
                  children: "Código de Usuario"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(
                "input",
                {
                  id: "usuario",
                  name: "usuario",
                  type: "text",
                  required: true,
                  autoComplete: "usuario",
                  className: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "clave",
                    className: "block text-sm/6 font-medium text-gray-900",
                    children: "Clave"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "#",
                    className: "font-semibold text-indigo-600 hover:text-indigo-500",
                    children: "Olvidaste tu contraseña?"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(
                "input",
                {
                  id: "clave",
                  name: "clave",
                  type: "password",
                  required: true,
                  autoComplete: "current-clave",
                  className: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                children: "Iniciar Sesion"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "mt-10 text-center text-sm/6 text-gray-500", children: [
        "No tienes cuenta?",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            className: "font-semibold text-indigo-600 hover:text-indigo-500",
            children: "Contacta con tu administrador"
          }
        )
      ] })
    ] })
  ] }) });
}
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Inicio, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const dashboard = withComponentProps(function Dashboard() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("button", {
      "data-drawer-target": "default-sidebar",
      "data-drawer-toggle": "default-sidebar",
      "aria-controls": "default-sidebar",
      type: "button",
      className: "inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
      children: [/* @__PURE__ */ jsx("span", {
        className: "sr-only",
        children: "Open sidebar"
      }), /* @__PURE__ */ jsx("svg", {
        className: "w-6 h-6",
        "aria-hidden": "true",
        fill: "currentColor",
        viewBox: "0 0 20 20",
        xmlns: "http://www.w3.org/2000/svg",
        children: /* @__PURE__ */ jsx("path", {
          clipRule: "evenodd",
          fillRule: "evenodd",
          d: "M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        })
      })]
    }), /* @__PURE__ */ jsx("aside", {
      id: "default-sidebar",
      className: "fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0",
      "aria-label": "Sidebar",
      children: /* @__PURE__ */ jsx("div", {
        className: "h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800",
        children: /* @__PURE__ */ jsxs("ul", {
          className: "space-y-2 font-medium",
          children: [/* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx(Link, {
              to: "/dashboard",
              className: "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
              children: /* @__PURE__ */ jsx("span", {
                className: "ms-3 text-3xl",
                children: "RegAct"
              })
            })
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsxs(Link, {
              to: "/dashboard",
              className: "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex-1 ms-3 whitespace-nowrap",
                children: "Reportes"
              }), /* @__PURE__ */ jsx("span", {
                className: "inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300",
                children: "Pro"
              })]
            }), /* @__PURE__ */ jsx("ul", {
              className: "space-y-2 font-light ml-4",
              children: /* @__PURE__ */ jsx("li", {
                children: /* @__PURE__ */ jsx(Link, {
                  to: "reporte/interacciones",
                  className: "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "flex-1 ms-3 whitespace-nowrap",
                    children: "Interacciones"
                  })
                })
              })
            })]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx(Link, {
              to: "/dashboard",
              className: "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
              children: /* @__PURE__ */ jsx("span", {
                className: "flex-1 ms-3 whitespace-nowrap",
                children: "Mantenimiento"
              })
            }), /* @__PURE__ */ jsxs("ul", {
              className: "space-y-2 font-light ml-4",
              children: [/* @__PURE__ */ jsx("li", {
                children: /* @__PURE__ */ jsx(Link, {
                  to: "mantenimiento/clientes",
                  className: "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "flex-1 ms-3 whitespace-nowrap",
                    children: "Clientes"
                  })
                })
              }), /* @__PURE__ */ jsx("li", {
                children: /* @__PURE__ */ jsx(Link, {
                  to: "mantenimiento/usuarios",
                  className: "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "flex-1 ms-3 whitespace-nowrap",
                    children: "Usuarios"
                  })
                })
              }), /* @__PURE__ */ jsx("li", {
                children: /* @__PURE__ */ jsx(Link, {
                  to: "mantenimiento/empresas",
                  className: "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "flex-1 ms-3 whitespace-nowrap",
                    children: "Empresas"
                  })
                })
              }), /* @__PURE__ */ jsx("li", {
                children: /* @__PURE__ */ jsx(Link, {
                  to: "mantenimiento/licencias",
                  className: "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "flex-1 ms-3 whitespace-nowrap",
                    children: "Licencias"
                  })
                })
              })]
            })]
          }), /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx(Link, {
              to: "/",
              className: "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
              children: /* @__PURE__ */ jsx("span", {
                className: "flex-1 ms-3 whitespace-nowrap",
                children: "Cerar Sesion"
              })
            })
          })]
        })
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "p-4 sm:ml-64 h-fit",
      children: /* @__PURE__ */ jsx("div", {
        className: "p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 h-fit",
        children: /* @__PURE__ */ jsx(Outlet, {})
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboard
}, Symbol.toStringTag, { value: "Module" }));
async function loader$6() {
  const res = await fetch("http://localhost:8090/api/v1/interaccion/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de las interacciones");
  }
  const data = await res.json();
  const resTipo = await fetch("http://localhost:8090/api/v1/tipo/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de tipos");
  }
  const tipo = await resTipo.json();
  return {
    data,
    tipo
  };
}
const interacciones = withComponentProps(function Usuarios({
  loaderData
}) {
  function modal(numItem) {
    const modalElement = document.getElementById("default-modal");
    modalElement == null ? void 0 : modalElement.classList.toggle("hidden");
    if (numItem === -1) {
      const formElement = document.getElementById("formRegistroUsuario");
      formElement == null ? void 0 : formElement.reset();
      return;
    }
    let element = document.getElementById("numInteraccion");
    element.value = loaderData.data[numItem].numeroInteraccion;
    element = document.getElementById("tipo");
    element.value = loaderData.data[numItem].tipoInteraccion.descripcionTipo;
    element = document.getElementById("cliente");
    element.value = loaderData.data[numItem].clienteInteraccion.nombresCliente;
    element = document.getElementById("empresaCliente");
    element.value = loaderData.data[numItem].clienteInteraccion.empresaCliente.razonSocialEmpresa;
    element = document.getElementById("fecha");
    element.value = new Date(loaderData.data[numItem].fechaInteraccion).toLocaleString();
    element = document.getElementById("detalle");
    element.value = loaderData.data[numItem].detalleInteraccion;
  }
  return /* @__PURE__ */ jsxs("section", {
    className: "bg-gray-50 dark:bg-gray-900 p-3 sm:p-5",
    children: [/* @__PURE__ */ jsx("div", {
      className: "mx-auto max-w-screen-xl px-4 lg:px-12",
      children: /* @__PURE__ */ jsxs("div", {
        className: "bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4",
          children: /* @__PURE__ */ jsx("div", {
            className: "w-full md:w-1/2",
            children: /* @__PURE__ */ jsxs("form", {
              className: "flex items-center",
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "simple-search",
                className: "sr-only",
                children: "Search"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative w-full",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",
                  children: /* @__PURE__ */ jsx("svg", {
                    "aria-hidden": "true",
                    className: "w-5 h-5 text-gray-500 dark:text-gray-400",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /* @__PURE__ */ jsx("path", {
                      fillRule: "evenodd",
                      d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                      clipRule: "evenodd"
                    })
                  })
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  id: "simple-search",
                  className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
                  placeholder: "Search",
                  required: true
                })]
              })]
            })
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "overflow-x-auto",
          children: /* @__PURE__ */ jsxs("table", {
            className: "w-full text-sm text-left text-gray-500 dark:text-gray-400",
            children: [/* @__PURE__ */ jsx("thead", {
              className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
              children: /* @__PURE__ */ jsxs("tr", {
                children: [/* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Número"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Fecha"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Cliente"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Tipo"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Revisar"
                })]
              })
            }), /* @__PURE__ */ jsx("tbody", {
              children: loaderData.data && loaderData.data.map((interaccion, index) => /* @__PURE__ */ jsxs("tr", {
                className: "border-b dark:border-gray-700",
                children: [/* @__PURE__ */ jsx("th", {
                  scope: "row",
                  className: "px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white",
                  children: interaccion.numeroInteraccion
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: new Date(interaccion.fechaInteraccion).toLocaleString()
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: interaccion.clienteInteraccion.nombresCliente
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: interaccion.tipoInteraccion.descripcionTipo
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: /* @__PURE__ */ jsx("button", {
                    type: "button",
                    className: "text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900",
                    onClick: () => modal(index),
                    children: "Detalle"
                  })
                })]
              }))
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      id: "default-modal",
      tabIndex: -1,
      "aria-hidden": "true",
      className: "hidden overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full h-full md:inset-0 h-[calc(100%-1rem)]",
      style: {
        position: "fixed",
        padding: "10vh 28vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      },
      children: /* @__PURE__ */ jsx("div", {
        className: "relative p-4 w-full max-w-2xl max-h-full",
        children: /* @__PURE__ */ jsxs("div", {
          className: "relative bg-white rounded-lg shadow dark:bg-gray-700",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-gray-900 dark:text-white",
              children: "Detalle Interacción"
            }), /* @__PURE__ */ jsxs("button", {
              type: "button",
              className: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white",
              "data-modal-hide": "default-modal",
              onClick: () => modal(-1),
              children: [/* @__PURE__ */ jsx("svg", {
                className: "w-3 h-3",
                "aria-hidden": "true",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 14 14",
                children: /* @__PURE__ */ jsx("path", {
                  stroke: "currentColor",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                })
              }), /* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: "Close modal"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mx-auto my-10 h-fit w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",
            children: /* @__PURE__ */ jsxs("div", {
              className: "p-6 space-y-4 md:space-y-6 sm:p-8 h-fit",
              children: [/* @__PURE__ */ jsx("h1", {
                className: "text-2xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white",
                children: "Detalle e la Interacción"
              }), /* @__PURE__ */ jsxs("form", {
                className: "space-y-4 md:space-y-6",
                id: "formDetalleInteraccion",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "numInteraccion",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Número de Interacción"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    name: "numInteraccion",
                    id: "numInteraccion",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    disabled: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "tipo",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Tipo"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    name: "tipo",
                    id: "tipo",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    disabled: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "cliente",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Cliente"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    name: "cliente",
                    id: "cliente",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    disabled: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "empresaCliente",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Empresa Cliente"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    name: "empresaCliente",
                    id: "empresaCliente",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    disabled: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "fecha",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Fecha de Interacción"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    name: "fecha",
                    id: "fecha",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    disabled: true
                  })]
                }), /* @__PURE__ */ jsx("label", {
                  htmlFor: "detalle",
                  className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                  children: "Detalle"
                }), /* @__PURE__ */ jsx("textarea", {
                  id: "detalle",
                  rows: 4,
                  className: "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                  disabled: true
                })]
              })]
            })
          })]
        })
      })
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: interacciones,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
async function loader$5() {
  const res = await fetch("http://localhost:8090/api/v1/empresa/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de empresas");
  }
  const resSuscripcion = await fetch("http://localhost:8090/api/v1/suscripcion/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos de suscripcion");
  }
  const data = await res.json();
  const suscripcion = await resSuscripcion.json();
  return {
    data,
    suscripcion
  };
}
const empresas = withComponentProps(function Empresas({
  loaderData
}) {
  const [dataEmpresas, setDataEmpresas] = useState(loaderData.data);
  const navigate = useNavigate();
  function modal(numItem) {
    const modalElement = document.getElementById("default-modal");
    modalElement == null ? void 0 : modalElement.classList.toggle("hidden");
    if (numItem === -1) {
      const formElement = document.getElementById("formRegistroEmpresa");
      formElement == null ? void 0 : formElement.reset();
      return;
    }
    const rucEmpresaElement = document.getElementById("rucEmpresa");
    rucEmpresaElement.value = loaderData.data[numItem].rucEmpresa;
    const razonSocialElement = document.getElementById("razonSocial");
    razonSocialElement.value = loaderData.data[numItem].razonSocialEmpresa;
    const suscripcionElement = document.getElementById("suscripcion");
    suscripcionElement.value = loaderData.data[numItem].suscripcionEmpresa.numSuscripcion;
    const activoElement = document.getElementById("activo");
    loaderData.data[numItem].estadoEmpresa && (activoElement.value = "1", activoElement.checked = true);
    const cantidadLicenciasElement = document.getElementById("cantidadLicencias");
    cantidadLicenciasElement.value = loaderData.data[numItem].cantidadLicenciasEmpresa;
  }
  async function handleSubmitEditarEmpresa(event) {
    var _a;
    event.preventDefault();
    const res = await fetch("http://localhost:8090/api/v1/empresa/registra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        rucEmpresa: event.target.rucEmpresa.value,
        estadoEmpresa: event.target.activo.checked,
        razonSocialEmpresa: event.target.razonSocial.value,
        cantidadLicenciasEmpresa: event.target.cantidadLicencias.value,
        suscripcionEmpresa: {
          numSuscripcion: event.target.suscripcion.value
        }
      })
    });
    if (res.ok) {
      alert("Empresa actualizada correctamente");
      (_a = document.getElementById("formRegistroEmpresa")) == null ? void 0 : _a.reset();
      const modalElement = document.getElementById("default-modal");
      modalElement == null ? void 0 : modalElement.classList.toggle("hidden");
      navigate(0);
    } else {
      alert("Error al actualizar la empresa");
    }
  }
  return /* @__PURE__ */ jsxs("section", {
    className: "bg-gray-50 dark:bg-gray-900 p-3 sm:p-5",
    children: [/* @__PURE__ */ jsx("div", {
      className: "mx-auto max-w-screen-xl px-4 lg:px-12",
      children: /* @__PURE__ */ jsxs("div", {
        className: "bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-full md:w-1/2",
            children: /* @__PURE__ */ jsxs("form", {
              className: "flex items-center",
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "simple-search",
                className: "sr-only",
                children: "Search"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative w-full",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",
                  children: /* @__PURE__ */ jsx("svg", {
                    "aria-hidden": "true",
                    className: "w-5 h-5 text-gray-500 dark:text-gray-400",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /* @__PURE__ */ jsx("path", {
                      fillRule: "evenodd",
                      d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                      clipRule: "evenodd"
                    })
                  })
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  id: "simple-search",
                  className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
                  placeholder: "Search",
                  required: true
                })]
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0",
            children: /* @__PURE__ */ jsx(Link, {
              to: "/dashboard/mantenimiento/empresas/registro",
              className: "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
              children: "Agregar"
            })
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "overflow-x-auto",
          children: /* @__PURE__ */ jsxs("table", {
            className: "w-full text-sm text-left text-gray-500 dark:text-gray-400",
            children: [/* @__PURE__ */ jsx("thead", {
              className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
              children: /* @__PURE__ */ jsxs("tr", {
                children: [/* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Numero de Ruc"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Razon Social"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Usuarios"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Suscripcion"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Acciones"
                })]
              })
            }), /* @__PURE__ */ jsx("tbody", {
              children: dataEmpresas && dataEmpresas.map((empresa, index) => /* @__PURE__ */ jsxs("tr", {
                className: "border-b dark:border-gray-700",
                children: [/* @__PURE__ */ jsx("th", {
                  scope: "row",
                  className: "px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white",
                  children: empresa.rucEmpresa
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: empresa.razonSocialEmpresa
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: empresa.usuarios.length
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: empresa.suscripcionEmpresa.nombreSuscripcion
                }), /* @__PURE__ */ jsxs("td", {
                  className: "px-4 py-3",
                  children: [empresa.estadoEmpresa ? /* @__PURE__ */ jsx("button", {
                    type: "button",
                    className: "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
                    children: "Activo"
                  }) : /* @__PURE__ */ jsx("button", {
                    type: "button",
                    className: "text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
                    children: "Inactivo"
                  }), /* @__PURE__ */ jsx("button", {
                    type: "button",
                    className: "text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900",
                    onClick: () => modal(index),
                    children: "Editar"
                  })]
                })]
              }, index))
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      id: "default-modal",
      tabIndex: -1,
      "aria-hidden": "true",
      className: " hidden overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full h-full md:inset-0 h-[calc(100%-1rem)]",
      style: {
        position: "fixed",
        padding: "10vh 28vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      },
      children: /* @__PURE__ */ jsx("div", {
        className: "relative p-4 w-full max-w-2xl max-h-full",
        children: /* @__PURE__ */ jsxs("div", {
          className: "relative bg-white rounded-lg shadow dark:bg-gray-700",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-gray-900 dark:text-white",
              children: "Editar Empresa"
            }), /* @__PURE__ */ jsxs("button", {
              type: "button",
              className: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white",
              "data-modal-hide": "default-modal",
              onClick: () => modal(-1),
              children: [/* @__PURE__ */ jsx("svg", {
                className: "w-3 h-3",
                "aria-hidden": "true",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 14 14",
                children: /* @__PURE__ */ jsx("path", {
                  stroke: "currentColor",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                })
              }), /* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: "Close modal"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mx-auto w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",
            children: /* @__PURE__ */ jsxs("div", {
              className: "p-8 space-y-4 md:space-y-6 sm:p-8",
              children: [/* @__PURE__ */ jsx("h1", {
                className: "text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white",
                children: "Ingresa una Empresa"
              }), /* @__PURE__ */ jsxs("form", {
                className: "space-y-4 md:space-y-6",
                method: "POST",
                onSubmit: handleSubmitEditarEmpresa,
                id: "formRegistroEmpresa",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "rucEmpresa",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Ruc Empresa"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "number",
                    size: 11,
                    name: "rucEmpresa",
                    id: "rucEmpresa",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    placeholder: "20123456789",
                    required: true
                  })]
                }), /* @__PURE__ */ jsx("input", {
                  type: "hidden",
                  value: "",
                  name: "cantidadLicencias",
                  id: "cantidadLicencias"
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "razonSocial",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Razón Social"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    name: "razonSocial",
                    id: "razonSocial",
                    placeholder: "Nombre de la Empresa",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "licencia",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Elige una suscripcion"
                  }), /* @__PURE__ */ jsxs("select", {
                    id: "suscripcion",
                    name: "suscripcion",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    children: [/* @__PURE__ */ jsx("option", {
                      selected: true,
                      children: "Elige una suscripcion"
                    }), loaderData.suscripcion && loaderData.suscripcion.map((suscripcion) => /* @__PURE__ */ jsx("option", {
                      value: suscripcion.numSuscripcion,
                      children: suscripcion.nombreSuscripcion
                    }, suscripcion.numSuscripcion))]
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  children: /* @__PURE__ */ jsxs("label", {
                    className: "inline-flex items-center cursor-pointer",
                    children: [/* @__PURE__ */ jsx("input", {
                      type: "checkbox",
                      id: "activo",
                      name: "activo",
                      value: 0,
                      className: "sr-only peer"
                    }), /* @__PURE__ */ jsx("div", {
                      className: "relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "ms-3 text-sm font-medium text-gray-900 dark:text-gray-300",
                      children: "Activo"
                    })]
                  })
                }), /* @__PURE__ */ jsx("button", {
                  type: "submit",
                  className: " text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full",
                  children: "Actualizar Empresa"
                })]
              })]
            })
          })]
        })
      })
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: empresas,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
async function loader$4() {
  const res = await fetch("http://localhost:8090/api/v1/suscripcion/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos");
  }
  const data = await res.json();
  return {
    data
  };
}
const empresaRegistro = withComponentProps(function Dashboard2({
  loaderData
}) {
  async function handleSubmit(event) {
    var _a;
    event.preventDefault();
    const res = await fetch("http://localhost:8090/api/v1/empresa/registra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        rucEmpresa: event.target.rucEmpresa.value,
        cantidadLicencias: 0,
        estadoEmpresa: true,
        razonSocialEmpresa: event.target.razonSocial.value,
        suscripcionEmpresa: {
          numSuscripcion: event.target.suscripcion.value
        }
      })
    });
    if (res.ok) {
      alert("Empresa registrada correctamente");
      (_a = document.getElementById("formRegistroEmpresa")) == null ? void 0 : _a.reset();
    } else {
      alert("Error al registrar la empresa");
    }
  }
  return /* @__PURE__ */ jsx("section", {
    className: "bg-gray-50 dark:bg-gray-900",
    children: /* @__PURE__ */ jsx("div", {
      className: "flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0",
      children: /* @__PURE__ */ jsx("div", {
        className: "w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",
        children: /* @__PURE__ */ jsxs("div", {
          className: "p-6 space-y-4 md:space-y-6 sm:p-8",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/dashboard/mantenimiento/empresas",
            children: /* @__PURE__ */ jsx("button", {
              type: "button",
              className: "mb-10",
              children: "Volver"
            })
          }), /* @__PURE__ */ jsx("h1", {
            className: "text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white",
            children: "Ingresa una Empresa"
          }), /* @__PURE__ */ jsxs("form", {
            className: "space-y-4 md:space-y-6",
            onSubmit: handleSubmit,
            method: "POST",
            id: "formRegistroEmpresa",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "rucEmpresa",
                className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                children: "Ruc Empresa"
              }), /* @__PURE__ */ jsx("input", {
                type: "number",
                maxLength: 11,
                minLength: 11,
                name: "rucEmpresa",
                id: "rucEmpresa",
                className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                placeholder: "20123456789",
                required: true
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "razonSocial",
                className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                children: "Razón Social"
              }), /* @__PURE__ */ jsx("input", {
                type: "text",
                name: "razonSocial",
                id: "razonSocial",
                placeholder: "Nombre de la Empresa",
                className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                required: true
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "licencia",
                className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                children: "Elige una suscripcion"
              }), /* @__PURE__ */ jsxs("select", {
                id: "suscripcion",
                name: "suscripcion",
                className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                children: [/* @__PURE__ */ jsx("option", {
                  selected: true,
                  children: "Elige una suscripcion"
                }), loaderData.data && loaderData.data.map((suscripcion) => /* @__PURE__ */ jsx("option", {
                  value: suscripcion.numSuscripcion,
                  children: suscripcion.nombreSuscripcion
                }, suscripcion.numSuscripcion))]
              })]
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              className: " text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full",
              children: "Create an account"
            })]
          })]
        })
      })
    })
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: empresaRegistro,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
async function loader$3() {
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
  return {
    data,
    tipo
  };
}
const usuarios = withComponentProps(function Usuarios2({
  loaderData
}) {
  const [dataUsuarios, setDataUsuarios] = useState(loaderData.data);
  const navigate = useNavigate();
  function modal(numItem) {
    const modalElement = document.getElementById("default-modal");
    modalElement == null ? void 0 : modalElement.classList.toggle("hidden");
    if (numItem === -1) {
      const formElement = document.getElementById("formRegistroUsuario");
      formElement == null ? void 0 : formElement.reset();
      return;
    }
    const idUsuarioElement = document.getElementById("idUsuario");
    idUsuarioElement.value = loaderData.data[numItem].idUsuario;
    const nombreElement = document.getElementById("nombre");
    nombreElement.value = loaderData.data[numItem].nombreUsuario;
    const correoElement = document.getElementById("correo");
    correoElement.value = loaderData.data[numItem].correoUsuario;
    const fechaNacimientoElement = document.getElementById("fechaNacimiento");
    fechaNacimientoElement.value = loaderData.data[numItem].fechaNacimientoUsuario;
    const telefonoElement = document.getElementById("telefono");
    telefonoElement.value = loaderData.data[numItem].telefonoUsuario;
    const claveElement = document.getElementById("clave");
    claveElement.value = loaderData.data[numItem].telefonoUsuario;
    const confirmarClaveElement = document.getElementById("confirmarClave");
    confirmarClaveElement.value = loaderData.data[numItem].telefonoUsuario;
    const activoElement = document.getElementById("activo");
    loaderData.data[numItem].estadoUsuario && (activoElement.value = "1", activoElement.checked = true);
    const sElement = document.getElementById("sUsu");
    sElement.value = loaderData.data[numItem].saltUsuario;
    const tipoElement = document.getElementById("tipo");
    tipoElement.value = loaderData.data[numItem].tipoUsuario.idTipo;
  }
  async function handleSubmitActualizaUsuario(event) {
    var _a;
    const date = new Date(event.target.fechaNacimiento.value);
    let dia = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let mes = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let anio = date.getFullYear();
    let userDate = anio + "-" + mes + "-" + dia;
    event.preventDefault();
    const res = await fetch("http://localhost:8090/api/v1/usuario/registra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
          idTipo: event.target.tipo.value
        },
        estadoUsuario: event.target.activo.checked
      })
    });
    if (res.ok) {
      alert("Usuario actualizado correctamente");
      (_a = document.getElementById("formRegistroUsuario")) == null ? void 0 : _a.reset();
      const modalElement = document.getElementById("default-modal");
      modalElement == null ? void 0 : modalElement.classList.toggle("hidden");
      navigate(0);
    } else {
      alert("Error al actualizar usuario");
    }
  }
  return /* @__PURE__ */ jsxs("section", {
    className: "bg-gray-50 dark:bg-gray-900 p-3 sm:p-5",
    children: [/* @__PURE__ */ jsx("div", {
      className: "mx-auto max-w-screen-xl px-4 lg:px-12",
      children: /* @__PURE__ */ jsxs("div", {
        className: "bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-full md:w-1/2",
            children: /* @__PURE__ */ jsxs("form", {
              className: "flex items-center",
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "simple-search",
                className: "sr-only",
                children: "Search"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative w-full",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",
                  children: /* @__PURE__ */ jsx("svg", {
                    "aria-hidden": "true",
                    className: "w-5 h-5 text-gray-500 dark:text-gray-400",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /* @__PURE__ */ jsx("path", {
                      fillRule: "evenodd",
                      d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                      clipRule: "evenodd"
                    })
                  })
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  id: "simple-search",
                  className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
                  placeholder: "Search",
                  required: true
                })]
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0",
            children: /* @__PURE__ */ jsx(Link, {
              to: "/dashboard/mantenimiento/usuarios/registro",
              className: "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
              children: "Agregar"
            })
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "overflow-x-auto",
          children: /* @__PURE__ */ jsxs("table", {
            className: "w-full text-sm text-left text-gray-500 dark:text-gray-400",
            children: [/* @__PURE__ */ jsx("thead", {
              className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
              children: /* @__PURE__ */ jsxs("tr", {
                children: [/* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "idUsuario"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Nombre Usuario"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Correo Usuario"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Tipo Usuario"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Acciones"
                })]
              })
            }), /* @__PURE__ */ jsx("tbody", {
              children: dataUsuarios && dataUsuarios.map((usuario, index) => /* @__PURE__ */ jsxs("tr", {
                className: "border-b dark:border-gray-700",
                children: [/* @__PURE__ */ jsx("th", {
                  scope: "row",
                  className: "px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white",
                  children: usuario.idUsuario
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: usuario.nombreUsuario
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: usuario.correoUsuario
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: usuario.tipoUsuario.descripcionTipo
                }), /* @__PURE__ */ jsxs("td", {
                  className: "px-4 py-3",
                  children: [usuario.estadoUsuario === true ? /* @__PURE__ */ jsx("button", {
                    type: "button",
                    className: "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
                    children: "Activo"
                  }) : /* @__PURE__ */ jsx("button", {
                    type: "button",
                    className: "text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
                    children: "Inactivo"
                  }), /* @__PURE__ */ jsx("button", {
                    type: "button",
                    className: "text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900",
                    onClick: () => modal(index),
                    children: "Editar"
                  })]
                })]
              }))
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      id: "default-modal",
      tabIndex: -1,
      "aria-hidden": "true",
      className: "hidden overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full h-full md:inset-0 h-[calc(100%-1rem)]",
      style: {
        position: "fixed",
        padding: "10vh 28vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      },
      children: /* @__PURE__ */ jsx("div", {
        className: "relative p-4 w-full max-w-2xl max-h-full",
        children: /* @__PURE__ */ jsxs("div", {
          className: "relative bg-white rounded-lg shadow dark:bg-gray-700",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-gray-900 dark:text-white",
              children: "Editar Usuario"
            }), /* @__PURE__ */ jsxs("button", {
              type: "button",
              className: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white",
              "data-modal-hide": "default-modal",
              onClick: () => modal(-1),
              children: [/* @__PURE__ */ jsx("svg", {
                className: "w-3 h-3",
                "aria-hidden": "true",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 14 14",
                children: /* @__PURE__ */ jsx("path", {
                  stroke: "currentColor",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                })
              }), /* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: "Close modal"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mx-auto my-10 h-fit w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",
            children: /* @__PURE__ */ jsxs("div", {
              className: "p-6 space-y-4 md:space-y-6 sm:p-8 h-fit",
              children: [/* @__PURE__ */ jsx("h1", {
                className: "text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white",
                children: "Actualiza Usuario"
              }), /* @__PURE__ */ jsxs("form", {
                className: "space-y-4 md:space-y-6",
                method: "POST",
                id: "formRegistroUsuario",
                onSubmit: handleSubmitActualizaUsuario,
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "idUsuario",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "ID Usuario"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    name: "idUsuario",
                    id: "idUsuario",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    placeholder: "TAMAÑO : 6",
                    required: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "nombre",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Nombres del Usuario"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    name: "nombre",
                    id: "nombre",
                    placeholder: "Nombre y Apellido genérico",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "correo",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Correo del usuario"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "email",
                    name: "correo",
                    id: "correo",
                    placeholder: "ejemplo@empresa.com.pe",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "fechaNacimiento",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Fecha de Nacimiento"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "date",
                    name: "fechaNacimiento",
                    id: "fechaNacimiento",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "telefono",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Telefono del Usuario"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "number",
                    name: "telefono",
                    id: "telefono",
                    placeholder: "987548452",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "clave",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Clave de usuario"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "password",
                    name: "clave",
                    id: "clave",
                    placeholder: "*********",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  })]
                }), /* @__PURE__ */ jsx("input", {
                  type: "hidden",
                  value: "",
                  name: "sUsu",
                  id: "sUsu"
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "confirmarClave",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Clave de usuario"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "password",
                    name: "confirmarClave",
                    id: "confirmarClave",
                    placeholder: "*********",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "tipo",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Tipo Usuario"
                  }), /* @__PURE__ */ jsxs("select", {
                    id: "tipo",
                    name: "tipo",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    children: [/* @__PURE__ */ jsx("option", {
                      selected: true,
                      children: "Tipo de Usuario"
                    }), loaderData.tipo && loaderData.tipo.map((tipo) => /* @__PURE__ */ jsx("option", {
                      value: tipo.idTipo,
                      children: tipo.descripcionTipo
                    }, tipo.idTipo))]
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  children: /* @__PURE__ */ jsxs("label", {
                    className: "inline-flex items-center cursor-pointer",
                    children: [/* @__PURE__ */ jsx("input", {
                      type: "checkbox",
                      id: "activo",
                      name: "activo",
                      value: 0,
                      className: "sr-only peer"
                    }), /* @__PURE__ */ jsx("div", {
                      className: "relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "ms-3 text-sm font-medium text-gray-900 dark:text-gray-300",
                      children: "Activo"
                    })]
                  })
                }), /* @__PURE__ */ jsx("button", {
                  type: "submit",
                  className: " text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full",
                  children: "Actualizar Usuario"
                })]
              })]
            })
          })]
        })
      })
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: usuarios,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
async function loader$2() {
  const res = await fetch("http://localhost:8090/api/v1/tipo/lista");
  if (!res.ok) {
    throw new Error("No se pudo obtener los datos");
  }
  const data = await res.json();
  return {
    data
  };
}
const usuarioRegistro = withComponentProps(function Dashboard3({
  loaderData
}) {
  async function handleSubmit(event) {
    var _a;
    const date = new Date(event.target.fechaNacimiento.value);
    let dia = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let mes = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let anio = date.getFullYear();
    let userDate = anio + "-" + mes + "-" + dia;
    event.preventDefault();
    const res = await fetch("http://localhost:8090/api/v1/usuario/registra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idUsuario: event.target.idUsuario.value,
        nombreUsuario: event.target.nombre.value,
        correoUsuario: event.target.correo.value,
        claveUsuario: event.target.clave.value,
        telefonoUsuario: event.target.telefono.value,
        saltUsuario: "as3d5as1h3",
        fechaNacimientoUsuario: userDate,
        tipoUsuario: {
          idTipo: event.target.tipo.value
        },
        estadoUsuario: true
      })
    });
    if (res.ok) {
      alert("Usuario registrado correctamente");
      (_a = document.getElementById("formRegistroUsuario")) == null ? void 0 : _a.reset();
    } else {
      alert("Error al registrar usuario");
    }
  }
  return /* @__PURE__ */ jsx("section", {
    className: "bg-gray-50 dark:bg-gray-900 h-fit px-6 py-8",
    children: /* @__PURE__ */ jsx("div", {
      className: "flex flex-col items-center mx-auto md:h-screen lg:py-0 h-fit",
      children: /* @__PURE__ */ jsx("div", {
        className: " h-fit w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",
        children: /* @__PURE__ */ jsxs("div", {
          className: "p-6 space-y-4 md:space-y-6 sm:p-8 h-fit",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/dashboard/mantenimiento/usuarios",
            children: /* @__PURE__ */ jsx("button", {
              type: "button",
              children: "Volver"
            })
          }), /* @__PURE__ */ jsx("h1", {
            className: "text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white",
            children: "Ingresa un Usuario"
          }), /* @__PURE__ */ jsxs("form", {
            className: "space-y-4 md:space-y-6",
            onSubmit: handleSubmit,
            method: "POST",
            id: "formRegistroUsuario",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "idUsuario",
                className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                children: "ID Usuario"
              }), /* @__PURE__ */ jsx("input", {
                type: "text",
                name: "idUsuario",
                id: "idUsuario",
                className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                placeholder: "TAMAÑO : 6",
                required: true
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "nombre",
                className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                children: "Nombres del Usuario"
              }), /* @__PURE__ */ jsx("input", {
                type: "text",
                name: "nombre",
                id: "nombre",
                placeholder: "Nombre y Apellido genérico",
                className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                required: true
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "correo",
                className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                children: "Correo del usuario"
              }), /* @__PURE__ */ jsx("input", {
                type: "email",
                name: "correo",
                id: "correo",
                placeholder: "ejemplo@empresa.com.pe",
                className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                required: true
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "fechaNacimiento",
                className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                children: "Fecha de Nacimiento"
              }), /* @__PURE__ */ jsx("input", {
                type: "date",
                name: "fechaNacimiento",
                id: "fechaNacimiento",
                className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                required: true
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "telefono",
                className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                children: "Telefono del Usuario"
              }), /* @__PURE__ */ jsx("input", {
                type: "number",
                name: "telefono",
                id: "telefono",
                placeholder: "987548452",
                className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                required: true
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "clave",
                className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                children: "Clave de usuario"
              }), /* @__PURE__ */ jsx("input", {
                type: "password",
                name: "clave",
                id: "clave",
                placeholder: "*********",
                className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                required: true
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "confirmarClave",
                className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                children: "Clave de usuario"
              }), /* @__PURE__ */ jsx("input", {
                type: "password",
                name: "confirmarClave",
                id: "confirmarClave",
                placeholder: "*********",
                className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                required: true
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "tipo",
                className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                children: "Tipo Usuario"
              }), /* @__PURE__ */ jsxs("select", {
                id: "tipo",
                name: "tipo",
                className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                children: [/* @__PURE__ */ jsx("option", {
                  selected: true,
                  children: "Tipo de Usuario"
                }), loaderData.data && loaderData.data.map((tipo) => /* @__PURE__ */ jsx("option", {
                  value: tipo.idTipo,
                  children: tipo.descripcionTipo
                }, tipo.idTipo))]
              })]
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              className: " text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full",
              children: "Ingresar Usuario"
            })]
          })]
        })
      })
    })
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: usuarioRegistro,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
async function loader$1() {
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
  return {
    data,
    tipo,
    empresa
  };
}
const clientes = withComponentProps(function Usuarios3({
  loaderData
}) {
  const navigate = useNavigate();
  function modal(numItem) {
    var _a;
    const modalElement = document.getElementById("default-modal");
    modalElement == null ? void 0 : modalElement.classList.toggle("hidden");
    if (numItem === -1) {
      const formElement = document.getElementById("formActualizaCliente");
      formElement == null ? void 0 : formElement.reset();
      return;
    }
    let element = document.getElementById("numCliente");
    element.value = loaderData.data[numItem].numCliente || "";
    element = document.getElementById("nombre");
    element.value = loaderData.data[numItem].nombresCliente || "";
    element = document.getElementById("correo");
    element.value = loaderData.data[numItem].correoCliente || "";
    element = document.getElementById("fechaNacimiento");
    element.value = loaderData.data[numItem].fechaNacimientoCliente || "";
    element = document.getElementById("telefono");
    element.value = loaderData.data[numItem].telefonoCliente || "";
    element = document.getElementById("tipoDocumento");
    element.value = ((_a = loaderData.data[numItem].tipoDocumentocliente) == null ? void 0 : _a.idTipo) || -1;
    element = document.getElementById("numeroDocumento");
    element.value = loaderData.data[numItem].documentoCliente || "";
    element = document.getElementById("empresa");
    element.value = loaderData.data[numItem].empresaCliente.rucEmpresa || "";
  }
  async function handleSubmitActualizaCliente(event) {
    var _a;
    const date = new Date(event.target.fechaNacimiento.value);
    let dia = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let mes = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let anio = date.getFullYear();
    let clienteDate = anio + "-" + mes + "-" + dia;
    event.preventDefault();
    const res = await fetch("http://localhost:8090/api/v1/cliente/registra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        numCliente: event.target.numCliente.value,
        tipoDocumentocliente: {
          idTipo: event.target.tipoDocumento.value
        },
        documentoCliente: event.target.numeroDocumento.value,
        nombresCliente: event.target.nombre.value,
        fechaNacimientoCliente: clienteDate,
        correoCliente: event.target.correo.value,
        telefonoCliente: event.target.telefono.value,
        empresaCliente: {
          rucEmpresa: event.target.empresa.value
        }
      })
    });
    if (res.ok) {
      alert("Cliente actualizado correctamente");
      (_a = document.getElementById("formActualizaCliente")) == null ? void 0 : _a.reset();
      const modalElement = document.getElementById("default-modal");
      modalElement == null ? void 0 : modalElement.classList.toggle("hidden");
      navigate(0);
    } else {
      alert("Error al actualizar cliente");
    }
  }
  return /* @__PURE__ */ jsxs("section", {
    className: "bg-gray-50 dark:bg-gray-900 p-3 sm:p-5",
    children: [/* @__PURE__ */ jsx("div", {
      className: "mx-auto max-w-screen-xl px-4 lg:px-12",
      children: /* @__PURE__ */ jsxs("div", {
        className: "bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4",
          children: /* @__PURE__ */ jsx("div", {
            className: "w-full md:w-1/2",
            children: /* @__PURE__ */ jsxs("form", {
              className: "flex items-center",
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "simple-search",
                className: "sr-only",
                children: "Search"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative w-full",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",
                  children: /* @__PURE__ */ jsx("svg", {
                    "aria-hidden": "true",
                    className: "w-5 h-5 text-gray-500 dark:text-gray-400",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /* @__PURE__ */ jsx("path", {
                      fillRule: "evenodd",
                      d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                      clipRule: "evenodd"
                    })
                  })
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  id: "simple-search",
                  className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
                  placeholder: "Search",
                  required: true
                })]
              })]
            })
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "overflow-x-auto",
          children: /* @__PURE__ */ jsxs("table", {
            className: "w-full text-sm text-left text-gray-500 dark:text-gray-400",
            children: [/* @__PURE__ */ jsx("thead", {
              className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
              children: /* @__PURE__ */ jsxs("tr", {
                children: [/* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Número"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Nombre Cliente"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Correo Cliente"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Documento Cliente"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Acciones"
                })]
              })
            }), /* @__PURE__ */ jsx("tbody", {
              children: loaderData.data && loaderData.data.map((cliente, index) => /* @__PURE__ */ jsxs("tr", {
                className: "border-b dark:border-gray-700",
                children: [/* @__PURE__ */ jsx("th", {
                  scope: "row",
                  className: "px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white",
                  children: cliente.numCliente
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: cliente.nombresCliente
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: cliente.correoCliente
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: cliente.documentoCliente
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: /* @__PURE__ */ jsx("button", {
                    type: "button",
                    className: "text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900",
                    onClick: () => modal(index),
                    children: "Editar"
                  })
                })]
              }))
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      id: "default-modal",
      tabIndex: -1,
      "aria-hidden": "true",
      className: "hidden overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full h-full md:inset-0 h-[calc(100%-1rem)]",
      style: {
        position: "fixed",
        padding: "10vh 28vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      },
      children: /* @__PURE__ */ jsx("div", {
        className: "relative p-4 w-full max-w-2xl max-h-full",
        children: /* @__PURE__ */ jsxs("div", {
          className: "relative bg-white rounded-lg shadow dark:bg-gray-700",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-gray-900 dark:text-white",
              children: "Editar Cliente"
            }), /* @__PURE__ */ jsxs("button", {
              type: "button",
              className: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white",
              "data-modal-hide": "default-modal",
              onClick: () => modal(-1),
              children: [/* @__PURE__ */ jsx("svg", {
                className: "w-3 h-3",
                "aria-hidden": "true",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 14 14",
                children: /* @__PURE__ */ jsx("path", {
                  stroke: "currentColor",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                })
              }), /* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: "Close modal"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mx-auto my-10 h-fit w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",
            children: /* @__PURE__ */ jsxs("div", {
              className: "p-6 space-y-4 md:space-y-6 sm:p-8 h-fit",
              children: [/* @__PURE__ */ jsx("h1", {
                className: "text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white",
                children: "Actualiza Cliente"
              }), /* @__PURE__ */ jsxs("form", {
                className: "space-y-4 md:space-y-6",
                method: "POST",
                id: "formActualizaCliente",
                onSubmit: handleSubmitActualizaCliente,
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "numCliente",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Número Cliente"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    name: "numCliente",
                    id: "numCliente",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true,
                    disabled: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "nombre",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Nombres"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    name: "nombre",
                    id: "nombre",
                    placeholder: "Nombre y Apellido genérico",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "correo",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Correo"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "email",
                    name: "correo",
                    id: "correo",
                    placeholder: "ejemplo@empresa.com.pe",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "fechaNacimiento",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Fecha de Nacimiento"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "date",
                    name: "fechaNacimiento",
                    id: "fechaNacimiento",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "telefono",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Telefono"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "number",
                    name: "telefono",
                    id: "telefono",
                    placeholder: "987548452",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "tipoDocumento",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Tipo Documento"
                  }), /* @__PURE__ */ jsxs("select", {
                    id: "tipoDocumento",
                    name: "tipoDocumento",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    children: [/* @__PURE__ */ jsx("option", {
                      value: -1,
                      selected: true,
                      children: "Tipo de Documento"
                    }), loaderData.tipo && loaderData.tipo.map((tipo) => /* @__PURE__ */ jsx("option", {
                      value: tipo.idTipo,
                      children: tipo.descripcionTipo
                    }, tipo.idTipo))]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "numeroDocumento",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Número de Documento"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    name: "numeroDocumento",
                    id: "numeroDocumento",
                    placeholder: "74562156",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "empresa",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Empresa"
                  }), /* @__PURE__ */ jsxs("select", {
                    id: "empresa",
                    name: "empresa",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    children: [/* @__PURE__ */ jsx("option", {
                      selected: true,
                      children: "Empresa"
                    }), loaderData.empresa && loaderData.empresa.map((empresa) => /* @__PURE__ */ jsx("option", {
                      value: empresa.rucEmpresa,
                      children: empresa.razonSocialEmpresa
                    }, empresa.rucEmpresa))]
                  })]
                }), /* @__PURE__ */ jsx("button", {
                  type: "submit",
                  className: " text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full",
                  children: "Actualizar Cliente"
                })]
              })]
            })
          })]
        })
      })
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: clientes,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
async function loader() {
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
  return {
    data,
    tipo,
    empresa,
    usuario
  };
}
const licencias = withComponentProps(function Usuarios4({
  loaderData
}) {
  const navigate = useNavigate();
  function modal(numItem) {
    const modalElement = document.getElementById("default-modal");
    modalElement == null ? void 0 : modalElement.classList.toggle("hidden");
    if (numItem === -1) {
      const formElement = document.getElementById("formAgregarLicencia");
      formElement == null ? void 0 : formElement.reset();
      return;
    }
  }
  async function handleSubmitRegistraLicencia(event) {
    var _a;
    event.preventDefault();
    new Date(event.target.fecha.value).toISOString().slice(0, 19);
    (/* @__PURE__ */ new Date()).toISOString().slice(0, 19);
    const res = await fetch("http://localhost:8090/api/v1/licencia/registra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        rucEmpresa: {
          rucEmpresa: event.target.empresa.value
        },
        idUsuario: {
          idUsuario: event.target.usuario.value
        },
        idTipo: {
          idTipo: event.target.tipo.value
        }
      })
    });
    if (res.ok) {
      alert("Se ha agregado licencia correctamente");
      (_a = document.getElementById("formAgregarLicencia")) == null ? void 0 : _a.reset();
      const modalElement = document.getElementById("default-modal");
      modalElement == null ? void 0 : modalElement.classList.toggle("hidden");
      navigate(0);
    } else {
      alert("Error al agregar licencia");
    }
  }
  return /* @__PURE__ */ jsxs("section", {
    className: "bg-gray-50 dark:bg-gray-900 p-3 sm:p-5",
    children: [/* @__PURE__ */ jsx("div", {
      className: "mx-auto max-w-screen-xl px-4 lg:px-12",
      children: /* @__PURE__ */ jsxs("div", {
        className: "bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-full md:w-1/2",
            children: /* @__PURE__ */ jsxs("form", {
              className: "flex items-center",
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "simple-search",
                className: "sr-only",
                children: "Search"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative w-full",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",
                  children: /* @__PURE__ */ jsx("svg", {
                    "aria-hidden": "true",
                    className: "w-5 h-5 text-gray-500 dark:text-gray-400",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /* @__PURE__ */ jsx("path", {
                      fillRule: "evenodd",
                      d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                      clipRule: "evenodd"
                    })
                  })
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  id: "simple-search",
                  className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
                  placeholder: "Search",
                  required: true
                })]
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0",
            children: /* @__PURE__ */ jsx("button", {
              onClick: () => modal(0),
              className: "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
              children: "Agregar"
            })
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "overflow-x-auto",
          children: /* @__PURE__ */ jsxs("table", {
            className: "w-full text-sm text-left text-gray-500 dark:text-gray-400",
            children: [/* @__PURE__ */ jsx("thead", {
              className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
              children: /* @__PURE__ */ jsxs("tr", {
                children: [/* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Número"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Empresa"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Usuario"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Tipo"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Fecha Creacion"
                }), /* @__PURE__ */ jsx("th", {
                  scope: "col",
                  className: "px-4 py-3",
                  children: "Fecha Vencimiento"
                })]
              })
            }), /* @__PURE__ */ jsx("tbody", {
              children: loaderData.data && loaderData.data.map((licencia, index) => /* @__PURE__ */ jsxs("tr", {
                className: "border-b dark:border-gray-700",
                children: [/* @__PURE__ */ jsx("th", {
                  scope: "row",
                  className: "px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white",
                  children: licencia.numLicencia
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: licencia.rucEmpresa.razonSocialEmpresa
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: licencia.idUsuario.nombreUsuario
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: licencia.idTipo.descripcionTipo
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: new Date(licencia.fechaCreacion).toLocaleString()
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-4 py-3",
                  children: new Date(licencia.fechaVencimiento).toLocaleString()
                })]
              }))
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      id: "default-modal",
      tabIndex: -1,
      "aria-hidden": "true",
      className: "hidden overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full h-full md:inset-0 h-[calc(100%-1rem)]",
      style: {
        position: "fixed",
        padding: "10vh 28vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      },
      children: /* @__PURE__ */ jsx("div", {
        className: "relative p-4 w-full max-w-2xl max-h-full",
        children: /* @__PURE__ */ jsxs("div", {
          className: "relative bg-white rounded-lg shadow dark:bg-gray-700",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-gray-900 dark:text-white",
              children: "Agregar Licencia"
            }), /* @__PURE__ */ jsxs("button", {
              type: "button",
              className: "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white",
              "data-modal-hide": "default-modal",
              onClick: () => modal(-1),
              children: [/* @__PURE__ */ jsx("svg", {
                className: "w-3 h-3",
                "aria-hidden": "true",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 14 14",
                children: /* @__PURE__ */ jsx("path", {
                  stroke: "currentColor",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                })
              }), /* @__PURE__ */ jsx("span", {
                className: "sr-only",
                children: "Close modal"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mx-auto my-10 h-fit w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",
            children: /* @__PURE__ */ jsx("div", {
              className: "p-6 space-y-4 md:space-y-6 sm:p-8 h-fit",
              children: /* @__PURE__ */ jsxs("form", {
                className: "space-y-4 md:space-y-6",
                method: "POST",
                id: "formAgregarLicencia",
                onSubmit: handleSubmitRegistraLicencia,
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "empresa",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Empresa"
                  }), /* @__PURE__ */ jsxs("select", {
                    id: "empresa",
                    name: "empresa",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    children: [/* @__PURE__ */ jsx("option", {
                      selected: true,
                      children: "Elegir Empresa"
                    }), loaderData.empresa && loaderData.empresa.map((empresa) => /* @__PURE__ */ jsx("option", {
                      value: empresa.rucEmpresa,
                      children: empresa.razonSocialEmpresa
                    }, empresa.rucEmpresa))]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "tipo",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Usuario"
                  }), /* @__PURE__ */ jsxs("select", {
                    id: "usuario",
                    name: "usuario",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    children: [/* @__PURE__ */ jsx("option", {
                      selected: true,
                      children: "Elegir Usuario"
                    }), loaderData.tipo && loaderData.usuario.map((usuario) => /* @__PURE__ */ jsx("option", {
                      value: usuario.idUsuario,
                      children: usuario.nombreUsuario
                    }, usuario.idUsuario))]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "tipo",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Tipo Licencia"
                  }), /* @__PURE__ */ jsxs("select", {
                    id: "tipo",
                    name: "tipo",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    children: [/* @__PURE__ */ jsx("option", {
                      selected: true,
                      children: "Tipo de Licencia"
                    }), loaderData.tipo && loaderData.tipo.map((tipo) => /* @__PURE__ */ jsx("option", {
                      value: tipo.idTipo,
                      children: tipo.descripcionTipo
                    }, tipo.idTipo))]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "fecha",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
                    children: "Fecha de Vencimiento"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "date",
                    name: "fecha",
                    id: "fecha",
                    className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    required: true
                  })]
                }), /* @__PURE__ */ jsx("button", {
                  type: "submit",
                  className: "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full",
                  children: "Registrar Licencia"
                })]
              })
            })
          })]
        })
      })
    })]
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: licencias,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-ClQjMiG_.js", "imports": ["/assets/chunk-D52XG6IA-Crw0zIzM.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-BLUXIR8n.js", "imports": ["/assets/chunk-D52XG6IA-Crw0zIzM.js", "/assets/with-props-D6P1vN0Z.js"], "css": [] }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-D7ogsIlk.js", "imports": ["/assets/with-props-D6P1vN0Z.js", "/assets/chunk-D52XG6IA-Crw0zIzM.js"], "css": [] }, "routes/dashboard/dashboard": { "id": "routes/dashboard/dashboard", "parentId": "root", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/dashboard-dBk8rIPt.js", "imports": ["/assets/with-props-D6P1vN0Z.js", "/assets/chunk-D52XG6IA-Crw0zIzM.js"], "css": [] }, "routes/dashboard/reporte/interacciones/interacciones": { "id": "routes/dashboard/reporte/interacciones/interacciones", "parentId": "routes/dashboard/dashboard", "path": "reporte/interacciones", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/interacciones-CvNbAfnI.js", "imports": ["/assets/with-props-D6P1vN0Z.js", "/assets/chunk-D52XG6IA-Crw0zIzM.js"], "css": [] }, "routes/dashboard/mantenimiento/empresas/empresas": { "id": "routes/dashboard/mantenimiento/empresas/empresas", "parentId": "routes/dashboard/dashboard", "path": "mantenimiento/empresas", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/empresas-B7iU7_pV.js", "imports": ["/assets/with-props-D6P1vN0Z.js", "/assets/chunk-D52XG6IA-Crw0zIzM.js"], "css": [] }, "routes/dashboard/mantenimiento/empresas/registro/empresaRegistro": { "id": "routes/dashboard/mantenimiento/empresas/registro/empresaRegistro", "parentId": "routes/dashboard/dashboard", "path": "mantenimiento/empresas/registro", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/empresaRegistro-Dc3mVKvM.js", "imports": ["/assets/with-props-D6P1vN0Z.js", "/assets/chunk-D52XG6IA-Crw0zIzM.js"], "css": [] }, "routes/dashboard/mantenimiento/usuarios/usuarios": { "id": "routes/dashboard/mantenimiento/usuarios/usuarios", "parentId": "routes/dashboard/dashboard", "path": "mantenimiento/usuarios", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/usuarios-CyZSyhpK.js", "imports": ["/assets/with-props-D6P1vN0Z.js", "/assets/chunk-D52XG6IA-Crw0zIzM.js"], "css": [] }, "routes/dashboard/mantenimiento/usuarios/registro/usuarioRegistro": { "id": "routes/dashboard/mantenimiento/usuarios/registro/usuarioRegistro", "parentId": "routes/dashboard/dashboard", "path": "mantenimiento/usuarios/registro", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/usuarioRegistro-DnynHYp-.js", "imports": ["/assets/with-props-D6P1vN0Z.js", "/assets/chunk-D52XG6IA-Crw0zIzM.js"], "css": [] }, "routes/dashboard/mantenimiento/clientes/clientes": { "id": "routes/dashboard/mantenimiento/clientes/clientes", "parentId": "routes/dashboard/dashboard", "path": "mantenimiento/clientes", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/clientes-C9biovoy.js", "imports": ["/assets/with-props-D6P1vN0Z.js", "/assets/chunk-D52XG6IA-Crw0zIzM.js"], "css": [] }, "routes/dashboard/mantenimiento/licencias/licencias": { "id": "routes/dashboard/mantenimiento/licencias/licencias", "parentId": "routes/dashboard/dashboard", "path": "mantenimiento/licencias", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/licencias-BvFgE2bb.js", "imports": ["/assets/with-props-D6P1vN0Z.js", "/assets/chunk-D52XG6IA-Crw0zIzM.js"], "css": [] } }, "url": "/assets/manifest-c2a08494.js", "version": "c2a08494" };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/dashboard/dashboard": {
    id: "routes/dashboard/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/dashboard/reporte/interacciones/interacciones": {
    id: "routes/dashboard/reporte/interacciones/interacciones",
    parentId: "routes/dashboard/dashboard",
    path: "reporte/interacciones",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/dashboard/mantenimiento/empresas/empresas": {
    id: "routes/dashboard/mantenimiento/empresas/empresas",
    parentId: "routes/dashboard/dashboard",
    path: "mantenimiento/empresas",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/dashboard/mantenimiento/empresas/registro/empresaRegistro": {
    id: "routes/dashboard/mantenimiento/empresas/registro/empresaRegistro",
    parentId: "routes/dashboard/dashboard",
    path: "mantenimiento/empresas/registro",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/dashboard/mantenimiento/usuarios/usuarios": {
    id: "routes/dashboard/mantenimiento/usuarios/usuarios",
    parentId: "routes/dashboard/dashboard",
    path: "mantenimiento/usuarios",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/dashboard/mantenimiento/usuarios/registro/usuarioRegistro": {
    id: "routes/dashboard/mantenimiento/usuarios/registro/usuarioRegistro",
    parentId: "routes/dashboard/dashboard",
    path: "mantenimiento/usuarios/registro",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/dashboard/mantenimiento/clientes/clientes": {
    id: "routes/dashboard/mantenimiento/clientes/clientes",
    parentId: "routes/dashboard/dashboard",
    path: "mantenimiento/clientes",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/dashboard/mantenimiento/licencias/licencias": {
    id: "routes/dashboard/mantenimiento/licencias/licencias",
    parentId: "routes/dashboard/dashboard",
    path: "mantenimiento/licencias",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  publicPath,
  routes
};
